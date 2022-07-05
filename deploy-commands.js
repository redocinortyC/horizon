const fs = require('fs');
const path = require('path');

const { REST } = require('@discordjs/rest');
const chalk = require('chalk');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./utils/env');

const rest = new REST({ version: '9' }).setToken(token);

const commands = [];

// Push all commands to array
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Register all commands
(async () => {
	try {
		console.log(chalk.yellow("Started refreshing application (/) commands..."));
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log(chalk.green("Successfully refreshed application (/) commands!"));
	} catch (error) {
		console.error(error);
	}
})();
