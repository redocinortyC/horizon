const client = require("../utils/client");
const chalk = require("chalk");
const axios = require("axios");

// On ready event 
module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		// check the sunrise and sunset time for singapore from https://sunrise-sunset.org/api
		const response = axios.get("https://api.sunrise-sunset.org/json?lat=1.352083&lng=103.819836&date=today&formatted=0");
		response.then(res => {
			const sunrise = new Date(res.data.results.sunrise);
			const sunset = new Date(res.data.results.sunset);
			const now = new Date();
			let status = "";

			client.user.setStatus((now > sunrise && now < sunset) ? "online" : "idle");

			if (now > sunrise && now < sunset) {
				status = "the day goes by";
			} else {
				status = "the night falls";
			}

			client.user.setActivity(status, { type: "WATCHING" });

			console.log(chalk.green(`\n[READY] %s is ready and watching ${status}!\n`), client.user.tag);
		}).catch(err => {
			console.error(err);
		});
	},
};