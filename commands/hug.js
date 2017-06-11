var request = require("superagent");
const discord = require("discord.js");

var hugs = ["http://i.imgur.com/2vJ2nse.gif", "http://i.imgur.com/JzaUwaT.gif", "http://i.imgur.com/McUWgVa.gif", "http://i.imgur.com/TdT536Q.gif", "http://i.imgur.com/0H1ryLF.gif", "http://i.imgur.com/D3y2b25.gif", "http://i.imgur.com/k8zlkH1.gif", "http://i.imgur.com/4E0tsCJ.gif", "http://i.imgur.com/QfQZOjV.gif", "http://i.imgur.com/Ui9MCyZ.gif", "http://i.imgur.com/QpDqQ7N.gif", "http://i.imgur.com/bI3RwiI.gif"]

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Hugs!")
			.setImage(hugs[Math.floor(Math.random() * (hugs.length))])
			.setDescription(msg.author.username + " hugs **" + msg.mentions.users.first().username + "!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else if (args.length > 0) {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Hugs!")
			.setImage(hugs[Math.floor(Math.random() * (hugs.length))])
			.setDescription(msg.author.username+ " hugs **" + args.join(" ").trim() + "!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Hugs!")
			.setImage("http://i.imgur.com/P6tTJUm.gif")
			.setDescription("**" + msg.author.username + " hugs Daikichi Bot!**");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To hug someone, just use `!hug (optional)[user]`.";
}