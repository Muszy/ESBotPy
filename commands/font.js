const discord = require("discord.js");
var fs = require('fs');

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (args.length > 1) {
        let type = parseInt(args[0]);

        if (!isNaN(args[0]) && type > 0 && type < 4) {

            if ( type === 1 ) userSettings[msg.author.id].fontOne = args[1];
            if ( type === 2 ) userSettings[msg.author.id].fontTwo = args[1];
            if ( type === 3 ) userSettings[msg.author.id].fontThree = args[1];
            
            updateUsers();

            let embed = new discord.RichEmbed();

            embed.setTitle("Font #" + type + " changed for " + msg.author.username + " to: " + args[1] + ".")
                .setColor(0xA7DBD8);
            msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
            msg.delete(1500);
            return;
        }
    }

    userSettings[msg.author.id].fontOne = "";
    userSettings[msg.author.id].fontTwo = "";
    userSettings[msg.author.id].fontThree = "";
    updateUsers();

    let embed = new discord.RichEmbed();

    embed.setTitle("Font colors changed to default for " + msg.author.username + ".")
        .setColor(0xA7DBD8);
    msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bots, msg, args) => {
    return "To change your profile font colors, use `!font [1 to 3] [hex code]`.\nFont 1 changes rep/cash and social media.\nFont 2 changes username and bio.\nFont 3 changes title.";
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
