const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var eventPull = require("./eventPull.js");
var scout = require("./../scout.js");

const eventURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Event/eventCards.json";
const threeURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Event/three.json";
const fourURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Scouts/Event/four.json";
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.tenPull = function(list, names, count, msg) {
    if (count == 10) {
        scout.generatePull(list, names, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 1000);
        let flip;

        if (rand < 15) {
            request(eventURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    list.push(data.five[0].img);
                    names.push(data.five[0].name);

                    eventPull.tenPull(list, names, 1, msg);
                }
            });
        }
        if (rand > 14) {
            //4star
            flip = Math.floor(Math.random() * 2);
            if (flip < 1) { //event 4star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.eventFour.length);

                        list.push(data.eventFour[num].img);
                        names.push(data.eventFour[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(fourURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.four.length);

                        list.push(data.four[num].img);
                        names.push(data.four[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            }
        }
    } else {
        let rand = Math.floor(Math.random() * 1000);
        let flip;

        if (rand < 15) {
            request(eventURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    list.push(data.five[0].img);
                    names.push(data.five[0].name);

                    eventPull.tenPull(list, names, count + 1, msg);
                }
            });
        }
        if (rand > 14 && rand < 81) {
            //4star
            flip = Math.floor(Math.random() * 2);
            if (flip < 1) { //event 4star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.eventFour.length);

                        list.push(data.eventFour[num].img);
                        names.push(data.eventFour[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(fourURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.four.length);

                        list.push(data.four[num].img);
                        names.push(data.four[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            }
        }
        if (rand > 80) {
            //4star
            flip = Math.floor(Math.random() * 4);
            if (flip < 1) { //event 3star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.eventThree.length);

                        list.push(data.eventThree[num].img);
                        names.push(data.eventThree[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(threeURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.three.length);

                        list.push(data.three[num].img);
                        names.push(data.three[num].name);

                        eventPull.tenPull(list, names, count + 1, msg);
                    }

                });
            }
        }
    }
}

exports.solo = function(msg) {
    let rand = Math.floor(Math.random() * 1000);

    if (rand < 15) {
        request(eventURL, function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(errorMsg).catch(console.error);
                return;
            }
            if (!error) {
                data = JSON.parse(body);

                let id = msg.author.id;
                let embed = new discord.RichEmbed();
                embed.setTitle(msg.author.username + "'s Scouting Results")
                    .setURL("http://enstars.info/card/" + data.five[0].id)
                    .setColor(0x96F08C)
                    .setThumbnail(data.five[0].img)
                    .setDescription(data.five[0].name);
                msg.channel.sendEmbed(embed).catch(console.error);
            }
        });
    }

    if (rand > 14 && rand < 81) {
        let flip = Math.floor(Math.random() * 2);

        if (rand > 14 && rand < 81) {
            //4star
            flip = Math.floor(Math.random() * 2);
            if (flip < 1) { //event 4star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.eventFour.length);

                        let id = msg.author.id;
                        let embed = new discord.RichEmbed();
                        embed.setTitle(msg.author.username + "'s Scouting Results")
                            .setURL("http://enstars.info/card/" + data.eventFour[num].id)
                            .setColor(0x96F08C)
                            .setThumbnail(data.eventFour[num].img)
                            .setDescription(data.eventFour[num].name);
                        msg.channel.sendEmbed(embed).catch(console.error);
                    }

                });
            } else if (flip > 0) {
                request(fourURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).catch(console.error);
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
                    }

                });
            }
        }
    }

    if (rand > 80) {
        //4star
        flip = Math.floor(Math.random() * 4);
        if (flip < 1) { //event 3star
            request(eventURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.eventThree.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setURL("http://enstars.info/card/" + data.eventThree[num].id)
                        .setColor(0x96F08C)
                        .setThumbnail(data.eventThree[num].img)
                        .setDescription(data.eventThree[num].name);
                    msg.channel.sendEmbed(embed).catch(console.error);
                }

            });
        } else if (flip > 0) {
            request(threeURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).catch(console.error);
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
