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
                .setName("8ball")
                .setDescription("Ask the magic 8ball a question.")
                .addStringOption(option => option.setName("question").setRequired(true).setDescription("The question to ask the magic 8ball")))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("animal")
                .setDescription("Get a random animal fact and image.")
                .addStringOption(option => option.setName("type")
                    .setDescription("The type of animal to get.")
                    .setRequired(true)
                    .addChoices(
                        { name: "cat", value: "cat" },
                        { name: "dog", value: "dog" },
                        { name: "birb", value: "birb" },
                        { name: "panda", value: "panda" },
                        { name: "red panda", value: "redpanda" },
                        { name: "fox", value: "fox" },
                        { name: "koala", value: "koala" },
                        { name: "raccoon", value: "raccoon" },
                        { name: "kangaroo", value: "kangaroo" },
                    )))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("fact")
                .setDescription("Get a random fact."))
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
                        )))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("joke")
                .setDescription("Get a random joke."))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("meme")
                .setDescription("Get a random meme."))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("quote")
                .setDescription("Get a random quote.")),

	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "animal") {
            const type = interaction.options.getString("type");

            if (type === "cat") {
                const response = await axios.get("https://some-random-api.ml/animal/cat");
                const embed = new MessageEmbed()
                    .setTitle("Random cat fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐱 I found a cat!", embeds: [embed] });
            }

            if (type === "dog") {
                const response = await axios.get("https://some-random-api.ml/animal/dog");
                const embed = new MessageEmbed()
                    .setTitle("Random dog fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐶 I found a dog!", embeds: [embed] });
            }

            if (type === "birb") {
                const response = await axios.get("https://some-random-api.ml/animal/bird");
                const embed = new MessageEmbed()
                    .setTitle("Random bird fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐦 I found a bird!", embeds: [embed] });
            }

            if (type === "panda") {
                const response = await axios.get("https://some-random-api.ml/animal/panda");
                const embed = new MessageEmbed()
                    .setTitle("Random panda fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐼 I found a panda!", embeds: [embed] });
            }

            if (type === "redpanda") {
                const response = await axios.get("https://some-random-api.ml/animal/red_panda");
                const embed = new MessageEmbed()
                    .setTitle("Random red panda fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐼 I found a red panda!", embeds: [embed] });
            }

            if (type === "fox") {
                const response = await axios.get("https://some-random-api.ml/animal/fox");
                const embed = new MessageEmbed()
                    .setTitle("Random fox fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🦊 I found a fox!", embeds: [embed] });
            }

            if (type === "koala") {
                const response = await axios.get("https://some-random-api.ml/animal/koala");
                const embed = new MessageEmbed()
                    .setTitle("Random koala fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🐨 I found a koala!", embeds: [embed] });
            }

            if (type === "raccoon") {
                const response = await axios.get("https://some-random-api.ml/animal/raccoon");
                const embed = new MessageEmbed()
                    .setTitle("Random raccoon fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🦝 I found a raccoon!", embeds: [embed] });
            }

            if (type === "kangaroo") {
                const response = await axios.get("https://some-random-api.ml/animal/kangaroo");
                const embed = new MessageEmbed()
                    .setTitle("Random kangaroo fact")
                    .setImage(response.data.image)
                    .setDescription(response.data.fact)
                    .setColor(Math.floor(Math.random() * 0xFFFFFF))
                    .setFooter({
                        text: "Powered by https://some-random-api.ml",
                        iconURL: "https://i.some-random-api.ml/logo.png",
                    });
                await interaction.reply({ content: "🦒 I found a kangaroo!", embeds: [embed] });
            }
        }

        if (subcommand === "fact") {
            const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
            const fact = response.data.text;

            const embed = new MessageEmbed()
                .setTitle("Random fact")
                .setDescription(fact)
                .setColor(Math.floor(Math.random() * 0xFFFFFF))
                .setFooter({
                    text: "Powered by https://uselessfacts.jsph.pl"
                });

            await interaction.reply({ embeds: [embed] });
        }

        if (subcommand === "horizon") {
            const type = interaction.options.getString("type");
            
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

        if (subcommand === "joke") {
            let response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
            let joke;

            if (response.data.type === "twopart") {
                joke = response.data.setup + " " + `${bold(response.data.delivery)}`;
            } else if (response.data.type === "single") {
                joke = response.data.joke;
            }
            
            const embed = new MessageEmbed()
                .setTitle(response.data.category)
                .setDescription(joke)
                .setColor(Math.floor(Math.random() * 0xFFFFFF))
                .setFooter({
                    text: "Powered by https://v2.jokeapi.dev",
                    iconURL: "https://sv443.net/resources/images/jokeapi.png"
                });
            
            await interaction.reply({ content: "✨ I found a joke!", embeds: [embed] });
        }

        if (subcommand === "meme") {
            const response = await axios.get("https://meme-api.herokuapp.com/gimme");
            const meme = response.data;

            if (meme.nsfw) {
                return this.run(interaction, "meme");
            }

            const embed = new MessageEmbed()
                .setTitle(meme.title)
                .setDescription(`By ${meme.author} from r/${meme.subreddit}`)
                .setImage(meme.url)
                .setColor(Math.floor(Math.random() * 0xFFFFFF))
                .setFooter({
                    text: `Powered by https://meme-api.herokuapp.com`
                });

            await interaction.reply({ content: "🤣 I found a meme!", embeds: [embed] });
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
                .setTitle(`${author}`)
                .setDescription(`${quote}`)
                .setColor(Math.floor(Math.random() * 0xFFFFFF))
                .setFooter({
                    text: "Powered by https://quotable.io",
                });

            await interaction.reply({ content: "💬 I found a quote!", embeds: [quote_embed] });
        }
	}
};

