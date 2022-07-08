const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
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
        .addSubcommand((subcommand) =>
            subcommand
              .setName("joke")
              .setDescription("Get a random joke."))
        .addSubcommand((subcommand) =>
            subcommand
              .setName("quote")
              .setDescription("Get inspired :sparkles:"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("horizon")
                .setDescription("See some sunrises and sunsets.")
                .addStringOption(option =>
                    option.setName("type")
                        .setDescription("Sunrise/sunset")
                        .setRequired(true)
                        .addChoices(
                            { name: "sunrise", value: "sunrise" },
                            { name: "sunset", value: "sunset" }
                        ))),

	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "roll") {
            const die = Math.floor(Math.random() * 6) + 1;
            interaction.reply({ content: `🎲 You rolled a ${die}!` });
        }

        if (subcommand === "flip") {
            const coin = Math.random() < 0.5 ? "heads" : "tails";
            interaction.reply({ content: `🪙 You flipped ${coin}!` });
        }

        if (subcommand === "8ball") {
            const question = interaction.options.getString("question");
            if (!question) {
                await interaction.reply({ content: "Please specify a question.", ephemeral: true });
                return;
            }

            if (question.toLowerCase().includes("what do you get when you multiply six by nine")) {
                interaction.reply({ content: "You asked the magic 8ball the Ultimate Question of Life, the Universe, and Everything.\nThe magic 8ball says: Six by nine. Forty-two. 🛸" });
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
                await interaction.reply({ content: `You asked: ${question}\n🎱 The magic 8ball says: ${answer}` });
            }
        }

        if (subcommand === "joke") {
            let response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
            let joke;

            if (response.data.type === "twopart") {
                joke = response.data.setup + " " + `${bold(response.data.delivery)}`;
            } else if (response.data.type === "single") {
                joke = response.data.joke;
            }
            
            // embed
            const embed = new MessageEmbed()
                .setTitle(response.data.category)
                .setDescription(joke)
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setFooter({
                    text: "Powered by https://v2.jokeapi.dev",
                    iconURL: "https://sv443.net/resources/images/jokeapi.png"
                });
            
            await interaction.reply({ content: "✨ I found a joke!", embeds: [embed] });
        }


        if (subcommand === "horizon") {
            const type = interaction.options.getString("type");
            if (!type) {
                await interaction.reply({ content: "Please specify a choice.", ephemeral: true });
                return;
            }
            
            const horizon_response = await axios.get("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                params: {
                    tags: `${type} photo`,
                    tagmode: "any",
                    format: "json"
                }
            }).catch(err => {
                interaction.editReply({ content: "Error getting a picture.", ephemeral: true });
                console.error(err);
            });

            const data = JSON.parse(horizon_response.data.replace(/^\(|\)$/g, ""));
            const photo = data.items[Math.floor(Math.random() * data.items.length)];

            // const embed = {
            //     color: type === "sunrise" ? 0xFFFF00 : 0xFFA500,
            //     title: `${photo.title}`,
            //     url: `${photo.link}`,
            //     image: {
            //         url: `${photo.media.m}`
            //     },
            //     timestamp: photo.date_taken,
            //     footer: {
            //         text: `Photo from Flickr - uploaded by ${photo.author}`
            //     }
            // };

            const horizon_embed = new MessageEmbed()
                .setColor(type === "sunrise" ? 0xFFFF00 : 0xFFA500)
                .setTitle(`${photo.title}`)
                .setURL(`${photo.link}`)
                .setImage(`${photo.media.m}`)
                .setTimestamp(photo.date_taken)
                .setFooter({
                    text: `Photo from Flickr - uploaded by ${photo.author}`,
                    iconURL: "https://www.flickr.com/favicon.ico"
                });

            await interaction.reply({ content: `🌄 I found a ${type}!`, embeds: [horizon_embed] });
        }
        if (subcommand === "quote"){
            const quote_response = await axios.get("https://api.quotable.io/random").catch(err => {
                interaction.editReply({ content: "Error getting a quote.", ephemeral: true });
                console.error(err);
            });

            const data = quote_response.data;
            const quote = data.content;
            const author = data.author;

            const quote_embed = new MessageEmbed()
                .setTitle(`${quote}`)
                .setDescription(`${author}`)
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setFooter({
                    text: "Powered by https://quotable.io",
                });

            await interaction.reply({ content: "💬 I found a quote!", embeds: [quote_embed] });
        }
	}
};

