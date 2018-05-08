const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");

var scout = require("./scout.js");
var legPull = require("./lib/legPull.js");
var summerPull = require("./lib/summerPull.js");
var xmasPull = require("./lib/xmasPull.js");
var halloPull = require("./lib/halloPull.js");
var grandPull = require("./lib/grandPull.js");

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");

exports.run = (bot, msg, args) => {

    if (args.length > 0) {

        if (args.length > 1) {

            if (args[0].toLowerCase() == "legfes" || args[0].toLowerCase() == "leg" || args[0].toLowerCase() == "legfest") {

                if (args[1] == "10") {

                    let names = [];
                    legPull.tenPull(names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    legPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "grandfes" || args[0].toLowerCase() == "grand" || args[0].toLowerCase() == "grandfest" || args[0].toLowerCase() == "grandefes" || args[0].toLowerCase() == "grandefest" || args[0].toLowerCase() == "grande" ) {

                if (args[1] == "10") {

                    let names = [];
                    grandPull.tenPull(names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    grandPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "ss" || args[0].toLowerCase() == "summer" || args[0].toLowerCase() == "swimsuit") {

                if (args[1] == "10") {

                    let names = [];
                    summerPull.tenPull(names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    summerPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "xmas" || args[0].toLowerCase() == "christmas") {

                if (args[1] == "10") {

                    let names = [];
                    xmasPull.tenPull(names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    xmasPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "halloween" || args[0].toLowerCase() == "hallo") {

                if (args[1] == "10") {

                    let names = [];
                    halloPull.tenPull(names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    halloPull.solo(msg);
                    return;
                }
            } 
        }
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Scout not found!")
        .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bot, msg, args) => {
    return "To pull from the gacha, please use the format of `!scout [legfes/summer/halloween/xmas] [1/10].`";
}

exports.generatePull = function(names, count, msg) {

    let embed = new discord.RichEmbed();
    embed.setTitle(msg.author.username + "'s Scouting Results")
        .setColor(0x96F08C)
        .setDescription( names[0] + "\n" + names[1] + "\n" + names[2] + "\n" + names[3] + "\n" + names[4] + "\n" + names[5] + "\n" + names[6] + "\n" + names[7] + "\n" + names[8] + "\n" + names[9]);
    //.setDescription("•" + names.join("\n•"));
    msg.channel.sendEmbed(embed).catch(console.error);

}
