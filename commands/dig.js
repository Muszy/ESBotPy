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

    let dia = 5;

    if (userSettings[msg.author.id].dia < dia) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You don't have enough to dig!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    if (args.length > 0 && args[0].toLowerCase() == "all") {
        let list = {
            "big": 0,
            "med": 0,
            "small": 0,
            "boots": 0,
            "trash": 0
        };

        let times = Math.floor(userSettings[msg.author.id].dia / 5);

        digMulti(bot, msg, times, list);
        userSettings[msg.author.id].dia -= times * 5;
        updateUsers();
        return;
    }

    if (args.length > 0 && !isNaN(args[0]) && args[0] != "") {
        let list = {
            "big": 0,
            "med": 0,
            "small": 0,
            "boots": 0,
            "trash": 0
        };

        let times = parseInt(args[0]);

        if (times > 0) {
            if (userSettings[msg.author.id].dia < (times * 5)) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough to dig!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
            digMulti(bot, msg, times, list);
            userSettings[msg.author.id].dia -= times * 5;
            updateUsers();
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You can't dig negative times!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    userSettings[msg.author.id].dia -= dia;

    let rand = Math.floor(Math.random() * 100);
    if (rand > 90) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a large jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.big += 1;
        updateUsers();
        return;
    }

    if (rand < 91 && rand > 75) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a medium jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.med += 1;
        updateUsers();
        return;
    }

    if (rand < 76 && rand > 55) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a small jewel!");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.small += 1;
        updateUsers();
        return;
    }

    if (rand < 56 && rand > 30) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Digging:")
            .setColor(0x753FCF)
            .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a boot..");
        msg.channel.sendEmbed(embed).catch(console.error);

        userSettings[msg.author.id].inv.boots += 1;
        updateUsers();
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Digging:")
        .setColor(0x753FCF)
        .setDescription(msg.author.username + " paid " + dia + " " + serverSettings[msg.channel.guild.id].diaType + " and found a piece of trash..");
    msg.channel.sendEmbed(embed).catch(console.error);

    userSettings[msg.author.id].inv.trash += 1;
    updateUsers();
    return;

}

exports.help = (bots, msg, args) => {
    return "Use `!dig (optional)[times/all]` to pay money to dig!";
}

//===============================FUNCTIONS====================================

function pushList(bot, msg, list) {
    console.log(list);

    userSettings[msg.author.id].inv.trash += parseInt(list.trash);
    userSettings[msg.author.id].inv.boots += parseInt(list.boots);
    userSettings[msg.author.id].inv.big += parseInt(list.big);
    userSettings[msg.author.id].inv.small += parseInt(list.small);
    userSettings[msg.author.id].inv.med += parseInt(list.med);

    let sum = parseInt(list.trash) + parseInt(list.boots) + parseInt(list.big) + parseInt(list.small) + parseInt(list.med);

    let embed = new discord.RichEmbed();
    embed.setTitle("Digging:")
        .setColor(0x753FCF)
        .setDescription(msg.author.username + " paid " + (sum * 5) + " " + serverSettings[msg.channel.guild.id].diaType + " and found: **" + list.big + "** large, **" + list.med + "** medium, and **" + list.small + "** small jewels, and **" + list.boots + "** boot(s) and **" + list.trash + "** pieces of trash.");
    msg.channel.sendEmbed(embed).catch(console.error);

    updateUsers();
    return;
}

function digMulti(bot, msg, times, list) {

    if (times == 0) {
        pushList(bot, msg, list);
        return;
    }

    let rand = Math.floor(Math.random() * 100);

    if (rand > 90) {
        list.big += 1;
        digMulti(bot, msg, (times - 1), list);
        return;
    }

    if (rand < 91 && rand > 75) {
        list.med += 1;
        digMulti(bot, msg, (times - 1), list);
        return;
    }

    if (rand < 76 && rand > 55) {
        list.small += 1;
        digMulti(bot, msg, (times - 1), list);
        return;
    }

    if (rand < 56 && rand > 30) {
        list.boots += 1;
        digMulti(bot, msg, (times - 1), list);
        return;
    }

    list.trash += 1;
    digMulti(bot, msg, (times - 1), list);
    return;
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
