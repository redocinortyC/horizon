const { SlashCommandBuilder } = require("@discordjs/builders");
const emojis = ["💩", "🤔", "🤨", "😱", "😳", "😵", "😡", "😠", "😤", "😭", "😪", "😴", "😷", "🤕", "🤒", "🤓", "🤗", "🤖", "🤔", "🤐", "🤫", "🤥", "🤧", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "💩", "🤔", "🤨", "😱", "😳", "😵", "😡", "😠", "😤", "😭", "😪", "😴", "😷", "🤕", "🤒", "🤓", "🤗", "🤖", "🤔", "🤐", "🤫", "🤥", "🤧", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖"];

// React command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("react")
		.setDescription("Reacts to a message with a given emoji or a random one.")
        .addStringOption(option => option.setName("emoji").setDescription("The emoji to react with")),
		
	async execute(interaction) {
        const message = await interaction.reply({ content: "Reacting to this message...", fetchReply: true });
        const emoji = interaction.options.getString("emoji");
        
        if (!emoji) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            message.react(randomEmoji);
        } else {
            message.react(emoji);
        }
	}
};
