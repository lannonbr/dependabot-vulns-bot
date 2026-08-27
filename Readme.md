# Dependabot Vulns Bot

A simple node script that hits the Dependabot Alerts endpoint from GitHub on a listing of repos.

## Required env vars

- GITHUB_TOKEN: A personal access token that has read access to the repos
- DISCORD_WEBHOOK_URL: A url (including the pregenerated auth token) to send to discord

## Setup

- `npm install`
- Setup a `repos.txt` file that has the format of each line having a owner/repo string. Ex:

```
microsoft/vscode
vercel/next.js
```

- Add the env vars to either a `.env` and then use the `--env-file` node flag or just add it to your session env via a bashrc/zshrc file.
- `node index.js`

Future work is going to include running this on a schedule via a Kubernetes CronJob, but could also be run directly via cron as well.
