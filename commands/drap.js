const discord = require("discord.js");
var request = require("request");
var fs = require('fs')
  , gm = require('gm');

var dir = './img/';

exports.run = (bot, msg, args) => {

	if (args.length > 0) {

	let text = args.join(" ").trim();

	gm(dir + 'coffee.png')
		.font('Helvetica-Normal')
		.gravity("Center")
		.fontSize("64")
		.drawText(-460, 470, text)
		.write(dir + 'coffeeTemp.png', function(err) {
			if(!err) {
				console.log("Written composite image.");
				msg.channel.sendFile(dir + 'coffeeTemp.png', "coffee.png").catch(console.error);
			}
			else if(err) console.log(err);
		});
		msg.delete(1500);
		return;
	}

	else {
		let embed = new discord.RichEmbed();
	    embed.setColor(0xFFB6C1)
	        .setImage("http://i.imgur.com/BIPevJp.png");

	    msg.channel.sendEmbed(embed).catch(console.error);
		msg.delete(1500);
		return;
	}
}

exports.help = (bots, msg, args) => {
	return "To make a coffee mug, just use `!drap [optional text]`.";
}