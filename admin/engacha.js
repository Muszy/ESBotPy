const discord = require("discord.js");
const config = require("../config.json");
var fs = require('fs');
var fileName = "../db/globals.json";
var file = require(fileName);

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

		file["enGacha"].name = title;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating gacha name in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Gacha name has been set to: `" + file["enGacha"].name + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if( args[0].toLowerCase() == "desc" ) {
		let desc = args.slice(1);
		desc = desc.join(" ");

		file["enGacha"].desc = desc;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating gacha desc in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Gacha desc has been set to: `" + file["enGacha"].desc + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "img") {
		let img = args.slice(1);
		img = img.join(" ");

		file["enGacha"].img = img;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating gacha img in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Gacha img has been set to: `" + file["enGacha"].img + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "url") {
		let url = args.slice(1);
		url = url.join(" ");

		file["enGacha"].url = url;

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
	 		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating gacha url in ' + fileName);
		});

		updateGlobals();

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Gacha url has been set to: `" + file["enGacha"].url + "`");

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {
		let embed = new discord.RichEmbed();
		embed.setColor(0xFF0040)
			.setTitle("Error:")
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setDescription("Please enter in the format of `gachas [name/desc/img/url] [value]`.");

		msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

}

exports.help = (bot, msg, args) => {
	return "Use `gachas [name/desc/name/url] [value]` to change the gacha settings.";
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