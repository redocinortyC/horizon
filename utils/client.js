const { Client, Intents } = require('discord.js');

// Create a new Discord client
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS] 
});

module.exports = client;