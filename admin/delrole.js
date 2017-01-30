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
	if (args.length < 1){
		console.log(file[msg.guild.id].roles);
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
		    .setColor(0xFF0040)
		    .setThumbnail("http://i.imgur.com/7TL0t99.png")
		    .setDescription("Please specify a role!");
		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {

		let role = args.join(" ");
		//console.log(role);

		try {

				let check = -1;
				for (var i = file[msg.guild.id].roles.length - 1; i >= 0; i--) {
					if (role === file[msg.guild.id].roles[i]) {
					check = i;
					}
				}

				if (check<0) {
					let embed = new discord.RichEmbed();

					embed.setTitle("Error:")
						.setColor(0xFF0040)
						.setDescription("Role does not exist on list.")
						.setThumbnail("http://i.imgur.com/7TL0t99.png");
					msg.channel.sendEmbed(embed).catch(console.error);
				}

				else {
					file[msg.guild.id].roles.splice(check,1);

					fs.writeFile(fileName, JSON.stringify((file)), function (err) {
			  			if (err) return console.log(err);
						//console.log(JSON.stringify(file));
						console.log('updating roles in ' + fileName);
					});

					let embed = new discord.RichEmbed();

					embed.setTitle("Confirmation:")
						.setColor(0x3399FF)
						.setDescription("Role `" + role + "` removed from tag list.")
						.setThumbnail("http://i.imgur.com/7TL0t99.png");
					msg.channel.sendEmbed(embed).catch(console.error);

					updateRoles();
				}
		}

		catch(e) {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Role does not exist.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}
	}
}

exports.help = (bot, msg, args) => {
	return "Use `delrole [role]` to remove a role from the list of self-taggable roles.";
}

function updateRoles() {
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