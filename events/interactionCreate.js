const { Collection } = require("discord.js");
const client = require("../utils/client");
const chalk = require("chalk");

// Cooldown handler
const cooldowns = new Collection();
const duration = 10000;

// On interaction create event 
module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            const cooldown = {
                user: interaction.user.id,
                command: interaction.commandName,
            }

            if (cooldowns.has(cooldown.user + cooldown.command)) {
                console.log(chalk.yellow("[INTERACTION] %s is on cooldown for %s."), interaction.user.tag, interaction.commandName);
                interaction.reply(`You can only use this command once every ${duration / 1000} seconds.`);
                return;
            } else {
                console.log(chalk.magenta("[INTERACTION] %s executed the %s command in #%s."), interaction.user.tag, interaction.commandName, interaction.channel.name);
                await command.execute(interaction);
                cooldowns.set(cooldown.user + cooldown.command);
                setTimeout(() => {
                    cooldowns.delete(cooldown.user + cooldown.command);
                }, duration);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};