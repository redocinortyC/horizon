const { SlashCommandBuilder, inlineCode, bold } = require("@discordjs/builders");
const client = require("../../utils/client");
const { MessageEmbed } = require("discord.js");

// Help command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Provides a list of commands that can be used with the bot."),
        
	async execute(interaction) {
        const commands = client.commands.map(command => {
            return {
                name: command.data.name,
                description: command.data.description
            }
        }).sort((a, b) => a.name.localeCompare(b.name));

        const embed = {
            title: "Commands",
            description: "Here's a list of commands that can be used with the bot.",
            fields: commands.map(command => {
                return {
                    name: command.name,
                    value: command.description,
                    inline: true
                }
            }),
            timestamp: new Date(),
            footer: {
                text: "Created by cytronicoder#4975",
                icon_url: client.user.avatarURL(),
            }
        };

        await interaction.reply({ embeds: [embed] });
	}
};
