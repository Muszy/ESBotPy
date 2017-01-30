const discord = require("discord.js");
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
	if (!file[msg.guild.id].tags) {
		let embed = new discord.RichEmbed();
	    embed.setTitle("Error:")
	        .setColor(0xFF0040)
	        .setDescription("Role tagging is off! Bork! 🐾")
	        .setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args.length < 1){
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
		let check = 0;

		for (var i = file[msg.guild.id].roles.length - 1; i >= 0; i--) {
			if (role === file[msg.guild.id].roles[i]) {
				check = 1;
			}
		}

		if (check==1) {

			try {
				let myRole = msg.guild.roles.find("name", role);

				if(!msg.member.roles.has(myRole.id)) {
					let embed = new discord.RichEmbed();

					embed.setTitle("Error:")
			    		.setColor(0xFF0040)
			        	.setDescription("You don't have that role!")
			        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
			        msg.channel.sendEmbed(embed).catch(console.error);
				} else {
					try {
						let can_roles = msg.channel.permissionsFor(bot.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
						//console.log(can_roles);

						if (can_roles) {
							let id = msg.author.id;
							let member = msg.guild.member(id);

							member.removeRole(myRole).catch(console.error);
							let embed = new discord.RichEmbed();

							embed.setTitle("Daikichi says:")
								.setColor(0xFFB6C1)
								.setDescription("You have been removed from the `" + myRole.name + "` role!")
								.setThumbnail("http://i.imgur.com/7TL0t99.png");
							msg.channel.sendEmbed(embed).catch(console.error);
						}

						else {
							let embed = new discord.RichEmbed();

							embed.setTitle("Error:")
					    		.setColor(0xFF0040)
					        	.setDescription("Daikichi does not have sufficient permissions to untag you.")
					        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
					        msg.channel.sendEmbed(embed).catch(console.error);
						}
					}

					catch (e) {
						let embed = new discord.RichEmbed();

						embed.setTitle("Error:")
				    		.setColor(0xFF0040)
				        	.setDescription("Daikichi does not have sufficient permissions to untag you.")
				        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
				        msg.channel.sendEmbed(embed).catch(console.error);
					}
				}
			}

			catch (e) {
				let embed = new discord.RichEmbed();

				embed.setTitle("Error:")
		    		.setColor(0xFF0040)
		        	.setDescription("Please use a valid role!")
		        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
		        msg.channel.sendEmbed(embed).catch(console.error);
			}
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
	    		.setColor(0xFF0040)
	        	.setDescription("Please use a valid role/role in the list!")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.channel.sendEmbed(embed).catch(console.error);
		}
	}

}

exports.help = (bot, msg, args) => {
	return "Use `!iamnot [role]` to remove yourself from a role. You can look at the list of roles with `!iam list`!";
}