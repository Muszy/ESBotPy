const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	try {
		let embed = new discord.RichEmbed();

	    embed.setTitle(file["enEvent"].name)
	    	.setColor(0xFFB400)
	    	.setDescription(file["enEvent"].desc)
	    	.setImage(file["enEvent"].img)
	    	.setURL(file["enEvent"].url);

	    if (file["enEvent"].end != "") {
	    	let date = file["enEvent"].end.split(", ");
	    	//console.log(date);
	    	embed.addField("Event End", (date[1]) + "/" + date[2] + "/" + date[0] + " at " + date[3] + ":" + date[4] + " EST / " + (date[3]-3) + ":" + date[4] + " PST / " + (parseInt(date[3])+5) + ":" + date[4] + " GMT" + ". (M/D/Y / 24hr time)")
	    }

	    msg.channel.sendEmbed(embed).catch(console.error);
	}

	catch (err) {
		let embed = new discord.RichEmbed();
	    embed.setTitle("Error:")
	        .setColor(0xFF0040)
	        .setDescription("There was a problem in generating the info! Check url/img (the most common offenders). 🐾")
	        .setThumbnail("http://i.imgur.com/XMVTWl9.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bot, msg, args) => {
	return "To get info about the current event in Bandori, just use `enEvent`.";
}