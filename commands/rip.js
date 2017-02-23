const discord = require("discord.js");
var request = require("request");
var fs = require('fs')
  , gm = require('gm');

var dir = './img/';
var curYear = '2017';

exports.run = (bot, msg, args) => {

	if (args.length < 2) {
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use the format: `!rip [year] [user]`.")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");

		msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

	let date = args[0];
	let victim = args.slice(1).join(" ").trim();

	gm(dir + 'rip.png')
		.font('Helvetica-Normal')
		.gravity("Center")
		.fontSize("36")
		.drawText(-6, 40, victim)
		.fontSize("14")
		.drawText(-6, 90, date + " - " + curYear)
		.write(dir + 'ripTemp.png', function(err) {
			if(!err) {
				console.log("Written composite image.");
				msg.channel.sendFile(dir + 'ripTemp.png', "rip.png");
			}
			else if(err) console.log(err);
		});

}

exports.help = (bots, msg, args) => {
	return "To make someone's tombstone, just use `!rip [year] [user]`.";
}