const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

// Random fact command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("calc")
        .setDescription("Calculate a math expression.")
		.addStringOption(option => option.setName("expression").setRequired(true).setDescription("The expression to calculate.")),
		
	async execute(interaction) {
		const expression = interaction.options.getString("expression");
		const result = eval(expression.replace(/[^0-9+\-*/()]/g, "").replace(/\^/g, "**"));

		const embed = new MessageEmbed()
			.setTitle("Calculation")
			.setDescription(`${expression} = ${result}`)
			.setColor(Math.floor(Math.random() * 16777215).toString(16));

		await interaction.reply({ embeds: [embed] });
	}
};
