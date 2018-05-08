var request = require("superagent");
const discord = require("discord.js");

var fite = ["(ง ͠° ͟ل͜ ͡°)ง", "(ง ͠° ͟ل ͡°)ง", "ʕง•ᴥ•ʔง", "(ง’̀-‘́)ง", "(งಠ_ಠ)ง", "(งಠل͜ಠ)ง", "(ง ° ͜ ʖ °)ง"]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(fite[Math.floor(Math.random() * (fite.length))]);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "fite me";
}
