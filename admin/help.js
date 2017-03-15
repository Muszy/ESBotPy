var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {
	//console.log(args);
	if (args.length < 1) {
		console.log("nonspecific help");
		let embed = new discord.RichEmbed();
	    embed.setTitle("Admin Help List:")
	        .setColor(0xB48CF0)
	        .setDescription("A list of admin commands can be found here!  Or you can use \"&help [command]\" for more specific help!")
	        .setURL("http://hani.morninghue.com/bot/mod.html")
	        .setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.author.sendEmbed(embed).catch(console.error);
	}

	else {
		//console.log("specific help");

		try {
			let command = args[0].toLowerCase();
			let commandFile = require(`./${command}.js`);
			var help = commandFile.help(bot, msg, command);
			let embed = new discord.RichEmbed();
			embed.setTitle("Daikichi's help:")
			    .setColor(0xB48CF0)
			    .setThumbnail("http://i.imgur.com/7TL0t99.png")
			    .setDescription(help);
			msg.author.sendEmbed(embed).catch(console.error);
		}
		catch (e) {
			console.log("command not found");
			let embed = new discord.RichEmbed();
	        embed.setTitle("Error:")
	        	.setColor(0xFF0040)
	        	.setDescription("Command not found! Yip! Maybe it's not an admin command? 🐾")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.author.sendEmbed(embed).catch(console.error);
		}
	}
}

exports.help = (bot, msg, args) => {
	return "I won't ask why you need help with help.";	
}