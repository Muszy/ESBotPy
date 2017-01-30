var serversName = "./../db/servers.json";
var serverSettings = require(serversName);

exports.run = (bot, guild) => {
	console.log(`Now ready in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
	bot.user.setGame("Ensemble Stars!");
}