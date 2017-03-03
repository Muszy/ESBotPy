var request = require("superagent");
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

    if (msg.mentions.users.size < 1 || msg.mentions.users.size > 1) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please mention one person to increase reputation for!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    if (msg.mentions.users.size === 1) {
        let id = msg.mentions.users.first().id;

        if (msg.author.id == id) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You can't increase your own reputation!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        if (bot.user.id == id) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("That's sweet, but please don't increase my rep!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        if (userSettings[msg.author.id].dailyRep) {

            console.log("increasing rep for " + msg.guild.member(id).displayName + " by " + msg.author.username);

            let embed = new discord.RichEmbed();
            embed.setColor(0x753FCF)
                .setDescription("**" + msg.author.username + "** has increased **" + msg.guild.member(id).displayName + "'s** reputation!");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[id].rep += 1;
            userSettings[msg.author.id].dailyRep = false;
            updateUsers();
            return;
        }
    }

    msg.channel.sendMessage("`You've already increased someone's reputation this week!`").then(m => m.delete(3000)).catch(console.error);
    msg.delete(1000);

}

exports.reset = (bot) => {

    for (var id in userSettings) {

        userSettings[id].dailyRep = true;

        fs.writeFile(usersName, JSON.stringify(userSettings, null, 4), function(err) {
            if (err) return console.log(err);

            console.log('resetting rep in ' + usersName);
            console.log('rep reset ');
        });
    }

    updateUsers();
}

exports.help = (bots, msg, args) => {
    return "Use `!rep [user]` to increase a user's reputation!  Resets weekly.";
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
