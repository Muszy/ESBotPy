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

    if (msg.mentions.users.size === 1) {

        if (!isNaN(args[1])) {

            let dia = parseInt(args[1]);

            let id = msg.mentions.users.first().id;

            console.log("awarding " + msg.guild.member(id).displayName + " " + dia + " from " + msg.author.id);

            if (!userSettings.hasOwnProperty(id)) {
                userSettings[id] = {
                    "botIgnore": false,
                    "dia": 50,
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
                    "bg": "",
                    "rep": 0
                }
            }

            let embed = new discord.RichEmbed();
            embed.setColor(0x753FCF)
                .setDescription(msg.author.username + " has awarded " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " to " + msg.guild.member(id).displayName + "!");
            msg.channel.sendEmbed(embed);

            userSettings[id].dia += dia;

            /*console.log("planting " + dia + " from " + msg.author.username);
            msg.channel.sendMessage("`" + msg.author.username + " has planted " + dia + " " + serverSettings[msg.channel.guild.id].diaType + "!  Use !pick to pick it up!`");
            userSettings[msg.author.id].dia -= dia;
            serverSettings[msg.channel.guild.id].lastDia += dia;*/
            updateUsers();
            return;
        }
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `award <user> [amount]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "Use `award <user> [amount]` to award someone currency!";
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
