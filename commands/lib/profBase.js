var request = require("request");
const discord = require("discord.js");
var http = require("http");
var fs = require("fs"),
    gm = require('gm');

var profCard = require("./profCard.js");
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
            var width;
            var height;
            gm(dir + 'bg' + id + '.png')
                .size(function(err, value) {
                    width = value.width;
                    height = value.height;

                    profCard.create(bot, msg, card, style, id, width, height);

                    return;
                });

        } else if (err) {
            console.log(err);
            msg.channel.sendEmbed(errorMsg).catch(console.error);
            return;
        }
    });
}
