const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	try {
		let embed = new discord.RichEmbed();

	    embed.setTitle(file["event"].name)
	    	.setColor(0xFFB400)
	    	.setDescription(file["event"].desc)
	    	.setImage(file["event"].img)
	    	.setURL(file["event"].url);

	    if (file["event"].end != "") {
	    	let date = file["event"].end.split(", ");
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
	        .setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bot, msg, args) => {
	return "To get info about the current event, just use `event`.";
}