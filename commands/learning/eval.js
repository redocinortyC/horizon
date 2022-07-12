const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const mathjs = require('mathjs');

// Random fact command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("eval")
        .setDescription("Evaluates using Math.js.")
		.addStringOption(option => option.setName("expression").setRequired(true).setDescription("The expression to calculate.")),
		
	async execute(interaction) {
		const expression = interaction.options.getString("expression");

		// Calculate and round the result
		const result = Math.round(mathjs.evaluate(expression) * 100) / 100;

		const embed = new MessageEmbed()
			.setTitle(`What is ${expression}?`)
			.setDescription(`${expression} = ${result}`)
			.setColor(Math.floor(Math.random() * 0xFFFFFF))
			.setFooter({
				text: "Powered by Math.js"
			});

		await interaction.reply({ embeds: [embed] });
	}
};
