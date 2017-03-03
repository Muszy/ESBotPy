const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var ptsPull = require("./ptsPull.js");
var scout = require("./../scout.js");

const fourURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Normal/four.json";
const threeURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Normal/three.json";

//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.tenPull = function(list, names, count, msg) {
    if (count == 10) {
        scout.generatePull(list, names, 0, msg);
    } else {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(fourURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);
                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);

                    ptsPull.tenPull(list, names, count + 1, msg);
                }
            });
        }
        if (rand > 14) {
            //3star
            request(threeURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.three.length);

                    list.push(data.three[num].img);
                    names.push(data.three[num].name);

                    ptsPull.tenPull(list, names, count + 1, msg);
                }
            });
        }
    }
}

exports.solo = function(msg) {
    let rand = Math.floor(Math.random() * 1000);
    if (rand < 15) {
        request(fourURL, function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
            if (!error) {
                data = JSON.parse(body);

                let num = Math.floor(Math.random() * data.four.length);

                let id = msg.author.id;
                let embed = new discord.RichEmbed();
                embed.setTitle(msg.author.username + "'s Scouting Results")
                    .setURL("http://enstars.info/card/" + data.four[num].id)
                    .setColor(0x96F08C)
                    .setThumbnail(data.four[num].img)
                    .setDescription(data.four[num].name);
                msg.channel.sendEmbed(embed).catch(console.error);
                msg.delete(1500);
            }
        });
    }

    if (rand > 14) {
        request(threeURL, function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
            if (!error) {
                data = JSON.parse(body);

                let num = Math.floor(Math.random() * data.three.length);

                let id = msg.author.id;
                let embed = new discord.RichEmbed();
                embed.setTitle(msg.author.username + "'s Scouting Results")
                    .setURL("http://enstars.info/card/" + data.three[num].id)
                    .setColor(0x96F08C)
                    .setThumbnail(data.three[num].img)
                    .setDescription(data.three[num].name);
                msg.channel.sendEmbed(embed).catch(console.error);
                msg.delete(1500);
            }
        });
    }
}

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}
