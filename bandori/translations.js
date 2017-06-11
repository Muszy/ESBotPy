const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Bandori Translations:")
        .setColor(0xB48CF0)
        .setDescription("Click here to go to the Bandori Translations Masterpost!")
        .setThumbnail("http://i.imgur.com/408QceQ.png")
        .setURL("http://bangdreaming.tumblr.com/translations");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a link to the translation masterpost, just use `translations`.";
}