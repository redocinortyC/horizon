# Horizon
🌅 The official Discord bot for the International Junior Honour Society community server

## Commands
-  Experiment
   -  React to a message
- General
  - Help
  - Moderation
    - Ban
    - Kick
    - Mute
  - Roles
    - Add
    - Remove
- Utility
  - Fun
    - Roll a die
    - Flip a coin
    - Consult the 8ball
    - See a sunrise/sunset
  - Ping

## Getting started with local development
To get started with developing the bot locally, you need to clone this repository via

```bash
git clone https://github.com/cytronicoder/horizon.git
```

Then, you need to install the dependencies via

```bash
cd horizon
yarn install
```

Before you can start the bot, you will need to create a Discord bot token. You can do this by going to the [Discord Developer Portal](https://discordapp.com/developers/applications/me) and creating a new bot. Then, create an `.env` file and add the following lines to it:

```bash
TOKEN=<your bot token>
```

Additionally, you will need the client and guild ID in the `.env` file:

```bash
CLIENT_ID=<your client ID>
GUILD_ID=<your guild ID>
```

Finally, you can start the bot by running

```bash
node deploy-commands.js && node .
```