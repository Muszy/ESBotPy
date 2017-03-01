var request = require("request");
const discord = require("discord.js");
var http = require("http");
var fs = require("fs"),
    gm = require('gm');

var profText = require("./profText.js");

var dir = './img/';

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

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

exports.gen = function(bot, msg, card, style, id) {

    download(msg, card, dir + 'bg' + id + '.png', function(err) {
        //console.log("done");
        if (!err) {
            gm(dir + 'bg' + id + '.png')
                .resize(null, 500)
                .crop(500, 500)
                .write(dir + 'bg' + id + '.png', function(err) {

                    if (!err) {

                        //console.log("Written composite image.");
                        gm()
                            .command("composite")
                            .in(dir + 'temp' + style + '.png')
                            .in(dir + 'bg' + id + '.png')
                            .write(dir + 'prof' + id + '.png', function(err) {

                                if (!err) {

                                    //console.log("Written composite image2.");

                                    if (bot.users.get(id).avatarURL) {
                                        download(msg, bot.users.get(id).avatarURL, dir + 'avatar' + id + '.png', function() {
                                            //console.log("done");

                                            gm(dir + 'avatar' + id + '.png')
                                                .resize(150, 150)
                                                .write(dir + 'avatar' + id + '.png', function(err) {
                                                    if (!err) {

                                                        gm()
                                                            .command("composite")
                                                            .in("-gravity", "center")
                                                            .in("-geometry", "+0-80")
                                                            .in(dir + 'avatar' + id + '.png')
                                                            .in(dir + 'prof' + id + '.png')
                                                            .write(dir + 'prof' + id + '.png', function(err) {
                                                                if (!err) {

                                                                    //console.log("Written composite image3.");
                                                                    profText.gen(bot, msg, id);
                                                                    return;

                                                                } else if (err) {
                                                                    console.log(err);
                                                                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                                                                    return;
                                                                }
                                                            });

                                                    } else if (err) {
                                                        console.log(err);
                                                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                                                        return;
                                                    }
                                                });

                                        });
                                        return;
                                    }

                                    profText.gen(bot, msg, id);
                                    return;

                                } else if (err) {
                                    console.log(err);
                                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                                    return;
                                }
                            });
                    } else if (err) {
                        console.log(err);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);

                        fs.unlink(dir + 'bg' + id + '.png');
                        return;
                    }
                });
        } else if (err) {
            console.log(err);
            msg.channel.sendEmbed(errorMsg).catch(console.error);
            return;
        }
    });
}
