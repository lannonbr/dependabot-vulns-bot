#!/bin/sh

source .env

kubectl create secret generic dependabot-vulns-bot \
  --from-literal=GITHUB_TOKEN="$GITHUB_TOKEN" \
  --from-literal=DISCORD_WEBHOOK_URL="$DISCORD_WEBHOOK_URL" \

kubectl create configmap dependabot-repos-list \
  --from-file=repos.txt

kubectl apply -f cronjob.yaml