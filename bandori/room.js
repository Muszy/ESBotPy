const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Daily Room Schedule")
        .setColor(0xB48CF0)
        .setDescription("Sun/Mon: Training Tickets\nTues: Powerful Drops\nWed: Cool Drops\nThurs: Pure Drops\nFri: Happy Drops\nSat: Coins")
        .setThumbnail("http://i.imgur.com/408QceQ.png")
        .setURL("http://bangdreaming.tumblr.com/band");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get Bandori item attribute help, just use `item`.";
}