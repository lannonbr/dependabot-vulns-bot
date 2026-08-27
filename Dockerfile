FROM node:24-alpine

WORKDIR /opt

LABEL org.opencontainers.image.source=https://github.com/lannonbr/dependabot-vulns-bot

COPY . .
RUN npm install

ENTRYPOINT [ "node" ]
CMD ["index.js"]