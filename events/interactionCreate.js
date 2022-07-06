const client = require('../utils/client');
const chalk = require('chalk');

// On interaction create event 
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        console.log(chalk.magenta("[INTERACTION] %s executed the %s command in %s."), interaction.user.tag, interaction.commandName, interaction.channel.name);
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};