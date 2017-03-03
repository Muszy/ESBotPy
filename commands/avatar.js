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

	if ( msg.mentions.users.size === 1 ) {
		//console.log(msg.mentions.users);
		var id = msg.mentions.users.first().id;

		let embed = new discord.RichEmbed();

		embed.setTitle("ℹ " + msg.guild.member(id).displayName + "'s Avatar")
			.setColor(0xB48CF0)
			.setImage(bot.users.get(id).avatarURL);
		msg.channel.sendEmbed(embed).catch(console.error);
		msg.delete(1500);
	}

	else {
		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
    		.setColor(0xFF0040)
        	.setDescription("Please use `!avatar [user]`!")
        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
	}
}

exports.help = (bot, msg, args) => {
	return "To look up info, you can use `!info [blank/roles/bot/user]`.";
}