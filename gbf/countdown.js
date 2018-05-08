const discord = require("discord.js");
var fs = require('fs');
var schedule = require('node-schedule');
var fileName = "../db/globals.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	if ( file["gEvent"].end != "" ) {
		let present = new Date(Date.now()+1000);

		let temp = file["gEvent"].end;
		//console.log(temp.toString());
		var parts = temp.split(", ").join("-");
		//console.log(parts);
		let end= parseDate(parts);
		//console.log(end);

		let count = end - present;
		//console.log(count);

		var seconds = Math.floor( (count/1000) % 60 );
	  	var minutes = Math.floor( (count/1000/60) % 60 );
	  	var hours = Math.floor( (count/(1000*60*60)) % 24 );
	  	var days = Math.floor( count/(1000*60*60*24) );

	  	//console.log(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds remain");

	  	let embed = new discord.RichEmbed();
		embed.setTitle("Event Countdown:")
		    .setColor(0xFFB400)
		    .setDescription("**" + days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds** remaining for " + file["gEvent"].name + ".")
		    .setThumbnail("https://gbf.wiki/images/2/28/Stamp144.png");
		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {

		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
		    .setColor(0xFF0040)
		    .setDescription("No active event currently!")
		    .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");
		msg.channel.sendEmbed(embed).catch(console.error);
	}
}

exports.help = (bot, msg, args) => {
	return "To get the current event countdown, just use `countdown`.";
}

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]); // Note: months are 0-based
}