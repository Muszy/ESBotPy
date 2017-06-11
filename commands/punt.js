var request = require("superagent");
const discord = require("discord.js");

var punts = ["into the San Francisco Bay!", "into a volcano!", "into the abyss.", "into a god damn cactus.", "into the void.", "into the Eye of Sauron.", "into dank memes.", "into 5000 BEES.", "into the Marianas Trench.", "off Mount Everest!", "into a pitfall!", "off the map!", "into a trash can!"]
var img = ["http://i.imgur.com/Wh249YP.gif", "http://i.imgur.com/xn6GIVb.gif", "http://i.imgur.com/aAYyZNG.gif", "http://i.imgur.com/UMKL5YP.gif", "http://i.imgur.com/jNhltDT.gif", "http://i.imgur.com/RwZ4gLS.gif", "http://i.imgur.com/ylBuzSP.gif", "http://i.imgur.com/7iqyy2i.gif", "http://i.imgur.com/T6cmuXy.gif", "http://i.imgur.com/DkyiZ3H.gif"]

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Punted!")
			.setImage(img[Math.floor(Math.random() * (img.length))])
			.setDescription("**" + msg.author.username + "** punts **" + msg.mentions.users.first().username + "** " + punts[Math.floor(Math.random() * (punts.length))]);

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else if (args.length > 0) {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Punted!")
			.setImage(img[Math.floor(Math.random() * (img.length))])
			.setDescription("**" + msg.author.username + "** punts **" + args.join(" ").trim() + "** " + punts[Math.floor(Math.random() * (punts.length))]);

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Punted!")
			.setImage(img[Math.floor(Math.random() * (img.length))])
			.setDescription("**" + msg.author.username + "** has punted themself " + punts[Math.floor(Math.random() * (punts.length))]);

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To punt someone, just use `!punt (optional)[user]`.";
}