var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {
	//console.log(args);
	if (args.length < 1) {
		console.log("nonspecific help");
		let embed = new discord.RichEmbed();
	    embed.setTitle("Help List:")
	        .setColor(0xB48CF0)
	        .setDescription("A list of help can be found here!  Or you can use \"!help [command]\" for more specific help!")
	        .setURL("http://google.com")
	        .setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
	}

	else {
		//console.log("specific help");

		try {
			let commandFile = require(`./${args[0]}.js`);
			var help = commandFile.help(bot, msg, args);
			let embed = new discord.RichEmbed();
			embed.setTitle("Daikichi's help:")
			    .setColor(0xB48CF0)
			    .setThumbnail("http://i.imgur.com/7TL0t99.png")
			    .setDescription(help);
			msg.channel.sendEmbed(embed).catch(console.error);
		}
		catch (e) {
			console.log("command not found");
			let embed = new discord.RichEmbed();
	        embed.setTitle("Error:")
	        	.setColor(0xFF0040)
	        	.setDescription("Command not found! Woof! 🐾")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.channel.sendEmbed(embed).catch(console.error);
		}
	}
}

exports.help = (bot, msg, args) => {
	return "What are you, a smart ass?";	
}