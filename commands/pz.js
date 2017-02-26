var request = require("superagent");
const discord = require("discord.js");

var snorfs = ["PZ U SHITTER", "pz u fick", "pz is like the shitty"]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(snorfs[Math.floor(Math.random() * (snorfs.length))]);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "pz u shit";
}
