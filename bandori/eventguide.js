const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Bandori Event Guide:")
        .setColor(0xB48CF0)
        .setDescription("Click here to go to the Bandori event guide!")
        .setThumbnail("http://i.imgur.com/408QceQ.png")
        .setURL("http://bangdreaming.tumblr.com/eventguide");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a link to the event guide, just use `eventguide`.";
}