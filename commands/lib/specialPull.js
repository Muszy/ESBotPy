const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var specialPull = require("./specialPull.js");
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

                specialPull.tenPull(list, names, stars, count + 1, msg);
            }
        });
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

                    specialPull.tenPull(list, names, stars, count + 1, msg);
                }
            });
        }
        if (rand > 14 && rand < 81 ) {
            //3star
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

                    specialPull.tenPull(list, names, stars, count + 1, msg);
                }
            });
        }
        if (rand > 80 ) {
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
                    stars.push(data.three[num].star);

                    specialPull.tenPull(list, names, stars, count + 1, msg);
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
