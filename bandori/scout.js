const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");

var scout = require("./scout.js");
var eventPull = require("./lib/eventPull.js");

var usersName = "../db/users.json";
var userSettings = require(usersName);

var scoutError = new discord.RichEmbed();
scoutError.setTitle("You're going too fast!")
    .setColor(0x96F08C)
    .setDescription("Slow down, please!");

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/XMVTWl9.png");

var dir = './img/';
var download = function(msg, uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        if (err) {
            //console.log("bg img not found");
            msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
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

        if (args[0] == "10") {

            let list = [];
            let names = [];
            let stars = [];
            eventPull.tenPull(list, names, stars, 0, msg);
            return;
        } else if (args[0] == "1") {
            eventPull.solo(msg);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Scout not found!")
            .setThumbnail("http://i.imgur.com/XMVTWl9.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Scout not found!")
        .setThumbnail("http://i.imgur.com/XMVTWl9.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bot, msg, args) => {
    return "To pull from the gacha, please use the format of `b!scout [1/10]`.";
}

exports.generatePull = function(list, names, stars, count, msg) {
    if (count == 0) {
        download(msg, list[0], dir + 'bbase' + msg.author.id + '.png', function() {

            gm(dir + 'bbase' + msg.author.id + '.png')
                .write(dir + 'bbase' + msg.author.id + '.png', function(err) {
                    if (!err) {
                        console.log("Written composite image.");
                        scout.generatePull(list, names, stars, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count == 5) {
        download(msg, list[count], dir + 'brow' + msg.author.id + '.png', function() {

            gm(dir + 'brow' + msg.author.id + '.png')
                .write(dir + 'brow' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        scout.generatePull(list, names, stars, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count > 5 && count < 10) {
        download(msg, list[count], dir + 'btemp' + msg.author.id + '.png', function() {

            gm(dir + 'btemp' + msg.author.id + '.png')
                .write(dir + 'btemp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'brow' + msg.author.id + '.png').append(dir + 'btemp' + msg.author.id + '.png', true)
                            .write(dir + 'brow' + msg.author.id + '.png', function(err) {
                                if (!err) {

                                    scout.generatePull(list, names, stars, count + 1, msg);
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

        gm(dir + 'bbase' + msg.author.id + '.png').append(dir + 'brow' + msg.author.id + '.png')
            .write(dir + 'bscout' + msg.author.id + '.png', function(err) {
                if (!err) {
                    let id = msg.author.id;

                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription("[" + stars[0] + "★] " + names[0] + "\n[" + stars[1] + "★] " + names[1] + "\n[" + stars[2] + "★] " + names[2] + "\n[" + stars[3] + "★] " + names[3] + "\n[" + stars[4] + "★] " + names[4] + "\n[" + stars[5] + "★] " + names[5] + "\n[" + stars[6] + "★] " + names[6] + "\n[" + stars[7] + "★] " + names[7] + "\n[" + stars[8] + "★] " + names[8] + "\n[" + stars[9] + "★] " + names[9]);
                    //.setDescription("•" + names.join("\n•"));
                    msg.author.sendEmbed(embed).catch(console.error);

                    msg.author.sendFile(dir + 'bscout' + msg.author.id + '.png', "scout.png").then(
                        function() {
                            fs.unlink(dir + 'btemp' + msg.author.id + '.png', function() {
                                fs.unlink(dir + 'bbase' + msg.author.id + '.png', function() {
                                    fs.unlink(dir + 'brow' + msg.author.id + '.png', function() {
                                        fs.unlink(dir + 'bscout' + msg.author.id + '.png', function() {
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
        download(msg, list[count], dir + 'btemp' + msg.author.id + '.png', function() {
            gm(dir + 'btemp' + msg.author.id + '.png')
                .write(dir + 'btemp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'bbase' + msg.author.id + '.png').append(dir + 'btemp' + msg.author.id + '.png', true)
                            .write(dir + 'bbase' + msg.author.id + '.png', function(err) {
                                if (!err) {
                                    scout.generatePull(list, names, stars, count + 1, msg);
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
