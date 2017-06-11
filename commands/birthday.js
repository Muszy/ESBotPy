const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Birthdays:")
        .setColor(0xB48CF0)
        .setDescription("Click here to look at a full site of Enstars birthdays!")
        .setThumbnail("http://i.imgur.com/nRleyfl.png")
        .setURL("http://enstars.info/birthdays");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a link to Enstars birthdays, just use `birthday`.";
}