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

    if (serverSettings[msg.channel.guild.id].lastDia > 0) {
        let dia = serverSettings[msg.channel.guild.id].lastDia;
        console.log("adding " + dia + " to " + msg.author.username);

        let embed = new discord.RichEmbed();
        embed.setColor(0x753FCF)
            .setDescription(dia + " " + serverSettings[msg.channel.guild.id].diaType + " has been added to " + msg.author.username + "'s inventory.");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000));

        userSettings[msg.author.id].dia += serverSettings[msg.channel.guild.id].lastDia;
        serverSettings[msg.channel.guild.id].lastDia = 0;
        serverSettings[msg.channel.guild.id].diaMade = false;
        msg.channel.fetchMessage(serverSettings[msg.channel.guild.id].lastDiaMsg).then(function(m) {
            m.delete(1000).then(function() {
                serverSettings[msg.channel.guild.id].lastDiaMsg = "";

                updateServers();
            });
        }).catch(console.error);
        msg.delete(1000);
        updateUsers();
        return;
    }

    console.log("0 dia");
    msg.delete(1000);

}

exports.help = (bots, msg, args) => {
    return "Use `!pick` when currency spawns in order to pick it up!";
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
