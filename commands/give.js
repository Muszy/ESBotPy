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

    if (msg.mentions.users.size === 1) {

        if (args[1].toLowerCase() == "all") {

            if (userSettings[msg.author.id].dia < 1) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You have nothing to give!");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            if (userSettings[msg.author.id].dia > 1000) {
                let dia = 1000;

                let id = msg.mentions.users.first().id;

                checker(id);

                let embed = new discord.RichEmbed();
                embed.setColor(0x753FCF)
                    .setDescription(msg.author.username + " has given " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " to " + msg.guild.member(id).displayName + "!");
                msg.channel.sendEmbed(embed);
                userSettings[msg.author.id].dia -= dia;
                userSettings[id].dia += dia;
                updateUsers();
                return;
            }

            let dia = userSettings[msg.author.id].dia;

            let id = msg.mentions.users.first().id;

            checker(id);

            let embed = new discord.RichEmbed();
            embed.setColor(0x753FCF)
                .setDescription(msg.author.username + " has given " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " to " + msg.guild.member(id).displayName + "!");
            msg.channel.sendEmbed(embed);
            userSettings[msg.author.id].dia -= dia;
            userSettings[id].dia += dia;
            updateUsers();
            return;

        }

        if (!isNaN(args[1])) {

            let dia = parseInt(args[1].trim());

            if (!args[1]) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("Please use the format `!give [user] [amount]`!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            if (dia < 1) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You can't use a negative amount!");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            if (dia > 1000) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("Please do not exceed 1000!");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            if (userSettings[msg.author.id].dia < dia) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough to give that!");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            let id = msg.mentions.users.first().id;

            console.log("giving " + msg.guild.member(id).displayName + " " + dia + " from " + msg.author.id);

            checker(id);

            let embed = new discord.RichEmbed();
            embed.setColor(0x753FCF)
                .setDescription(msg.author.username + " has given " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " to " + msg.guild.member(id).displayName + "!");
            msg.channel.sendEmbed(embed);
            userSettings[msg.author.id].dia -= dia;
            userSettings[id].dia += dia;
            updateUsers();
            return;
        }
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!give <user> [amount]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);

}

exports.help = (bots, msg, args) => {
    return "Use `!give <user> [amount]` to give someone currency!";
}

//===============================FUNCTIONS====================================

function checker(id) {
    if (!userSettings.hasOwnProperty(id)) {
        userSettings[id] = {
            "botIgnore": false,
            "dia": 25,
            "daily": true,
            "dailyRep": true,
            "inv": {
                "trash": 0,
                "boots": 0,
                "small": 0,
                "med": 0,
                "big": 0
            },
            "bio": "",
            "title": "",
            "twitter": "",
            "tumblr": "",
            "reddit": "",
            "bg": "",
            "style": 1,
            "rep": 0,
            "fontOne": "",
            "fontTwo": "",
            "fontThree": ""
        }
    }
    updateUsers();
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
