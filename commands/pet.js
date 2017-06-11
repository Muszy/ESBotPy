var request = require("superagent");
const discord = require("discord.js");

var pets = ["http://i.imgur.com/Y3GB3K1.gif", "http://i.imgur.com/f7ByidM.gif", "http://i.imgur.com/LUpk6b6.gif", "http://i.imgur.com/eOJlnwP.gif",	"http://i.imgur.com/VmdfAIg.gif", "http://i.imgur.com/OYiSZWX.gif", "http://i.imgur.com/jwiVoa8.gif"]

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Petting")
			.setImage(pets[Math.floor(Math.random() * (pets.length))])
			.setDescription("**" + msg.mentions.users.first().username+ "** was pet by **" + msg.author.username + "**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else if (args.length>0) {

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Petting")
			.setImage(pets[Math.floor(Math.random() * (pets.length))])
			.setDescription("**" + args.join(" ").trim()+ "** was pet by **" + msg.author.username + "**");

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Petting")
			.setImage("http://i.imgur.com/P6tTJUm.gif")
			.setDescription("**DaikichiBot** was pet by **" + msg.author.username + "**");

		msg.channel.sendEmbed(embed).catch(console.error);
	}
	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To pet someone, just use `!pet (optional)[user]`.";
}