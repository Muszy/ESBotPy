const discord = require("discord.js");
var fs = require('fs');

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (args.length > 0) {
        if (!isNaN(args[0]) && parseInt(args[0]) > 0 && parseInt(args[0]) < 5) {
            userSettings[msg.author.id].style = parseInt(args[0]);
            updateUsers();

            let embed = new discord.RichEmbed();

            embed.setTitle("Style changed for " + msg.author.username + " to: " + args[0] + ".")
                .setColor(0xA7DBD8);
            msg.channel.sendEmbed(embed).catch(console.error);

            return;
        }
    }

    userSettings[msg.author.id].style = 1;
    updateUsers();

    let embed = new discord.RichEmbed();

    embed.setTitle("Style changed to default for " + msg.author.username + ".")
        .setColor(0xA7DBD8);
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bots, msg, args) => {
    return "To change your profile style, use `!style [number]`.  Current Styles: 1, 2, 3, 4";
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
