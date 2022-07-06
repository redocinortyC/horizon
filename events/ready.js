const chalk = require('chalk');

// On ready event 
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.green("\n[READY] %s is ready!\n"), client.user.tag);
	},
};