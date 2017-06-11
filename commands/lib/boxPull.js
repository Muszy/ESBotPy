const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var boxPull = require("./boxPull.js");
var scout = require("./../scout.js");

var usersName = "../../db/users.json";
var userSettings = require(usersName);

const boyURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/";
//https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/ [boy name] / box.json
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.tenPull = function(boy, list, names, stars, count, msg) {
    if (count == 10) {
        userSettings[msg.author.id].dia -= 135;
        updateUsers();
        scout.generatePull(list, names, stars, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.five.length);

                    list.push(data.five[num].img);
                    names.push(data.five[num].name);
                    stars.push(data.five[num].star);

                    boxPull.tenPull(boy, list, names, stars, 1, msg);
                }
            });
        }
        if (rand > 14) {
            //4star
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);
                    stars.push(data.four[num].star);

                    boxPull.tenPull(boy, list, names, stars, count + 1, msg);
                }

            });
        }
    } else {
        let rand = Math.floor(Math.random() * 1000);

        if (rand < 15) {
            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.five.length);

                    list.push(data.five[num].img);
                    names.push(data.five[num].name);
                    stars.push(data.five[num].star);

                    boxPull.tenPull(boy, list, names, stars, count + 1, msg);
                }
            });
        }
        if (rand > 14 && rand < 81) {
            //4star

            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.four.length);

                    list.push(data.four[num].img);
                    names.push(data.four[num].name);
                    stars.push(data.four[num].star);

                    boxPull.tenPull(boy, list, names, stars, count + 1, msg);
                }

            });
        }
        if (rand > 80) {
            //4star

            request(boyURL + boy + "/box.json", function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!(response.statusCode === 200)) {
                    let embed = new discord.RichEmbed();
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Boy was not found.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.three.length);

                    list.push(data.three[num].img);
                    names.push(data.three[num].name);
                    stars.push(data.three[num].star);

                    boxPull.tenPull(boy, list, names, stars, count + 1, msg);
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

function updateUsers() {
    fs.writeFile(__dirname + '/../../db/users-temp.json', JSON.stringify(userSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../../db/users-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented users from being overwritten');
                else {
                    fs.rename(__dirname + '/../../db/users-temp.json', __dirname + '/../../db/users.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}
