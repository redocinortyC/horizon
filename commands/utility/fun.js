const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Moderation commands
module.exports = {
	data: new SlashCommandBuilder()
		.setName("fun")
		.setDescription("Some entertainment for the bored.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("roll")
                .setDescription("Rolls a dice.")),
                
	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "roll") {
            await interaction.reply("Rolling a die...");
            await wait(2000);
            
            const die = Math.floor(Math.random() * 6) + 1;
            interaction.editReply({ content: `🎲 You rolled a ${die}!` });
        }
	}
};
