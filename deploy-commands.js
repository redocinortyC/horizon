const fs = require("fs");
const path = require("path");

const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
const { Routes } = require("discord-api-types/v9");
const { token, clientId, guildId } = require("./utils/env");

const rest = new REST({ version: "9" }).setToken(token);

const commands = [];

// Push all commands to array
const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
	const folderPath = path.join(commandsPath, folder);
	const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(filePath);
		commands.push(command.data.toJSON());
	}
}

// Register all commands
(async () => {
	try {
		console.log(chalk.yellow("[DEPLOY] Started refreshing application (/) commands..."));
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log(chalk.green("[DEPLOY] Successfully refreshed application (/) commands!"));
		
		// print out all commands
		console.log(chalk.cyan("\n[DEPLOY] Registered commands:"));
		commands.forEach(command => {
			console.log(chalk.cyan(`[COMMAND] - ${command.name}`));
		});

	} catch (error) {
		console.error(error);
	}
})();
