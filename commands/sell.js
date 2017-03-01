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

    if (args.length > 1 && !isNaN(args[1])) {
        let amt = parseInt(args[1].trim());

        if (!args[1]) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please use the format `!sell [type] [amount]`!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
            return;
        }

        if (amt < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You can't use a negative amount!");
            msg.channel.sendEmbed(embed).catch(console.error);
            return;
        }

        if (amt > 1000) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please do not exceed 1000!");
            msg.channel.sendEmbed(embed).catch(console.error);
            return;
        }

        if (args[0].toLowerCase() == "big" || args[0].toLowerCase() == "large") {
            if (userSettings[msg.author.id].inv.big < amt) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough large jewels to sell!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Sold:")
                .setColor(0x753FCF)
                .setDescription("You sold " + amt + " large jewel(s)!  You gained " + (amt * 15) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia += amt * 15;
            userSettings[msg.author.id].inv.big -= amt;
            updateUsers();
            return;
        }

        if (args[0].toLowerCase() == "med" || args[0].toLowerCase() == "medium") {
            if (userSettings[msg.author.id].inv.med < amt) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough medium jewels to sell!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Sold:")
                .setColor(0x753FCF)
                .setDescription("You sold " + amt + " medium jewel(s)!  You gained " + (amt * 10) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia += amt * 10;
            userSettings[msg.author.id].inv.med -= amt;
            updateUsers();
            return;
        }

        if (args[0].toLowerCase() == "small") {
            if (userSettings[msg.author.id].inv.small < amt) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough small jewels to sell!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Sold:")
                .setColor(0x753FCF)
                .setDescription("You sold " + amt + " small jewel(s)!  You gained " + (amt * 5) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia += amt * 5;
            userSettings[msg.author.id].inv.small -= amt;
            updateUsers();
            return;
        }

        if (args[0].toLowerCase() == "boot" || args[0].toLowerCase() == "boots") {
            if (userSettings[msg.author.id].inv.boots < amt) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough boots to sell..")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Sold:")
                .setColor(0x753FCF)
                .setDescription("You sold " + amt + " boot(s)!  You gained " + (amt * 2) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia += amt * 2;
            userSettings[msg.author.id].inv.boots -= amt;
            updateUsers();
            return;
        }

        if (args[0].toLowerCase() == "trash" || args[0].toLowerCase() == "garbage") {
            if (userSettings[msg.author.id].inv.trash < amt) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough trash to sell?")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            let embed = new discord.RichEmbed();
            embed.setTitle("Sold:")
                .setColor(0x753FCF)
                .setDescription("You sold " + amt + " piece(s) of trash!  You gained " + (amt) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia += amt;
            userSettings[msg.author.id].inv.trash -= amt;
            updateUsers();
            return;
        }
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!sell [type] [amount]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "Use `!sell [type] [amount]` to sell your findings!";
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
