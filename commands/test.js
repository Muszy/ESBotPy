var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {

    let id;
    let embed = new discord.RichEmbed();
    embed.setDescription("tester");
    msg.channel.sendEmbed(embed).catch(console.error);

    msg.channel.fetchMessages({ limit: 4 })
        .then(messages => filterDia(bot, msg, messages))
        .catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "snorfs";
}

function filterDia(bot, msg, item) {
    let id = item.filter( m => m.author.id.startsWith(bot.user.id));
    console.log(id.first().author.lastMessageID);
}