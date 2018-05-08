const discord = require("discord.js");
const config = require("../config.json");

var fs = require('fs');
var fileName = "../db/servers.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	if (msg.channel.type == "dm" || msg.channel.type == "group") {
		let embed = new discord.RichEmbed();
	        embed.setTitle("Error:")
	        	.setColor(0xFF0040)
	        	.setDescription("Please use this command in a server, not a DM!")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.channel.sendEmbed(embed).catch(console.error);
	        return;
	}

	if (msg.author.id != config.admin_id) {
		
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
        	.setColor(0xFF0040)
        	.setDescription("You do not have the required permissions to do this.")
	       	.setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
  	    return;
	}

//=========================================================================

	else if (args[0].toLowerCase() == "gbf") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].gbf = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating gbf in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**gbf** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].gbf = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating gbf in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**gbf** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("gbf can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================

else if (args[0].toLowerCase() == "gnotify") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].gNotify = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating gNotify in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**gNotify** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].gNotify = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating gNotify in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**gNotify** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("gNotify can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================

else if (args[0].toLowerCase() == "check") {
	let embed = new discord.RichEmbed();

	embed.setTitle("GBF Settings for: " + msg.guild.name)
		.setColor(0x3399FF)
		.addField("GBF", file[msg.guild.id].gbf)
		.addField("GBF Channel", bot.channels.get(file[msg.guild.id].gNotifyChannel).name)
		.addField("GBF Notifications", file[msg.guild.id].gNotify)
		.setThumbnail("http://i.imgur.com/7TL0t99.png");
	msg.author.sendEmbed(embed).catch(console.error);
	return;
}

//=========================================================================

		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
			.setColor(0xFF0040)
			.setDescription("Only `gbf and gnotify` are allowed.")
			.setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bot, msg, args) => {
	return "Use `gset check` to see server settings or `gset [var] [value]` to change the server settings.  Allowed: `gbf and gnotify`";
}

function updateSettings() {
	fs.writeFile(__dirname + '/../db/servers-temp.json', JSON.stringify(file, null, 4), error=>{
		if (error) console.log(error)
		else {
			fs.stat(__dirname + '/../db/servers-temp.json', (err, stats)=>{
				if (err) console.log(err)
				else if (stats["size"] < 2) console.log('Prevented servers from being overwritten');
				else {
					fs.rename(__dirname + '/../db/servers-temp.json', __dirname + '/../db/servers.json', e=>{if(e)console.log(e)});
				}
			});
		}
	})
}