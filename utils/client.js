const { Client, Intents } = require("discord.js");

const allIntents = new Intents(32767);

// Create a new Discord client
const client = new Client({ intents: allIntents });

module.exports = client;