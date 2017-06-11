var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Slapped!")
			.setImage("http://i.imgur.com/p615BrO.jpg")
			.setDescription(msg.mentions.users.first().username+ " was slapped by **" + msg.author.username + "!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Slapped!")
			.setImage("http://i.imgur.com/p615BrO.jpg")
			.setDescription("**" + msg.author.username + "** slaps!");

		msg.channel.sendEmbed(embed).catch(console.error);
	}
	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To pet someone, just use `!pet (optional)[user]`.";
}