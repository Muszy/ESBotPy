const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/servers.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {
	let welcome = args.join(" ");

	file[msg.guild.id].welcome = welcome;

	fs.writeFile(fileName, JSON.stringify((file)), function (err) {
 		if (err) return console.log(err);
		//console.log(JSON.stringify(file));
		console.log('updating welcome in ' + fileName);
	});

	updateSettings();

	let embed = new discord.RichEmbed();

	embed.setTitle("Confirmation:")
		.setColor(0x3399FF)
		.setThumbnail("http://i.imgur.com/7TL0t99.png")
		.setDescription("Welcome has been set to: `" + file[msg.guild.id].welcome + "`");

	msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
	return "Use `welcome [welcome]` to change the server welcome.";
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