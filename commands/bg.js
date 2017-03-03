const discord = require("discord.js");
var fs = require('fs');
var validUrl = require('valid-url');

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (args.length > 0) {
        let str = args[0];
        console.log(args[0]);

        if (!(str.indexOf(".png") > -1) && !(str.indexOf(".gif") > -1) && !(str.indexOf(".jpg") > -1) && !(str.indexOf(".jpeg") > -1) || !(validUrl.isWebUri(str)) ) {
            let embed = new discord.RichEmbed();

            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please set the image to a valid image URL (png/jpg/gif)!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        userSettings[msg.author.id].bg = str;
        updateUsers();

        let embed = new discord.RichEmbed();

        embed.setTitle("Profile background changed for " + msg.author.username + ".")
            .setColor(0xA7DBD8);
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        return;
    }

    userSettings[msg.author.id].bg = "";
    updateUsers();

    let embed = new discord.RichEmbed();

    embed.setTitle("Profile background changed for " + msg.author.username + ".")
        .setColor(0xA7DBD8);
    msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bots, msg, args) => {
    return "To change your profile background, use `!bg [background]`.";
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
