const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");

var scout = require("./scout.js");
var eventPull = require("./lib/eventPull.js");
var normPull = require("./lib/normPull.js");
var ptsPull = require("./lib/ptsPull.js");
var boxPull = require("./lib/boxPull.js");
var specialPull = require("./lib/specialPull.js");

var usersName = "../db/users.json";
var userSettings = require(usersName);

var scoutError = new discord.RichEmbed();
scoutError.setTitle("You're going too fast!")
    .setColor(0x96F08C)
    .setDescription("The Adoarmy arrives..");

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

var dir = './img/';
var download = function(msg, uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        if (err) {
            //console.log("bg img not found");
            msg.channel.sendEmbed(errorMsg).catch(console.error);
            return;
        }
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        if (!err) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        }
    });
};

exports.run = (bot, msg, args) => {

    if (args.length > 0) {

        if (args.length > 1) {

            if (args[0].toLowerCase() == "special") {

                if (userSettings[msg.author.id].dia < 135) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("You don't have enough to scout!  You need 135 cash! 🐾")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }

                userSettings[msg.author.id].dia -= 135;
                updateUsers();

                let list = [];
                let names = [];
                let boy = args[1].toLowerCase().trim();
                boxPull.tenPull(boy, list, names, 0, msg);
                return;
            }

            if (args[0].toLowerCase() == "event") {

                if (args[1] == "10") {

                    let list = [];
                    let names = [];
                    eventPull.tenPull(list, names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    eventPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "normal" || args[0].toLowerCase() == "norm" || args[0].toLowerCase() == "dia") {

                if (args[1] == "10") {

                    let list = [];
                    let names = [];
                    normPull.tenPull(list, names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    normPull.solo(msg);
                    return;
                }
            }

            if (args[0].toLowerCase() == "points" || args[0].toLowerCase() == "pts" || args[0].toLowerCase() == "point" || args[0].toLowerCase() == "pt") {

                if (args[1] == "10") {

                    let list = [];
                    let names = [];
                    ptsPull.tenPull(list, names, 0, msg);
                    return;
                } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
                    ptsPull.solo(msg);
                    return;
                }
            }
        }

        if (args[0].toLowerCase() == "special" && args.length === 1) {

            if (userSettings[msg.author.id].dia < 135) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("You don't have enough to scout!  You need 135 cash! 🐾")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }

            userSettings[msg.author.id].dia -= 135;
            updateUsers();

            let list = [];
            let names = [];
            specialPull.tenPull(list, names, 0, msg);
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
    return "To pull from the gacha, please use the format of `!scout [event/normal/points] [1/10]` or `!scout special (optional)[boy]`.";
}

exports.generatePull = function(list, names, count, msg) {
    if (count == 0) {
        download(msg, list[0], dir + 'base' + msg.author.id + '.png', function() {

            gm(dir + 'base' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'base' + msg.author.id + '.png', function(err) {
                    if (!err) {
                        console.log("Written composite image.");
                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count == 5) {
        download(msg, list[count], dir + 'row' + msg.author.id + '.png', function() {

            gm(dir + 'row' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'row' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count > 5 && count < 10) {
        download(msg, list[count], dir + 'temp' + msg.author.id + '.png', function() {

            gm(dir + 'temp' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'temp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'row' + msg.author.id + '.png').append(dir + 'temp' + msg.author.id + '.png', true)
                            .write(dir + 'row' + msg.author.id + '.png', function(err) {
                                if (!err) {

                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) {
                                    console.log(err);
                                    msg.author.sendEmbed(scoutError).catch(console.error);
                                    msg.author.sendFile(dir + '10pull.png', "error.png");
                                    return;
                                }
                            })
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count == 10) {

        gm(dir + 'base' + msg.author.id + '.png').append(dir + 'row' + msg.author.id + '.png')
            .write(dir + 'scout' + msg.author.id + '.png', function(err) {
                if (!err) {
                    let id = msg.author.id;

                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(names.join(" ★ "));
                    //.setDescription("•" + names.join("\n•"));
                    msg.author.sendEmbed(embed).catch(console.error);

                    msg.author.sendFile(dir + 'scout' + msg.author.id + '.png', "scout.png").then(
                        function() {
                            fs.unlink(dir + 'temp' + msg.author.id + '.png', function() {
                                fs.unlink(dir + 'base' + msg.author.id + '.png', function() {
                                    fs.unlink(dir + 'row' + msg.author.id + '.png', function() {
                                        fs.unlink(dir + 'scout' + msg.author.id + '.png', function() {
                                            return;
                                        });
                                    });
                                });
                            });
                        });

                    /*let note = new discord.RichEmbed();
                    note.setTitle("Finished!")
                        .setColor(0x96F08C)
                        .setDescription("Finished processing " + msg.author + "'s scout!")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(note).catch(console.error)*/

                } else if (err) {
                    console.log(err);
                    msg.author.sendEmbed(scoutError).catch(console.error);
                    msg.author.sendFile(dir + '10pull.png', "error.png");
                    return;
                }
            });

    } else {
        download(msg, list[count], dir + 'temp' + msg.author.id + '.png', function() {
            gm(dir + 'temp' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'temp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'base' + msg.author.id + '.png').append(dir + 'temp' + msg.author.id + '.png', true)
                            .write(dir + 'base' + msg.author.id + '.png', function(err) {
                                if (!err) {
                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) {
                                    console.log(err);
                                    msg.author.sendEmbed(scoutError).catch(console.error);
                                    msg.author.sendFile(dir + '10pull.png', "error.png");
                                    return;
                                }
                            })
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    }

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
