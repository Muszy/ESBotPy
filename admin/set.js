const discord = require("discord.js");
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

	if (args[0].toLowerCase() == "banalerts") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].banAlerts = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating banalerts in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Ban Alerts** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].banAlerts = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating banalerts in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Ban Alerts** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Ban Alerts can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "notify") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].notify = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating notifications in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Notifications** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].notify = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating notifications in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Notifications** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Notifications can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "greet") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].greet = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating greetings in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Greetings** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].greet = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating greetings in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Greetings** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Greetings can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "tags") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].tags = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating tagging in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Self-tagging** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].tags = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating tagging in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Self-tagging** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Self-tagging can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}bot.channels.get(file[msg.guild.id].notificationChannel)

//=========================================================================
	if (args[0].toLowerCase() == "diagen") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].diaGen = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating diaGen in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Dia Generation** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].diaGen = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating diaGen in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Dia Generation** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Dia Generation can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "diachance") {
		let value = args.slice(1);

		if (!isNaN(value[0])) {
			file[msg.guild.id].diaChance = parseInt(value[0]);

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating diaChance in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Dia Chance** set to " + value[0] + "%.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Dia Chance must be set to a number.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "diatype") {
		let value = args.slice(1);

		if ((value[0])) {
			file[msg.guild.id].diaType = value.join(" ");

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating diaType in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Dia Type** set to " + value.join(" ") + ".")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Dia Type must be valid.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "enstars") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].enstars = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating enstars in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Enstars** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].enstars = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating enstars in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Enstars** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Enstars can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "bandori") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].bandori = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating bandori in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**bandori** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].bandori = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating bandori in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**bandori** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("bandori can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "bnotify") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].bNotify = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating bNotify in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**bNotify** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].bNotify = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating bNotify in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**bNotify** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("bNotify can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================
	if (args[0].toLowerCase() == "gbf") {
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
	if (args[0].toLowerCase() == "sino") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].sino = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating sino in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**sino** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].sino = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating sino in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**sino** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("sino can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
			return;
		}

	}

//=========================================================================

if (args[0].toLowerCase() == "check") {
	let embed = new discord.RichEmbed();

	embed.setTitle("Server Settings for: " + msg.guild.name)
		.setColor(0x3399FF)
		.addField("Notifications", file[msg.guild.id].notify)
		.addField("Notifications Channel", bot.channels.get(file[msg.guild.id].notifyChannel).name)
		.addField("Welcome Channel", bot.channels.get(file[msg.guild.id].welcomeChannel).name)
		.addField("Greetings", file[msg.guild.id].greet)
		.addField("Ban Alerts", file[msg.guild.id].banAlerts)
		.addField("Tagging", file[msg.guild.id].tags)
		.addField("Dia Generation", file[msg.guild.id].diaGen)
		.addField("Dia Chance", file[msg.guild.id].diaChance)
		.addField("Dia Type", file[msg.guild.id].diaType)
		.addField("Enstars", file[msg.guild.id].enstars)
		.addField("Bandori", file[msg.guild.id].bandori)
		.addField("BNotifications", file[msg.guild.id].bNotify)
		.addField("Bandori Channel", bot.channels.get(file[msg.guild.id].bNotifyChannel).name)
		.setThumbnail("http://i.imgur.com/7TL0t99.png");
		if (file[msg.guild.id].welcome != "") {
			embed.addField("Welcome Msg", file[msg.guild.id].welcome);
		}
		else {
			embed.addField("Welcome Msg", "None");
		}
	msg.author.sendEmbed(embed).catch(console.error);
	return;
}

//=========================================================================

		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
			.setColor(0xFF0040)
			.setDescription("Only `banAlerts, notify, greet, tags, diaGen, diaChance, diaType, enstars, bnotify, gbf, sino` are allowed.")
			.setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bot, msg, args) => {
	return "Use `set check` to see server settings or `set [var] [value]` to change the server settings.  Allowed: `banAlerts, notify, greet, tags`";
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