// Importing environment variables from .env file
require("dotenv").config();
const { TOKEN, CLIENT_ID, GUILD_ID, IPGEOLOCATION_API_KEY } = process.env;

const token = TOKEN;
const clientId = CLIENT_ID;
const guildId = GUILD_ID;
const ipgeolocation = IPGEOLOCATION_API_KEY;

module.exports = {
    token,
    clientId,
    guildId,
    ipgeolocation
}