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
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        if (amt < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You can't use a negative amount!");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        sellCheck(msg, amt, args[0]);
        return;
    }

    if (args.length > 1 && args[1].toLowerCase() == "all") {
        sellAll(msg, args[0]);
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!sell [type] [amount/all]`! You can sell: `trash, boots, small, medium, large`.")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);

}

exports.help = (bots, msg, args) => {
    return "Use `!sell [type] [amount]` to sell your findings!";
}

//===============================FUNCTIONS====================================

function sellAll(msg, type) {
    if (type.toLowerCase() == "big" || type.toLowerCase() == "large") {
        if (userSettings[msg.author.id].inv.big < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have any large jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + userSettings[msg.author.id].inv.big + " large jewel(s)!  You gained " + (userSettings[msg.author.id].inv.big * 15) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += userSettings[msg.author.id].inv.big * 15;
        userSettings[msg.author.id].inv.big -= userSettings[msg.author.id].inv.big;
        updateUsers();
        return;
    }

    if (type.toLowerCase() == "med" || type.toLowerCase() == "medium") {
        let amt = userSettings[msg.author.id].inv.med;
        if (userSettings[msg.author.id].inv.med < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have any medium jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " medium jewel(s)!  You gained " + (amt * 10) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt * 10;
        userSettings[msg.author.id].inv.med -= amt;
        updateUsers();
        return;
    }

    if (type.toLowerCase() == "small") {
        let amt = userSettings[msg.author.id].inv.small;
        if (userSettings[msg.author.id].inv.small < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have any small jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " small jewel(s)!  You gained " + (amt * 5) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);
        userSettings[msg.author.id].dia += amt * 5;
        userSettings[msg.author.id].inv.small -= amt;
        updateUsers();
        return;
    }

    if (type.toLowerCase() == "boot" || type.toLowerCase() == "boots") {
        let amt = userSettings[msg.author.id].inv.boots;
        if (userSettings[msg.author.id].inv.boots < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have any boots to sell..")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " boot(s)!  You gained " + (amt * 2) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt * 2;
        userSettings[msg.author.id].inv.boots -= amt;
        updateUsers();
        return;
    }

    if (type.toLowerCase() == "trash" || type.toLowerCase() == "garbage") {
        let amt = userSettings[msg.author.id].inv.trash;
        if (userSettings[msg.author.id].inv.trash < 1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough trash to sell?")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " piece(s) of trash!  You gained " + (amt) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt;
        userSettings[msg.author.id].inv.trash -= amt;
        updateUsers();
        return;
    }
    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!sell [type] [amount]`! You can sell: `trash, boots, small, medium, large`.")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
}

function sellCheck(msg, amt, args) {
    if (args.toLowerCase() == "big" || args.toLowerCase() == "large") {
        if (userSettings[msg.author.id].inv.big < amt) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough large jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " large jewel(s)!  You gained " + (amt * 15) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt * 15;
        userSettings[msg.author.id].inv.big -= amt;
        updateUsers();
        return;
    }

    if (args.toLowerCase() == "med" || args.toLowerCase() == "medium") {
        if (userSettings[msg.author.id].inv.med < amt) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough medium jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " medium jewel(s)!  You gained " + (amt * 10) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt * 10;
        userSettings[msg.author.id].inv.med -= amt;
        updateUsers();
        return;
    }

    if (args.toLowerCase() == "small") {
        if (userSettings[msg.author.id].inv.small < amt) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough small jewels to sell!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " small jewel(s)!  You gained " + (amt * 5) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);
        userSettings[msg.author.id].dia += amt * 5;
        userSettings[msg.author.id].inv.small -= amt;
        updateUsers();
        return;
    }

    if (args.toLowerCase() == "boot" || args.toLowerCase() == "boots") {
        if (userSettings[msg.author.id].inv.boots < amt) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough boots to sell..")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " boot(s)!  You gained " + (amt * 2) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt * 2;
        userSettings[msg.author.id].inv.boots -= amt;
        updateUsers();
        return;
    }

    if (args.toLowerCase() == "trash" || args.toLowerCase() == "garbage") {
        if (userSettings[msg.author.id].inv.trash < amt) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You don't have enough trash to sell?")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Sold:")
            .setColor(0x753FCF)
            .setDescription("You sold " + amt + " piece(s) of trash!  You gained " + (amt) + " " + serverSettings[msg.channel.guild.id].diaType + ".");
        msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
        msg.delete(1500);

        userSettings[msg.author.id].dia += amt;
        userSettings[msg.author.id].inv.trash -= amt;
        updateUsers();
        return;
    }
    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!sell [type] [amount]`! You can sell: `trash, boots, small, medium, large`.")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
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
