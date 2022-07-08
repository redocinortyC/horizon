const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

// Random fact command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("fact")
		.setDescription("Get a random fact."),
		
	async execute(interaction) {
		const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        const fact = response.data.text;

        const embed = new MessageEmbed()
            .setTitle("Random fact")
            .setDescription(fact)
            .setColor(Math.floor(Math.random() * 16777215).toString(16))
            .setFooter({
                text: "Powered by https://uselessfacts.jsph.pl"
            });

        await interaction.reply({ embeds: [embed] });
	}
};
