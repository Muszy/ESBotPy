const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Bandori Help Masterpost:")
        .setColor(0xB48CF0)
        .setDescription("Click here to go to the Bandori help masterpost!")
        .setThumbnail("http://i.imgur.com/408QceQ.png")
        .setURL("http://bangdreaming.tumblr.com/start");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a link to the Bandori help masterpost, just use `start`.";
}