var serversName = "../db/servers.json";
var serverSettings = require(serversName);
var usersName = "../db/users.json";
var userSettings = require(usersName);
var fs = require("fs");

const discord = require("discord.js");


exports.run = (bot, member, guild) => {

    //console.log("new member");
    //console.log(member.guild.id);

    //console.log(serverSettings[member.guild.id].notify);

    if(serverSettings[member.guild.id].banAlerts) {
        let embed = new discord.RichEmbed();

        embed.setTitle("Goodbye " + member.user.username + "...")
            .setColor(0xFFB6C1)
            .setDescription("Goodbye, <@" + member.user.id + ">, we hope that you join us again someday!")
            .setThumbnail("http://i.imgur.com/nRleyfl.png");

        let ch = serverSettings[member.guild.id].welcomeChannel;
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