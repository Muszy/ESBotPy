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

	file[msg.guild.id].enNotifyChannel = msg.channel.id;

	fs.writeFile(fileName, JSON.stringify((file)), function (err) {
 		if (err) return console.log(err);
		//console.log(JSON.stringify(file));
		console.log('updating notification channel in ' + fileName);
	});

	updateSettings();

	let embed = new discord.RichEmbed();
	let channel = msg.guild.channels.get(file[msg.guild.id].enNotifyChannel);

	embed.setTitle("Confirmation:")
		.setColor(0x3399FF)
		.setThumbnail("http://i.imgur.com/7TL0t99.png")
		.setDescription("Bandori EN Notification channel is now: **" + channel.name + "**.");

	msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
	return "Use `ennotifyhere` to change the server notification channel.";
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