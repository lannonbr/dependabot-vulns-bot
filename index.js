import { Octokit } from "@octokit/core";
import fs from "fs";

async function run() {
  if (!fs.existsSync("repos.txt")) {
    console.error(
      "Error: Please generate a repos.txt file in this directory which is a listing of repos you wish to track.",
    );
    process.exit(1);
  }

  if (process.env.GITHUB_TOKEN === undefined) {
    console.error(
      "Error: GitHub access token not found. Please insert it into the session with the GITHUB_TOKEN env variable.",
    );
    process.exit(1);
  }

  const client = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const repos = fs
    .readFileSync("repos.txt")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("/"));

  for (let [owner, repo] of repos) {
    const result = await client.request(
      "GET /repos/{owner}/{repo}/dependabot/alerts",
      {
        owner,
        repo,
        state: "open",
        headers: {
          "X-GitHub-Api-Version": "2026-03-10",
        },
      },
    );

    const alertsCount = result.data.length;
    if (alertsCount > 0) {
      const body = `Repo ${owner}/${repo} has ${alertsCount} open findings. To explore the findings, visit https://github.com/${owner}/${repo}/security/dependabot`;

      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({ content: body }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

run();
