var serversName = "../db/servers.json";
var serverSettings = require(serversName);
const discord = require("discord.js");


exports.run = (bot, member, guild) => {
	//console.log("new member");
	//console.log(member.guild.id);

	//console.log(serverSettings[member.guild.id].notify);

	if(serverSettings[member.guild.id].banAlerts) {
		let embed = new discord.RichEmbed();

		embed.setTitle("Goodbye...")
			.setColor(0xFFB6C1)
			.setDescription("Goodbye, " + member.user.username + ", we hope that you produce with us again someday!")
			.setThumbnail("http://i.imgur.com/nRleyfl.png");

		let ch = serverSettings[member.guild.id].notifyChannel;
		bot.channels.get(ch).sendEmbed(embed).catch(console.error);
	}
}