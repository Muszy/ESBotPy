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
	       	.setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
  	    return;
	}

	if( args[0].toLowerCase() == "name" ) {
		let title = args.slice(1);
		title = title.join(" ");

		file["bEvent"].name = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event name has been set to: `" + file["bEvent"].name + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "desc" ) {
		let desc = args.slice(1);
		desc = desc.join(" ");

		file["bEvent"].desc = desc;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event desc in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event desc has been set to: `" + file["bEvent"].desc + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "img") {
		let img = args.slice(1);
		img = img.join(" ");

		file["bEvent"].img = img;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event img in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event img has been set to: `" + file["bEvent"].img + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "url") {
		let url = args.slice(1);
		url = url.join(" ");

		file["bEvent"].url = url;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event url in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event url has been set to: `" + file["bEvent"].url + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "end" && args[1].toLowerCase() != "reset") {
		let input = args.slice(1);
		//checking if the date is right~
		if ( input.length != 6) {
			let embed = new discord.RichEmbed();
			embed.setColor(0xFF0040)
				.setTitle("Error:")
				.setThumbnail("http://i.imgur.com/7TL0t99.png")
				.setDescription("Please enter in the format of `event end [year] [month] [day] [hour] [minute] [second]`.");

			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}
		//checkin g more stuff im so rroy for this ugly ass t HIGNFOMG
		if (input[0].length != 4 || input[1].length > 2 || input[2].length > 2 || input[3].length > 2 || input[4].length > 2 || input[5].length > 2 || input[1] > 12 || input[1] < 1 || input[2] > 31 || input[2] < 1 || input[3] > 23 || input[3] < 0 || input[4] > 59 || input[4] < 0 || input[5] > 59 || input[5] < 0) {
			let embed = new discord.RichEmbed();
			embed.setColor(0xFF0040)
				.setTitle("Error:")
				.setThumbnail("http://i.imgur.com/7TL0t99.png")
				.setDescription("Please enter in the format of `event end [year] [month] [day] [hour] [minute] [second]`.");

			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		//input[1] = input[1] - 1;

		let end = input.join(", ");
		//console.log(input[1]);
		//console.log(end);

		file["bEvent"].end = end;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event end day in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event end day has been set to: " + (input[1]) + "/" + input[2] + "/" + input[0] + " at " + input[3] + ":" + input[4] + ":" + input[5] + " EST. (M/D/Y)");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "end" && args[1].toLowerCase() == "reset") {

		file["bEvent"].end = "";

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating event url in ' + fileName);
		});

		updateGlobals();

		esbot.bEventReset();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Event end has been reset.");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFF0040)
			.setTitle("Error:")
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Please enter in the format of `event [end/name/desc/img/url] [value]`.");

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