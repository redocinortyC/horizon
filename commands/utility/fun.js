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
                .addStringOption(option => option.setName("question").setDescription("The question to ask the magic 8ball")))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("joke")
                .setDescription("Get a random joke."))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("quote")
                .setDescription("Get a random quote."))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("pet")
                .setDescription("Get a random pet pic.")
                .addStringOption(option => option.setName("type")
                    .setDescription("The type of pet to get.")
                    .setRequired(true)
                    .addChoices(
                        { name: "cat", value: "cat" },
                        { name: "dog", value: "dog" },
                    )))
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
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setFooter({
                    text: "Powered by https://v2.jokeapi.dev",
                    iconURL: "https://sv443.net/resources/images/jokeapi.png"
                });
            
            await interaction.reply({ content: "✨ I found a joke!", embeds: [embed] });
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
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setFooter({
                    text: "Powered by https://quotable.io",
                });

            await interaction.reply({ content: "💬 I found a quote!", embeds: [quote_embed] });
        }

        if (subcommand === "pet") {
            const type = interaction.options.getString("type");
            if (!type) {
                await interaction.reply({ content: "Please specify a type.", ephemeral: true });
                return;
            }

            if (type === "cat") {
                const cat_response = await axios.get("https://aws.random.cat/meow").catch(err => {
                    interaction.editReply({ content: "Error getting a cat.", ephemeral: true });
                    console.error(err);
                });

                const cat_data = cat_response.data;
                const cat_url = cat_data.file;

                const cat_embed = new MessageEmbed()
                    .setTitle("Cat")
                    .setURL(cat_url)
                    .setColor(Math.floor(Math.random() * 16777215).toString(16))
                    .setImage(cat_url)
                    .setFooter({
                        text: "Powered by https://aws.random.cat",
                    });

                await interaction.reply({ content: "🐱 I found a cat!", embeds: [cat_embed] });
            }

            if (type === "dog") {
                const dog_response = await axios.get("https://dog.ceo/api/breeds/image/random").catch(err => {
                    interaction.editReply({ content: "Error getting a dog.", ephemeral: true });
                    console.error(err);
                });

                const dog_data = dog_response.data;
                const dog_url = dog_data.message;

                const dog_embed = new MessageEmbed()
                    .setTitle("Dog")
                    .setURL(dog_url)
                    .setColor(Math.floor(Math.random() * 16777215).toString(16))
                    .setImage(dog_url)
                    .setFooter({
                        text: "Powered by https://dog.ceo",
                    });

                await interaction.reply({ content: "🐶 I found a dog!", embeds: [dog_embed] });
            }
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
	}
};

