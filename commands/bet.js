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

    if (args.length > 0) {
        if (!isNaN(args[0])) {
            let dia = parseInt(args[0].trim());

            if (!args[0]) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("Please use the format `!bet [amount]`!")
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
                    .setDescription("You don't have enough to gamble!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            let rand = Math.floor(Math.random() * 100);
            if (rand > 65) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Gambling:")
                    .setColor(0x753FCF)
                    .setDescription("Daikichi rolled: " + rand + "!  " + msg.author.username + " gained " + (dia * 2) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
                msg.channel.sendEmbed(embed).catch(console.error);

                userSettings[msg.author.id].dia += dia;
                updateUsers();
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Gambling:")
                .setColor(0x753FCF)
                .setDescription("Daikichi rolled: " + rand + "!  Sorry, " + msg.author.username + " lost " + dia + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia -= dia;
            updateUsers();
            return;
        }
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!bet [amount]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);

}

exports.help = (bots, msg, args) => {
    return "Use `!bet [amount]` to gamble away your savings!";
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
