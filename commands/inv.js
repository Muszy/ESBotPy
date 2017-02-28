var request = require("superagent");
const discord = require("discord.js");

var serversName = "../db/servers.json";
var serverSettings = require(serversName);

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setTitle(msg.author.username + "'s Inventory:")
        .setColor(0x753FCF)
        .addField("Cash", userSettings[msg.author.id].dia)
        .addField("Trash", userSettings[msg.author.id].inv.trash + " Trash | " + userSettings[msg.author.id].inv.boots + " Boots")
        .addField("Jewels", userSettings[msg.author.id].inv.small + " Small | " + userSettings[msg.author.id].inv.med + " Medium | " + userSettings[msg.author.id].inv.big + " Large")
        .setThumbnail(bot.users.get(msg.author.id).avatarURL);
    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "Use `!inv` to check your inventory!";
}
