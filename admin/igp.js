const discord = require("discord.js");
var fs = require('fs');
var config = require("../config.json");
var fileName = "../db/users.json";
var file = require(fileName);

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
        let id = msg.mentions.users.first().id;

        if (id == config.admin_id) {
            console.log("can't ignore admin");
            return;
        }

        if (!file.hasOwnProperty(id)) {
            file[id] = {
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
                "rep": 0,
                "style": 1,
                "fontOne": "",
                "fontTwo": "",
                "fontThree": ""
            }
        }

        if (file[id].botIgnore) {
            file[id].botIgnore = false;
            updateSettings();
            let embed = new discord.RichEmbed();
            embed.setColor(0x3399FF)
                .setDescription("Now unignoring user: " + msg.mentions.users.first());
            msg.channel.sendEmbed(embed).catch(console.error);
            return;
        }

        file[id].botIgnore = true;
        updateSettings();
        let embed = new discord.RichEmbed();
        embed.setColor(0x3399FF)
            .setDescription("Now ignoring user: " + msg.mentions.users.first());
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `igp [user]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "Use `igp [user]` to make me ignore a certain user.";
}

function updateSettings() {
    fs.writeFile(__dirname + '/../db/users-temp.json', JSON.stringify(file, null, 4), error => {
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
