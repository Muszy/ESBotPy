var request = require("superagent");
const discord = require("discord.js");

var waves = ["http://i.imgur.com/yEuIcwb.gif", "http://i.imgur.com/HJqtBDw.gif", "http://i.imgur.com/cAxpAlw.gif", "http://i.imgur.com/XmNANxw.gif", "http://i.imgur.com/1mjlTcC.gif", "http://i.imgur.com/gr8ItMM.gif", "http://i.imgur.com/r43lW77.gif", "http://i.imgur.com/zQqX6Ot.gif", "http://i.imgur.com/Ton0ww8.gif"]

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Waves!")
			.setImage(waves[Math.floor(Math.random() * (waves.length))])
			.setDescription(msg.author.username + " waves at **" + msg.mentions.users.first().username + "!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else if (args.length > 0) {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Waves!")
			.setImage(waves[Math.floor(Math.random() * (waves.length))])
			.setDescription(msg.author.username + " waves at **" + args.join(" ").trim() + "!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Waves!")
			.setImage(waves[Math.floor(Math.random() * (waves.length))])
			.setDescription("**" + msg.author.username + " waves at Daikichi Bot!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	}
	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To wave at someone, just use `!wave (optional)[user]`.";
}