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

    let text = ["", "", ""];
    if (userSettings[id].bio != "") {

        text = userSettings[id].bio.split("|");

        if (!text[0]) text[0] = " ";
        if (!text[1]) text[1] = " ";
        if (!text[2]) text[2] = " ";
    }

    let font = ["636363", "303030", "a6a6a6"];

    if (userSettings[id].fontOne) {
        if (userSettings[id].fontOne.charAt(0) == "#") {
            font[0] = userSettings[id].fontOne.slice(1);
            console.log(font[0]);
        } else {
            font[0] = userSettings[id].fontOne;
            console.log(font[0]);
        }
    }
    if (userSettings[id].fontTwo) {
        if (userSettings[id].fontTwo.charAt(0) == "#") {
            font[1] = userSettings[id].fontTwo.slice(1);
            console.log(font[1]);
        } else {
            font[1] = userSettings[id].fontTwo;
            console.log(font[1]);
        }
    }
    if (userSettings[id].fontThree) {
        if (userSettings[id].fontThree.charAt(0) == "#") {
            font[2] = userSettings[id].fontThree.slice(1);
            console.log(font[2]);
        } else {
            font[2] = userSettings[id].fontThree;
            console.log(font[2]);
        }
    }

    gm(dir + 'prof' + id + '.png')
        .font('/Library/Fonts/Arial.ttf')
        .gravity("East")
        .fill("#" + font[0])
        .fontSize("18")
        .drawText(25, -55, rep)
        .drawText(25, -33, dia)
        .gravity("Center")
        .fill("#" + font[1])
        .fontSize("24")
        .drawText(0, 20, bot.users.get(id).username)
        .fill("#" + font[2])
        .fontSize("16")
        .drawText(0, 42, userSettings[id].title)
        .fill("#" + font[0])
        .fontSize("16")
        .drawText(0, 215, userSettings[id].twitter)
        .drawText(-160, 215, userSettings[id].tumblr)
        .drawText(168, 215, userSettings[id].reddit)
        .fontSize("15")
        .fill("#" + font[1])
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
                                            msg.delete(1500);
                                            return;
                                        });
                                    });
                                });
                            });
                        });
            } else if (err) {
                console.log(err);
                msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
        });
    //console.log(userSettings[id]);

}
