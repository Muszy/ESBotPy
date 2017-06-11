var request = require("request");
const discord = require("discord.js");
var fs = require("fs");

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

    var id = msg.author.id;

    if (msg.mentions.users.size === 1) {
        id = msg.mentions.users.first().id;
        console.log(id);
    }

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
            "rep": 0
        }
        updateUsers();
    }

    let title = "--";

    if (userSettings[id].title != "") {
    	title = userSettings[id].title;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("ℹ " + msg.guild.member(id).displayName + "'s Social Info:")
        .setThumbnail(bot.users.get(id).avatarURL)
        .setColor(0xA7DBD8)
        .setDescription("*"+ title + "*" + "\n**Twitter:** " + userSettings[id].twitter + "\n**Tumblr:** " + userSettings[id].tumblr + "\n**Reddit:** " + userSettings[id].reddit);
    msg.channel.sendEmbed(embed).catch(console.error);

    msg.delete(1500);

}

exports.help = (bots, msg, args) => {
    return "To generate a quick social media profile, use `!social`.  To look at someone else's profile, use `!social [user]`.";
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
