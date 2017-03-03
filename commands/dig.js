var request = require("superagent");
const discord = require("discord.js");
var fs = require("fs");

var serversName = "../db/servers.json";
var serverSettings = require(serversName);

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (msg.channel.type == "dm" || msg.channel.type == "group") {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use this command in a server, not a DM!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    let dia = 5;

    if (userSettings[msg.author.id].dia < dia) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You don't have enough to gamble!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    userSettings[msg.author.id].dia -= dia;

    let rand = Math.floor(Math.random() * 100);
    if (rand > 90) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a large jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.big += 1;
        updateUsers();
        return;
    }

    if (rand < 91 && rand > 75) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a medium jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.med += 1;
        updateUsers();
        return;
    }

    if (rand < 76 && rand > 55) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a small jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.small += 1;
        updateUsers();
        return;
    }

    if (rand < 56 && rand > 30) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a boot..");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.boots += 1;
        updateUsers();
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Digging:")
        .setColor(0x753FCF)
        .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a piece of trash..");
    msg.channel.sendEmbed(embed).catch(console.error);

    userSettings[msg.author.id].inv.trash += 1;
    updateUsers();
    return;

}

exports.help = (bots, msg, args) => {
    return "Use `!dig` to pay money to dig!";
}

//===============================FUNCTIONS====================================

function updateUsers() {
    fs.writeFile(__dirname + '/../db/users-temp.json', JSON.stringify(userSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/users-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented users from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/users-temp.json', __dirname + '/../db/users.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}
