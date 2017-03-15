const discord = require("discord.js");

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setImage("http://i.imgur.com/FflohQi.gif");

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "salt";
}
