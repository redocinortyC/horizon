const chalk = require("chalk");
const axios = require("axios");
const { ipgeolocation } = require("../utils/env");
const { ActivityType } = require("discord.js");

const location = "Los Angeles, CA";

// On ready event 
module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		// check the sunrise and sunset time for singapore
		const response = axios.get(`https://api.ipgeolocation.io/astronomy?apiKey=${ipgeolocation}&location=${location}`);
		response.then(res => {
			let status = `the sun rising at ${res.data.sunrise} AM`;
			client.user.setActivity(status, { type: ActivityType.Watching });
			console.log(chalk.green(`\n[READY] ${client.user.tag} is ready and watching ${status}!\n`));
		}).catch(err => {
			console.error(err);
		});
	},
};