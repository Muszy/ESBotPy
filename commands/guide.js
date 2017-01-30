const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Guide Masterpost:")
        .setColor(0xB48CF0)
        .setDescription("Click here to go to the Enstars subreddit guide masterpost!")
        .setThumbnail("http://i.imgur.com/nRleyfl.png")
        .setURL("https://www.reddit.com/r/ensemblestars/comments/51ea2e/guide_masterpost/");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a list of useful links PM'd to you, just use `links`.";
}