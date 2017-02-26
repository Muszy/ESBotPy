var request = require("superagent");
const discord = require("discord.js");

var wiffle = ["http://i.imgur.com/AN5ooRV.png", "http://i.imgur.com/oSdWkki.png", "http://i.imgur.com/rYxeOit.jpg"]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
    	.setImage(wiffle[Math.floor(Math.random() * (wiffle.length))]);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "she screm";
}
