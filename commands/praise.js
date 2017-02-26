var request = require("superagent");
const discord = require("discord.js");

var praise = [
  " is super cute!",
  " is very nice!",
  " is such a sweet person!",
  " is pretty awesome!",
  " is hella adorable!",
  ", I could eat you right up!",
  " is a cool guy!"
]

exports.run = (bot, msg, args) => {

	if (msg.mentions.users.size === 1) {

		let embed = new discord.RichEmbed();
		embed.setColor(0xFF69B4)
			.setTitle("Praised!")
			.setThumbnail("http://i.imgur.com/nRleyfl.png")
			.setDescription("**Daikichi says:** " + msg.mentions.users.first() + praise[Math.floor(Math.random() * (praise.length))]);

		msg.channel.sendEmbed(embed).catch(console.error);
	} 
	else { 
		let embed = new discord.RichEmbed();
		embed.setColor(0xFF69B4)
			.setTitle("Praised!")
			.setThumbnail("http://i.imgur.com/nRleyfl.png")
			.setDescription("**Daikichi says:** " + msg.author + praise[Math.floor(Math.random() * (praise.length))]);

		msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bots, msg, args) => {
	return "To praise someone, just use `!praise (optional)[user]`.";
}