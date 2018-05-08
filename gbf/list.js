const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	try {
		let embed = new discord.RichEmbed();

	    embed.setTitle("Upcoming Events")
	    	.setColor(0xFFB400)
	    	.setDescription(file["gList"].desc)
	    	.addField(file["gList"].event1, file["gList"].event1D)
	    	.addField(file["gList"].event2, file["gList"].event2D)
	    	.addField(file["gList"].event3, file["gList"].event3D)
	    	.addField(file["gList"].event4, file["gList"].event4D)
	    	.setThumbnail("https://gbf.wiki/images/7/76/Stamp155.png");

	    msg.channel.sendEmbed(embed).catch(console.error);
	}

	catch (err) {
		let embed = new discord.RichEmbed();
	    embed.setTitle("Error:")
	        .setColor(0xFF0040)
	        .setDescription("There was a problem in generating the info!")
	        .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bot, msg, args) => {
	return "To get info about the current event, just use `event`.";
}