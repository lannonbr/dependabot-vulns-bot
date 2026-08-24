import { Octokit } from "@octokit/core";

const client = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function run() {
  const data = [
    { owner: "lannonbr", repo: "product-age" },
    { owner: "lannonbr", repo: "tcg-tracker" },
  ];

  for (let repo of data) {
    const result = await client.request(
      "GET /repos/{owner}/{repo}/dependabot/alerts",
      {
        owner: repo.owner,
        repo: repo.repo,
        state: "open",
        headers: {
          "X-GitHub-Api-Version": "2026-03-10",
        },
      },
    );

    if (result.data.length > 0) {
      const body = `Repo ${repo.owner}/${repo.repo} has ${result.data.length} open findings. To explore the findings, visit https://github.com/${repo.owner}/${repo.repo}/security/dependabot`;

      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({ content: body }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

run();
