var request = require("superagent");
const discord = require("discord.js");
const config = require("../config.json");
var dreset = require("./daily.js");

var fs = require("fs");

var serversName = "../db/servers.json";
var serverSettings = require(serversName);

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (args.length > 0 && args[0].toLowerCase() == "reset" && msg.author.id == config.admin_id) {
        //console.log(file[msg.guild.id]);

        dreset.reset(bot);
        return;
    }

    /*if (userSettings[msg.author.id].daily) {
        let dia = 10;
        console.log("daily " + dia + " to " + msg.author.username);

        let embed = new discord.RichEmbed();
        embed.setColor(0x753FCF)
            .setDescription("Daily: " + dia + " has been added to " + msg.author.username + "'s inventory.");
        msg.channel.sendEmbed(embed).then(function(m) {
            msg.delete(1000);
            m.delete(2000);
        });

        userSettings[msg.author.id].dia += 10;
        userSettings[msg.author.id].daily = false;
        updateUsers();
        return;
    }*/

    msg.channel.sendMessage("`Dailies currently disabled.`").then(m => m.delete(3000)).catch(console.error);
    msg.delete(1000);

}

exports.reset = (bot) => {

    for(var id in userSettings){
       
        userSettings[id].daily = true;

        fs.writeFile(usersName, JSON.stringify(userSettings,null,4), function (err) {
            if (err) return console.log(err);
            
            console.log('resetting daily cash in ' + usersName);
            console.log('dailies reset ');
        });
    }

    updateUsers();
}

exports.help = (bots, msg, args) => {
    return "Use `!daily` to get 10 currency every day!  Resets at 12am EST.";
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