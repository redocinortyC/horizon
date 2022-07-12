const { Collection } = require("discord.js");
const client = require("../utils/client");
const { cooldown_duration } = require("../config.json");
const chalk = require("chalk");

const cooldowns = new Collection();

if (!cooldown_duration) {
    cooldown_duration = 10000; // Default cooldown duration
}

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
                console.log(chalk.yellow("[COOLDOWN] %s is on cooldown for %s."), interaction.user.tag, interaction.commandName);
                interaction.reply(`You can only use this command once every ${cooldown_duration / 1000} seconds.`);
                return;
            } else {
                
                try {
                    await command.execute(interaction);
                    console.log(chalk.magenta("[INTERACTION] %s executed the %s command in #%s."), interaction.user.tag, interaction.commandName, interaction.channel.name);
                } catch (err) {
                    console.error(err);
                }

                cooldowns.set(cooldown.user + cooldown.command);
                setTimeout(() => {
                    cooldowns.delete(cooldown.user + cooldown.command);
                }, cooldown_duration);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
	},
};