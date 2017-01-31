const discord = require("discord.js");

exports.run = (bot, msg, args) => {
    var embed = new discord.RichEmbed();
    embed.setTitle("You take Daikichi for a walk...")
        .setColor(0xFF69B4)
        .setDescription("Daikichi is pleased!")
        .setImage("http://i.imgur.com/dlNIUPd.gif");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "Pong.";
}
