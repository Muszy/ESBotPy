var request = require("superagent");
const discord = require("discord.js");

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
	if (args.length < 1) {
		let embed = new discord.RichEmbed();

		embed.setTitle("ℹ" + msg.channel.guild.name)
			.setColor(0xB48CF0)
			.setThumbnail(msg.channel.guild.iconURL)
			.addField("Server ID", msg.channel.guild.id)
			.addField("Owner", msg.channel.guild.owner)
			.addField("# of Members", msg.channel.guild.memberCount)
			.addField("Created", msg.channel.guild.createdAt);

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "roles") {
		let embed = new discord.RichEmbed()

		embed.setTitle("ℹ List of Roles")
			.setColor(0xB48CF0)
			.setDescription(msg.channel.guild.roles.map(role => role.name).join(', '));

		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args[0].toLowerCase() == "you" || args[0].toLowerCase() == "bot" || args[0].toLowerCase() == "daikichi" || args[0].toLowerCase() == "daikichibot") {
		let embed = new discord.RichEmbed();

		embed.setTitle(":feet: About Me!")
			.setColor(0xB48CF0)
			.setDescription("I'm **DaikichiBot**! I was created by <@108752547166031872> for use by the Ensemble Stars Discord! If you need any help, go ahead and use `!help` or `!help [command]`! You can find out more about me by clicking this and going to my site!\n\nSpecial thanks to Ke'ri for help with the cards data!")
			.setThumbnail("http://i.imgur.com/7TL0t99.png")
			.setURL("http://hanifish.github.io/enstars/bot.html");
		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else if (args.length > 1) {
		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
    		.setColor(0xFF0040)
        	.setDescription("Please look up person at a time!")
        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
	}

	else if ( msg.mentions.users.size === 1 ) {
		//console.log(msg.mentions.users);
		var id = msg.mentions.users.first().id;
		var roles = msg.guild.member(id).roles.map(role => role.name).join(', ');

		let embed = new discord.RichEmbed();

		embed.setTitle("ℹ Info on " + msg.guild.member(id).displayName)
			.setColor(0xB48CF0)
			.addField("User ID", msg.guild.member(id).id)
			.addField("Joined On", msg.guild.member(id).joinedAt)
			.addField("Roles", roles)
			.setThumbnail(bot.users.get(id).avatarURL);
		msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {
		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
    		.setColor(0xFF0040)
        	.setDescription("Please use `!info [blank/roles/bot/user]`!")
        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
	}
}

exports.help = (bot, msg, args) => {
	return "To look up info, you can use `!info [blank/roles/bot/user]`.";
}