var request = require("superagent");
const discord = require("discord.js");

var smites = ["with a stray lightningbolt!", "by calling upon the power of Zeus!", "with the pure force of their will.", "by summoning a thunderstorm to rain down upon them.", "by calling upon the power of Jupiter!", "with 5000 BEES.", "by channeling their inner rage.", "with a GIANT BLOB."]

exports.run = (bot, msg, args) => {
	var auth = msg.author.id;
	if (msg.mentions.users.size === 1) {
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("SMITED!")
			.setDescription(msg.author+ " has smited **" + msg.mentions.users.first() + "** " + smites[Math.floor(Math.random()*smites.length)]);

		msg.channel.sendEmbed(embed).then(m => m.delete(10000)).catch(console.error);
	} 
	else if (args.length > 0) {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("SMITED!")
			.setDescription("**" + msg.author+ "** has smited **" + args.join(" ").trim() + "** " + smites[Math.floor(Math.random()*smites.length)]);

		msg.channel.sendEmbed(embed).then(m => m.delete(10000)).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("SMITED!")
			.setDescription("**" + msg.author + "** has smited themself " + smites[Math.floor(Math.random() * (smites.length))] );

		msg.channel.sendEmbed(embed).then(m => m.delete(10000)).catch(console.error);
	}
	msg.delete(1500);
}

exports.help = (bots, msg, args) => {
	return "To smite someone, just use `!smite (optional)[user]`.";
}