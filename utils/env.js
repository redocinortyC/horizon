// Importing environment variables from .env file
require('dotenv').config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const token = TOKEN;
const clientId = CLIENT_ID;
const guildId = GUILD_ID;

module.exports = {
    token,
    clientId,
    guildId
}