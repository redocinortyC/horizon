const chalk = require('chalk');

/** On ready event 
 * @param {Client} client The Discord client
*/
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.green("%s is ready!"), client.user.tag);
	},
};