const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../utils/client');

// Ping command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

		// Calculate roundtrip latency and websocket heartbeat
		const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;
		const heartbeat = client.ws.ping;

        interaction.editReply(`🏓 Pong!\nRoundtrip latency: ${roundtrip}ms.\nWebsocket heartbeat: ${heartbeat}ms.`);
	}
};