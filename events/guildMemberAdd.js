var serversName = "../db/servers.json";
var serverSettings = require(serversName);
var usersName = "../db/users.json";
var userSettings = require(usersName);
var fs = require("fs");

const discord = require("discord.js");


exports.run = (bot, member, guild) => {
    console.log("new member: " + member.user.username + " on " + member.guild.name);

    if (!userSettings.hasOwnProperty(member.user.id)) {
        userSettings[member.user.id] = {
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

        updateUsers();
    }
    //console.log(member.guild.id);

    //console.log(serverSettings[member.guild.id].notify);

    if (serverSettings[member.guild.id].greet) {
        let embed = new discord.RichEmbed();

        embed.setTitle("Welcome " + member.user.username + "!")
            .setColor(0xFFB6C1)
            .setDescription(serverSettings[member.guild.id].welcome.replace(/\$USER\$/gi, '<@' + member.user.id + '>').replace(/\$SERVER\$/gi, member.guild.name.replace(/@/g, '@\u200b')))
            .setThumbnail("http://i.imgur.com/nRleyfl.png");

        let ch = serverSettings[member.guild.id].notifyChannel;
        bot.channels.get(ch).sendEmbed(embed).catch(console.error);
    }
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
