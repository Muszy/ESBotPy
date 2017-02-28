const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var boxPull = require("./boxPull.js");
var scout = require("./../scout.js");

const boyURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/";
//https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/ [boy name] / box.json
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.tenPull = function(boy, list, names, count, msg) {
    if (count == 10) {
        scout.generatePull(list, names, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);

                    boxPull.tenPull(boy, list, names, 1, msg);
                }
            });
        }
        if (rand > 14) {
            //4star
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);

                    boxPull.tenPull(boy, list, names, count + 1, msg);
                }

            });
        }
    } else {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.five.length);

                    list.push(data.five[num].img);
                    names.push(data.five[num].name);

                    boxPull.tenPull(boy, list, names, count + 1, msg);
                }
            });
        }
        if (rand > 14 && rand < 81) {
            //4star

            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);

                    boxPull.tenPull(boy, list, names, count + 1, msg);
                }

            });
        }
        if (rand > 80) {
            //4star

            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.three.length);

                    list.push(data.three[num].img);
                    names.push(data.three[num].name);

                    boxPull.tenPull(boy, list, names, count + 1, msg);
                }

            });
        }
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
