const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const axios = require("axios");

// Moderation commands
module.exports = {
	data: new SlashCommandBuilder()
		.setName("fun")
		.setDescription("Some entertainment for the bored.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("roll")
                .setDescription("Rolls a dice."))
        .addSubcommand(subcommand =>
            subcommand
                .setName("flip")
                .setDescription("Flips a coin."))
        .addSubcommand(subcommand =>
            subcommand
                .setName("8ball")
                .setDescription("Ask the magic 8ball a question.")
                .addStringOption(option => option.setName("question").setDescription("The question to ask the magic 8ball")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("horizon")
                .setDescription("See some sunrises and sunsets.")
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Sunrise/sunset')
                        .setRequired(true)
                        .addChoices(
                            { name: 'sunrise', value: 'sunrise' },
                            { name: 'sunset', value: 'sunset' }
                        ))),

	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "roll") {
            await interaction.reply("Rolling a die...");
            await wait(2000);
            
            const die = Math.floor(Math.random() * 6) + 1;
            interaction.editReply({ content: `🎲 You rolled a ${die}!` });
        }

        if (subcommand === "flip") {
            await interaction.reply("Flipping a coin...");
            await wait(2000);
            
            const coin = Math.random() < 0.5 ? "heads" : "tails";
            interaction.editReply({ content: `🪙 You flipped ${coin}!` });
        }

        if (subcommand === "8ball") {
            const question = interaction.options.getString("question");
            if (!question) {
                await interaction.reply({ content: "Please specify a question.", ephemeral: true });
                return;
            }

            await interaction.reply("Asking the magic 8ball the question...");
            await wait(2000);

            if (question.toLowerCase().includes("what do you get when you multiply six by nine")) {
                interaction.editReply({ content: "You asked the magic 8ball the Ultimate Question of Life, the Universe, and Everything.\nThe magic 8ball says: Six by nine. Forty-two. 🛸" });
            } else {
                const answers = [
                    "It is certain.",
                    "It is decidedly so.",
                    "Without a doubt.",
                    "Yes - definitely.",
                    "You may rely on it.",
                    "As I see it, yes.",
                    "Most likely.",
                    "Outlook good.",
                    "Yes.",
                    "Signs point to yes.",
                    "Reply hazy, try again.",
                    "Ask again later.",
                    "Better not tell you now.",
                    "Cannot predict now.",
                    "Concentrate and ask again.",
                    "Don't count on it.",
                    "My reply is no.",
                    "My sources say no.",
                    "Outlook not so good.",
                    "Very doubtful."
                ];

                const answer = answers[Math.floor(Math.random() * answers.length)];
                await interaction.editReply({ content: `You asked: ${question}\n🎱 The magic 8ball says: ${answer}` });
            }
        }

        if (subcommand === "horizon") {
            const type = interaction.options.getString("type");
            if (!type) {
                await interaction.reply({ content: "Please specify a choice.", ephemeral: true });
                return;
            }

            await interaction.reply(`Getting a random picture of a ${type}...`);
            await wait(2000);
            
            const response = await axios.get("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                params: {
                    tags: `${type} photo`,
                    tagmode: "any",
                    format: "json"
                }
            }).catch(err => {
                interaction.editReply({ content: "Error getting a picture.", ephemeral: true });
                console.error(err);
            });

            const data = JSON.parse(response.data.replace(/^\(|\)$/g, ""));
            const photo = data.items[Math.floor(Math.random() * data.items.length)];

            const embed = {
                color: type === "sunrise" ? 0xFFFF00 : 0xFFA500,
                title: `${photo.title}`,
                url: `${photo.link}`,
                image: {
                    url: `${photo.media.m}`
                },
                timestamp: photo.date_taken,
                footer: {
                    text: `Photo from Flickr - uploaded by ${photo.author}`
                }
            };

            await interaction.editReply({ content: `🌄 I found a ${type}!`, embeds: [embed] });
        }
	}
};
