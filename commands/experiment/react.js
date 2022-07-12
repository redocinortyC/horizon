const { SlashCommandBuilder } = require("@discordjs/builders");

// React command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("react")
		.setDescription("Reacts to a message with a given emoji or a random one.")
        .addStringOption(option => option.setName("emoji").setRequired(true).setDescription("The emoji to react with")),
		
	async execute(interaction) {
        const message = await interaction.reply({ content: "Reacting to this message...", fetchReply: true });
        const emoji = interaction.options.getString("emoji");
        
        if (!emoji) {
            await interaction.editReply({ content: "No emoji specified.", ephemeral: true });
        } else {
            message.react(emoji);
        }
	}
};
