const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");
var scout = require("./scout.js");
var eventPull = require("./lib/eventPull.js");
var normPull = require("./lib/normPull.js");
var ptsPull = require("./lib/ptsPull.js");

var scouting = 0;
var scoutError = new discord.RichEmbed();
scoutError.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("I'm currently processing someone else's pull! 🐾")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

var dir = './img/';
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

exports.run = (bot, msg, args) => {

    if (args.length < 2) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please enter in the format of `scout [event/dia/points] [1/10]`!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args[0].toLowerCase() == "event") {

        if (args[1] == "10") {

            if (scouting == 1) {
                msg.channel.sendEmbed(scoutError).catch(console.error);
                return;
            }

            let list = [];
            let names = [];
            scouting = 1;
            eventPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            eventPull.solo(msg);
            return;
        }
    }

    if (args[0].toLowerCase() == "normal" || args[0].toLowerCase() == "norm" || args[0].toLowerCase() == "dia") {

        if (args[1] == "10") {
            if (scouting == 1) {
                msg.channel.sendEmbed(scoutError).catch(console.error);
                return;
            }

            let list = [];
            let names = [];
            scouting = 1;
            normPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            normPull.solo(msg);
            return;
        }
    }

    if (args[0].toLowerCase() == "points" || args[0].toLowerCase() == "pts" || args[0].toLowerCase() == "point" || args[0].toLowerCase() == "pt") {

        if (args[1] == "10") {
            if (scouting == 1) {
                msg.channel.sendEmbed(scoutError).catch(console.error);
                return;
            }

            let list = [];
            let names = [];
            scouting = 1;
            ptsPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            ptsPull.solo(msg);
            return;
        }
    }
    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Scout not found! Woof! 🐾")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "To pull from the gacha, please use the format of `!scout [event/normal/points] [1/10]`.";
}

exports.generatePull = function(list, names, count, msg) {
    if (count == 0) {
        download(list[0], dir + 'base.png', function() {

            gm(dir + "base.png").resize(null, 156)
                .write(dir + 'base.png', function(err) {
                    if (!err) {
                        console.log("Written composite image.");
                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) console.log(err);
                });
        });
    } else if (count == 5) {
        download(list[count], dir + 'row.png', function() {

            gm(dir + "row.png").resize(null, 156)
                .write(dir + 'row.png', function(err) {
                    if (!err) {

                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) console.log(err);
                });
        });
    } else if (count > 5 && count < 10) {
        download(list[count], dir + 'temp.png', function() {

            gm(dir + "temp.png").resize(null, 156)
                .write(dir + 'temp.png', function(err) {
                    if (!err) {

                        gm(dir + "row.png").append(dir + "temp.png", true)
                            .write(dir + "row.png", function(err) {
                                if (!err) {

                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) console.log(err);
                            })
                    } else if (err) console.log(err);
                });
        });
    } else if (count == 10) {
        scouting = 0;

        gm(dir + "base.png").append(dir + "row.png")
            .write(dir + "scout.png", function(err) {
                if (!err) {
                    let id = msg.author.id;

                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(names.join(" ★ "));
                    //.setDescription("•" + names.join("\n•"));
                    msg.author.sendEmbed(embed).catch(console.error);

                    msg.author.sendFile(dir + "scout.png", "scout.png");

                    let note = new discord.RichEmbed();
                    note.setTitle("Finished!")
                        .setColor(0x96F08C)
                        .setDescription("Finished processing " + msg.author + "'s scout!")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(note).catch(console.error);
                } else if (err) console.log(err);
            });

    } else {
        download(list[count], dir + 'temp.png', function() {
            gm(dir + "temp.png").resize(null, 156)
                .write(dir + 'temp.png', function(err) {
                    if (!err) {

                        gm(dir + "base.png").append(dir + "temp.png", true)
                            .write(dir + "base.png", function(err) {
                                if (!err) {
                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) console.log(err);
                            })
                    } else if (err) console.log(err);
                });
        });
    }

}
