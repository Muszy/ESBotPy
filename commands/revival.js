const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("About Revivals:")
        .setColor(0xB48CF0)
        .setDescription("Revivals are past events that can be 'revived' in order to gain the rewards! The points required to reach rewards are usually inflated according to the original event borders, with only one copy of each card.")
        .addField("How long do they last?", "Revivals last 15 days, but only in the periods when events are over! They open 17 hours after the event ends, at 10PM PST/1AM EST/6PM GMT/3PM JST!")
        .addField("Do I lose my progress when the next event starts?", "As long as you haven't hit the 15 day end point, the revival will pick off where it left off after the next event is over! If you hit 15 days and didn't reach the rewards you wanted, you'll have to redo the revival.")
        .addField("Can I redo revivals for more rewards?", "If you've already gotten the cards from either doing the revival in the past, or participating in that event when it first occurred, you will not be able to get another copy.")
        .addField("I can't reach the reward in time, can I restart?", "You'll have to manually quit the revival, but indeed, you can restart the revival!")
        .setThumbnail("http://i.imgur.com/nRleyfl.png");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get a list of useful links PM'd to you, just use `links`.";
}