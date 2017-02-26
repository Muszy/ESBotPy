var request = require("superagent");
const discord = require("discord.js");

var wiffle = ["http://i.imgur.com/cEnKD1v.png", "http://i.imgur.com/pJx0RxP.png"]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
    	.setImage(wiffle[Math.floor(Math.random() * (wiffle.length))]);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "he's a sinner";
}
