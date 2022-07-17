// Importing environment variables from .env file
require("dotenv").config();
const { TOKEN, CLIENT_ID, GUILD_ID, STATUS } = process.env;

const token = TOKEN;
const clientId = CLIENT_ID;
const guildId = GUILD_ID;
const status = STATUS;

module.exports = {
    token,
    clientId,
    guildId,
    status
}