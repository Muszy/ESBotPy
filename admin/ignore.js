const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/servers.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	if (args.length > 0 && args[0] == "list") {
		var igList = [];
		for (var i = file[msg.guild.id].ignore.length - 1; i >= 0; i--) {
			let channel = msg.guild.channels.get(file[msg.guild.id].ignore[i]);
			console.log(channel.name);
			igList.push(channel.name);
	}
	let embed = new discord.RichEmbed();
	embed.setTitle("List of Ignored Channels:")
		.setColor(0x3399FF)
		.setDescription(igList)
		.setThumbnail("http://i.imgur.com/7TL0t99.png");
	msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

	let channel = msg.channel;

	let check = -1;
	for (var i = file[msg.guild.id].ignore.length - 1; i >= 0; i--) {
	if (channel.id === file[msg.guild.id].ignore[i]) {
		check = i;
		}
	}

	if(check == -1) {
		file[msg.guild.id].ignore.push(channel.id);

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
			if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating ignores in ' + fileName);
		});

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setDescription("Now ignoring channel: `" + channel.name +"`")
			.setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);

		updateSettings();
	
	}

	else {
		file[msg.guild.id].ignore.splice(check,1);

		fs.writeFile(fileName, JSON.stringify((file)), function (err) {
			if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating ignores in ' + fileName);
		});

		let embed = new discord.RichEmbed();

		embed.setTitle("Confirmation:")
			.setColor(0x3399FF)
			.setDescription("Now unignoring channel: `" + channel.name +"`")
			.setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);

		updateSettings();
	}
}

exports.help = (bot, msg, args) => {
	return "Use `ignore` to make me ignore a certain channel.";
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