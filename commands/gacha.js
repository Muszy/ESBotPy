const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	try {
		let embed = new discord.RichEmbed();

	    embed.setTitle(file["gacha"].name)
	    	.setColor(0xFFB400)
	    	.setDescription(file["gacha"].desc)
	    	.setImage(file["gacha"].img)
	    	.setURL(file["gacha"].url);
	    msg.channel.sendEmbed(embed).catch(console.error);
	}

	catch (err) {
		let embed = new discord.RichEmbed();
	    embed.setTitle("Error:")
	        .setColor(0xFF0040)
	        .setDescription("There was a problem in generating the info! Check url/img (the most common offenders). 🐾")
	        .setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bot, msg, args) => {
	return "To get info about the current event gacha, just use `gacha`.";
}