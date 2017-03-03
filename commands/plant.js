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

    if (!isNaN(args[0])) {

        let dia = parseInt(args[0].trim());

        if (!args[0]) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please use the format `!plant [amount]`!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            return;
        }

        if (dia < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You can't use a negative amount!");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            return;
        }

        if (dia > 1000) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please do not exceed 1000!");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            return;
        }

        if (userSettings[msg.author.id].dia < dia) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough to plant that!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
            return;
        }

        console.log("planting " + dia + " from " + msg.author.username);

        let embed = new discord.RichEmbed();
        embed.setColor(0x753FCF)
            .setDescription(msg.author.username + " has planted " + dia + " " + serverSettings[msg.channel.guild.id].diaType + "!  Use `!pick` to pick it up!");
        msg.channel.sendEmbed(embed).then(function(m) {
            if (serverSettings[msg.channel.guild.id].lastDiaMsg != "") {

                msg.channel.fetchMessage(serverSettings[msg.channel.guild.id].lastDiaMsg).then(function(me) {
                    me.delete(1500);
                    serverSettings[msg.channel.guild.id].lastDiaMsg = m.id;
                    serverSettings[msg.channel.guild.id].lastDia += dia;
                    msg.delete(1500);
                    m.delete(600000);
                    userSettings[msg.author.id].dia -= dia;
                    updateUsers();
                    updateServers();
                    return;
                }).catch(console.error);

            }
            serverSettings[msg.channel.guild.id].lastDiaMsg = m.id;
            serverSettings[msg.channel.guild.id].lastDia += dia;
            m.delete(600000);
            updateServers();
        }).catch(console.error);

        userSettings[msg.author.id].dia -= dia;
        updateUsers();
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!plant [amount]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "Use `!plant [amount]` to plant or add currency for someone else to pick up!";
}

//===============================FUNCTIONS====================================

function updateServers() {
    fs.writeFile(__dirname + '/../db/servers-temp.json', JSON.stringify(serverSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/servers-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented servers from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/servers-temp.json', __dirname + '/../db/servers.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}

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