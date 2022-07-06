const fs = require("fs");
const path = require("path");

const { Collection } = require("discord.js");

const client = require("./utils/client");
const { token } = require("./utils/env");

client.commands = new Collection();

// Command handling
const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
	const folderPath = path.join(commandsPath, folder);
	const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}

// Event handling
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
