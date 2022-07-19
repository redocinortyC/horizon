const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const mathjs = require('mathjs');

// Random fact command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("eval")
        .setDescription("Evaluates using Math.js.")
		.addStringOption(option => option.setName("expression").setRequired(true).setDescription("The expression to calculate.")),
		
	async execute(interaction) {
		const expression = interaction.options.getString("expression");
		let result = 0;
		
		// Calculate and round the result
		try {
			result = Math.round(mathjs.evaluate(expression) * 100) / 100;
		} catch (error) {
			await interaction.reply({ content: "Error: " + error.message, ephemeral: true });
			return;
		}

		const embed = new EmbedBuilder()
			.setTitle(`What is ${expression}?`)
			.setDescription(`${expression} = ${result}`)
			.setColor(Math.floor(Math.random() * 0xFFFFFF))
			.setFooter({
				text: "Powered by Math.js"
			});

		await interaction.reply({ embeds: [embed] });
	}
};
