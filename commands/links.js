const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Useful Links:")
        .setColor(0xB48CF0)
        .setDescription("Click here to go to the Enstars subreddit, where you can access all links pertaining to Enstars in the sidebar!")
        .setThumbnail("http://i.imgur.com/nRleyfl.png")
        .setURL("https://www.reddit.com/r/ensemblestars/");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a list of useful links PM'd to you, just use `links`.";
}