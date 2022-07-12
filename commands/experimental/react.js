const { SlashCommandBuilder } = require("@discordjs/builders");
const { developers_id } = require("../../config.json");

// React command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("react")
		.setDescription("Reacts to a message with a given emoji or a random one.")
        .addStringOption(option => option.setName("emoji").setRequired(true).setDescription("The emoji to react with")),
		
	async execute(interaction) {
        if (!interaction.member.roles.cache.has(developers_id) || !developers_id) {
            await interaction.reply({ content: "As this is an experimental feature, you need to be part of the developers team to use it.", ephemeral: true });
            return;
        }

        const message = await interaction.reply({ content: "Reacting to this message...", fetchReply: true });
        const emoji = interaction.options.getString("emoji");
        
        if (!emoji) {
            await interaction.editReply({ content: "No emoji specified.", ephemeral: true });
        } else {
            message.react(emoji);
        }
	}
};
