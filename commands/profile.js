var request = require("request");
const discord = require("discord.js");
var fs = require("fs"),
    gm = require('gm');

var usersName = "../db/users.json";
var userSettings = require(usersName);

var profBase = require("./lib/profBase.js");

var dir = './img/';
var bg = ["http://i.imgur.com/e4grkub.png", "http://i.imgur.com/LnycjKr.png", "http://i.imgur.com/JVcFCFX.png", "http://i.imgur.com/gBsSpES.png", "http://i.imgur.com/WSdaoQr.png", "http://i.imgur.com/CSfI2x2.png"]

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

exports.run = (bot, msg, args) => {

    let id = msg.author.id;

    if (msg.mentions.users.size === 1) {
        id = msg.mentions.users.first().id;
    }

    if (!userSettings.hasOwnProperty(id)) {
        userSettings[id] = {
            "botIgnore": false,
            "dia": 25,
            "daily": true,
            "dailyRep": true,
            "inv": {
                "trash": 0,
                "boots": 0,
                "small": 0,
                "med": 0,
                "big": 0
            },
            "bio": "",
            "title": "",
            "twitter": "",
            "tumblr": "",
            "reddit": "",
            "bg": "",
            "style": 1,
            "rep": 0
        }
        updateUsers();
    }

    let card = "";

    if (userSettings[id].bg == "") {
        let rand = Math.floor(Math.random() * bg.length);
        card = bg[rand];
    } else {
        card = userSettings[id].bg;
    }

    let style = userSettings[id].style;

    profBase.gen(bot, msg, card, style, id);
}

exports.help = (bots, msg, args) => {
    return "To generate your profile, use `!profile`.  To look at someone else's profile, use `!profile [user]`.";
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
