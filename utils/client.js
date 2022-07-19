const { Client, IntentsBitField } = require("discord.js");

const allIntents = new IntentsBitField(32767);

// Create a new Discord client
const client = new Client({ intents: allIntents });

module.exports = client;