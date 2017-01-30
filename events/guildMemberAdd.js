var serversName = "../db/servers.json";
var serverSettings = require(serversName);
const discord = require("discord.js");


exports.run = (bot, member, guild) => {
	console.log("new member: " + member.user.username +  " on " + member.guild.name);
	//console.log(member.guild.id);

	//console.log(serverSettings[member.guild.id].notify);

	if(serverSettings[member.guild.id].greet) {
		let embed = new discord.RichEmbed();

		embed.setTitle("Welcome " + member.user.username + "!")
			.setColor(0xFFB6C1)
			.setDescription(serverSettings[member.guild.id].welcome.replace(/\$USER\$/gi, '<@' + member.user.id + '>').replace(/\$SERVER\$/gi, member.guild.name.replace(/@/g, '@\u200b')))
			.setThumbnail("http://i.imgur.com/nRleyfl.png");

		let ch = serverSettings[member.guild.id].notifyChannel;
		bot.channels.get(ch).sendEmbed(embed).catch(console.error);
	}
}