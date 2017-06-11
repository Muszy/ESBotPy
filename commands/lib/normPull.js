const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var normPull = require("./normPull.js");
var scout = require("./../scout.js");

const fiveURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Normal/five.json";
const fourURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Normal/four.json";
const threeURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Normal/three.json";

//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.tenPull = function(list, names, stars, count, msg) {
    if (count == 10) {
        scout.generatePull(list, names, stars, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(fiveURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);
                    let num = Math.floor(Math.random() * data.five.length);

                    list.push(data.five[num].img);
                    names.push(data.five[num].name);
                    stars.push(data.five[num].star);

                    normPull.tenPull(list, names, stars, 1, msg);
                }
            });
        }
        if (rand > 14) {
            //4star
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
                    stars.push(data.four[num].star);

                    normPull.tenPull(list, names, stars, 1, msg);
                }
            });
        }
    } else {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(fiveURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);
                    let num = Math.floor(Math.random() * data.five.length);

                    list.push(data.five[num].img);
                    names.push(data.five[num].name);
                    stars.push(data.five[num].star);

                    normPull.tenPull(list, names, stars, count + 1, msg);
                }
            });
        }
        if (rand > 14 && rand < 81) {
            //4star
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
                    stars.push(data.four[num].star);

                    normPull.tenPull(list, names, stars, count + 1, msg);
                }
            });

        }
        if (rand > 80) {
            //4star
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
                    stars.push(data.three[num].star);

                    normPull.tenPull(list, names, stars, count + 1, msg);
                }
            });
        }
    }
}

exports.solo = function(msg) {
    let rand = Math.floor(Math.random() * 1000);
    if (rand < 15) {
        request(fiveURL, function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
            if (!error) {
                data = JSON.parse(body);

                let num = Math.floor(Math.random() * data.five.length);

                let id = msg.author.id;
                let embed = new discord.RichEmbed();
                embed.setTitle(msg.author.username + "'s Scouting Results")
                    .setURL("http://enstars.info/card/" + data.five[num].id)
                    .setColor(0x96F08C)
                    .setThumbnail(data.five[num].img)
                    .setDescription("[" + data.five[num].star + "★] " + data.five[num].name);
                msg.channel.sendEmbed(embed).catch(console.error);
                msg.delete(1500);
            }
        });
    }

    if (rand > 14 && rand < 81) {
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
                    .setDescription("[" + data.four[num].star + "★] " + data.four[num].name);
                msg.channel.sendEmbed(embed).catch(console.error);
                msg.delete(1500);
            }
        });
    }

    if (rand > 80) {
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
                    .setDescription("[" + data.three[num].star + "★] " + data.three[num].name);
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
