const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");

var scout = require("./scout.js");
var legSpark = require("./lib/legSpark.js");
var grandSpark = require("./lib/grandSpark.js");
var summerSpark = require("./lib/summerSpark.js");
var xmasSpark = require("./lib/xmasSpark.js");
var halloSpark = require("./lib/halloSpark.js");

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");

exports.run = (bot, msg, args) => {

    if (args.length > 0) {

            if (args[0].toLowerCase() == "legfes" || args[0].toLowerCase() == "leg" || args[0].toLowerCase() == "legfest") {

                    let names = [];
                    legSpark.spark(names, 0, msg);
                    return;
            }

            if (args[0].toLowerCase() == "grandfes" || args[0].toLowerCase() == "grand" || args[0].toLowerCase() == "grandfest" || args[0].toLowerCase() == "grandefes" || args[0].toLowerCase() == "grandefest" || args[0].toLowerCase() == "grande" ) {

                    let names = [];
                    grandSpark.spark(names, 0, msg);
                    return;
            }

            if (args[0].toLowerCase() == "ss" || args[0].toLowerCase() == "summer" || args[0].toLowerCase() == "swimsuit") {

                    let names = [];
                    summerSpark.spark(names, 0, msg);
                    return;
            }

            if (args[0].toLowerCase() == "xmas" || args[0].toLowerCase() == "christmas") {

                    let names = [];
                    xmasSpark.spark(names, 0, msg);
                    return;
            }

            if (args[0].toLowerCase() == "halloween" || args[0].toLowerCase() == "hallo") {

                    let names = [];
                    halloSpark.spark(names, 0, msg);
                    return;
            } 

    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Spark not found!")
        .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
    
}

exports.help = (bot, msg, args) => {
    return "To simulate a spark, please use the format of `!spark [legfes/summer/halloween/xmas]`.";
}

exports.generatePull = function(names, count, msg) {

    let embed = new discord.RichEmbed();
    embed.setTitle(msg.author.username + "'s Spark Results")
        .setColor(0x96F08C)
        .setDescription(names.join("\n"));
    msg.channel.sendEmbed(embed).catch(console.error);

}
