const discord = require("discord.js");
var fs = require('fs');

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (args.length > 0) {
        let str = args.join(" ");

        if (str.length > 50) {
            str = str.slice(0, 49);
        }

        userSettings[msg.author.id].title = str;
        updateUsers();

        let embed = new discord.RichEmbed();

        embed.setTitle("Profile title changed for " + msg.author.username + ".")
            .setColor(0xA7DBD8);
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    userSettings[msg.author.id].title = "";
    updateUsers();

    let embed = new discord.RichEmbed();

    embed.setTitle("Profile title changed for " + msg.author.username + ".")
        .setColor(0xA7DBD8);
    msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bots, msg, args) => {
    return "To change your profile title, use `!title [title]`.  Titles can only be up to 50 characters long.";
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
