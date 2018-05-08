const discord = require("discord.js");
const config = require("../config.json");
var esbot = require("../esBot.js");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);
var serverName = "../db/servers.json";
var serverSettings = require(serverName);
var schedule = require('node-schedule');

exports.run = (bot, msg, args) => {

	if (msg.author.id != config.admin_id) {
		
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
        	.setColor(0xFF0040)
        	.setDescription("You do not have the required permissions to do this.")
	       	.setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");
        msg.channel.sendEmbed(embed).catch(console.error);
  	    return;
	}

	else if( args[0].toLowerCase() == "event1" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event1 = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event1 name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event1 has been set to: `" + file["gList"].event1 + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event1d" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event1D = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event1D has been set to: `" + file["gList"].event1D + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event2" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event2 = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event2 has been set to: `" + file["gList"].event2 + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event2d" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event2D = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event2D has been set to: `" + file["gList"].event2D + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event3" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event3 = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event3 has been set to: `" + file["gList"].event3 + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event3d" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event3D = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event3D has been set to: `" + file["gList"].event3D + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event4" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event4 = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event4 has been set to: `" + file["gList"].event4 + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "event4d" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["gList"].event4D = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("Event4D has been set to: `" + file["gList"].event4D + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "desc" ) {
		let desc = args.slice(1);
		desc = desc.join(" ");

		file["gList"].desc = desc;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating gList desc in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("https://gbf.wiki/images/d/dc/Stamp2.png")
			.setDescription("gList desc has been set to: `" + file["gList"].desc + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}


	else {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFF0040)
			.setTitle("Error:")
			.setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png")
			.setDescription("Please enter in the format of `glist [event1/event1d/event2/event2d/event3/event3d/event4/event4d/desc] [value]`.");

		msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

}

exports.help = (bot, msg, args) => {
	return "Use `event [end/name/desc/img/url] [value]` to change the event settings. Event end date should be entered in the format of `[year] [month] [day] [hour] [minute] [second]`.";
}

function updateGlobals() {
	fs.writeFile(__dirname + '/../db/globals-temp.json', JSON.stringify(file, null, 4), error=>{
		if (error) console.log(error)
		else {
			fs.stat(__dirname + '/../db/globals-temp.json', (err, stats)=>{
				if (err) console.log(err)
				else if (stats["size"] < 2) console.log('Prevented globals from being overwritten');
				else {
					fs.rename(__dirname + '/../db/globals-temp.json', __dirname + '/../db/globals.json', e=>{if(e)console.log(e)});
				}
			});
		}
	})
}

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]); // Note: months are 0-based
}