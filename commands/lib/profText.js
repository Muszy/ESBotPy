var request = require("request");
const discord = require("discord.js");
var fs = require("fs"),
    gm = require('gm');

var dir = './img/';

var usersName = "../../db/users.json";
var userSettings = require(usersName);

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

exports.gen = function(bot, msg, id) {

    let dia = userSettings[id].dia;
    let rep = userSettings[id].rep;

    let text = [""];
    if (userSettings[id].bio != "") {

        text[0] = userSettings[id].bio.slice(0, 59);
        text[1] = userSettings[id].bio.slice(59, 118);
        text[2] = userSettings[id].bio.slice(118);
    }

    gm(dir + 'prof' + id + '.png')
        .font('/Library/Fonts/Arial.ttf')
        .gravity("East")
        .fill("#595959")
        .fontSize("18")
        .drawText(25, -55, rep)
        .drawText(25, -33, dia)
        .gravity("Center")
        .fill("#303030")
        .fontSize("24")
        .drawText(0, 20, bot.users.get(id).username)
        .fill("#a6a6a6")
        .fontSize("16")
        .drawText(0, 42, userSettings[id].title)
        .fill("#636363")
        .fontSize("16")
        .drawText(0, 215, userSettings[id].twitter)
        .drawText(-160, 215, userSettings[id].tumblr)
        .drawText(168, 215, userSettings[id].reddit)
        .fontSize("14")
        .drawText(0, 75, text[0])
        .drawText(0, 95, text[1])
        .drawText(0, 115, text[2])
        .write(dir + 'final' + id + '.png', function(err) {
            if (!err) {
                console.log("Written composite image.");
                msg.channel.sendMessage("**Profile for: " + bot.users.get(id).username + "**");
                msg.channel.sendFile(dir + 'final' + id + '.png', 'profile.png')
                    .then(
                        function() {
                            fs.unlink(dir + 'avatar' + id + '.png', function() {
                                fs.unlink(dir + 'bg' + id + '.png', function() {
                                    fs.unlink(dir + 'prof' + id + '.png', function() {
                                        fs.unlink(dir + 'final' + id + '.png', function() {
                                            return;
                                        });
                                    });
                                });
                            });
                        });
            } else if (err) {
                console.log(err);
                msg.channel.sendEmbed(errorMsg).catch(console.error);
                return;
            }
        });
    //console.log(userSettings[id]);

}
