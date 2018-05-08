const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var eventPull = require("./dreamPull.js");
var scout = require("./../dreamfes.js");

const eventURL = "https://raw.githubusercontent.com/Hanifish/Bandori/master/Data/Scout/dream.json";
const twoURL = "https://raw.githubusercontent.com/Hanifish/Bandori/master/Data/Scout/two.json";
const threeURL = "https://raw.githubusercontent.com/Hanifish/Bandori/master/Data/Scout/three.json";
const fourURL = "https://raw.githubusercontent.com/Hanifish/Bandori/master/Data/Scout/four.json";
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/XMVTWl9.png");

exports.tenPull = function(list, names, stars, count, msg) {
    if (count == 10) {
        scout.generatePull(list, names, stars, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 1000);
        let flip;

        if (rand < 60) {
            flip = Math.floor(Math.random() * 15);
            if (flip < 5) {
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        let num = Math.floor(Math.random() * data.eventFour.length);

                        list.push(data.eventFour[num].icon);
                        names.push(data.eventFour[num].name);
                        stars.push(data.eventFour[num].star);

                        eventPull.tenPull(list, names, stars, 1, msg);
                    }
                });
            }
            else {
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

                        list.push(data.four[num].icon);
                        names.push(data.four[num].name);
                        stars.push(data.four[num].star);

                        eventPull.tenPull(list, names, stars, 1, msg);
                    }

                });
            }
        }
        if (rand > 59) {
            //3star
            flip = Math.floor(Math.random() * 85);
            if (flip < 12) { //event 3star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        if (data.eventThree.length == 0) {
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

                                    list.push(data.three[num].icon);
                                    names.push(data.three[num].name);
                                    stars.push(data.three[num].star);

                                    eventPull.tenPull(list, names, stars, count + 1, msg);
                                }

                            });
                        }

                        else if (data.eventThree.length > 0) {

                            let num = Math.floor(Math.random() * data.eventThree.length);

                            list.push(data.eventThree[num].icon);
                            names.push(data.eventThree[num].name);
                            stars.push(data.eventThree[num].star);

                            eventPull.tenPull(list, names, stars, count + 1, msg);
                        }
                    }

                });
            } else {
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

                        list.push(data.three[num].icon);
                        names.push(data.three[num].name);
                        stars.push(data.three[num].star);

                        eventPull.tenPull(list, names, stars, count + 1, msg);
                    }

                });
            }
        }
    } else {
        let rand = Math.floor(Math.random() * 1000);
        let flip;

        if (rand < 60) {
            flip = Math.floor(Math.random() * 15);
            if (flip < 5) {
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        let num = Math.floor(Math.random() * data.eventFour.length);

                        list.push(data.eventFour[num].icon);
                        names.push(data.eventFour[num].name);
                        stars.push(data.eventFour[num].star);

                        eventPull.tenPull(list, names, stars, count + 1, msg);
                    }
                });
            }
            else {
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

                        list.push(data.four[num].icon);
                        names.push(data.four[num].name);
                        stars.push(data.four[num].star);

                        eventPull.tenPull(list, names, stars, count + 1, msg);
                    }

                });
            }
        }
        if (rand > 59 && rand < 145) {
            //3star
            flip = Math.floor(Math.random() * 85);
            if (flip < 12) { //event 3star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        if (data.eventThree.length == 0) {
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

                                    list.push(data.three[num].icon);
                                    names.push(data.three[num].name);
                                    stars.push(data.three[num].star);

                                    eventPull.tenPull(list, names, stars, count + 1, msg);
                                }

                            });
                        }

                        else if (data.eventThree.length > 0) {
                            
                            let num = Math.floor(Math.random() * data.eventThree.length);

                            list.push(data.eventThree[num].icon);
                            names.push(data.eventThree[num].name);
                            stars.push(data.eventThree[num].star);

                            eventPull.tenPull(list, names, stars, count + 1, msg);
                        }
                    }

                });
            } else {
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

                        list.push(data.three[num].icon);
                        names.push(data.three[num].name);
                        stars.push(data.three[num].star);

                        eventPull.tenPull(list, names, stars, count + 1, msg);
                    }

                });
            }
        }
        if (rand > 144) {
            //2star
            flip = Math.floor(Math.random() * 90);
            if (flip < 11) { //event 2star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {

                        data = JSON.parse(body);

                        if (data.eventTwo.length == 0) {
                            request(twoURL, function(error, response, body) {
                                if (error) {
                                    console.log(error);
                                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                                    msg.delete(1500);
                                    return;
                                }
                                if (!error) {
                                    data = JSON.parse(body);


                                    let num = Math.floor(Math.random() * data.two.length);

                                    list.push(data.two[num].icon);
                                    names.push(data.two[num].name);
                                    stars.push(data.two[num].star);

                                    eventPull.tenPull(list, names, stars, count + 1, msg);
                                }

                            });
                        }

                        else if (data.eventTwo.length > 0) {

                            let num = Math.floor(Math.random() * data.eventTwo.length);

                            list.push(data.eventTwo[num].icon);
                            names.push(data.eventTwo[num].name);
                            stars.push(data.eventTwo[num].star);

                            eventPull.tenPull(list, names, stars, count + 1, msg);
                        }
                    }

                });
            } else if (flip > 10) {
                request(twoURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.two.length);

                        list.push(data.two[num].icon);
                        names.push(data.two[num].name);
                        stars.push(data.two[num].star);

                        eventPull.tenPull(list, names, stars, count + 1, msg);
                    }

                });
            }
        }
    }
}

exports.solo = function(msg) {
    let rand = Math.floor(Math.random() * 1000);

    if (rand < 60) {
        let flip = Math.floor(Math.random() * 15);

        if (flip < 5) {
                request(eventURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.eventFour.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setURL("http://bandori.party/card/" + data.eventFour[num].id)
                        .setColor(0x96F08C)
                        .setThumbnail(data.eventFour[num].icon)
                        .setDescription("[" + data.eventFour[num].star + "★] " + data.eventFour[num].name);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }
            });
        }
        else {
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
                        .setURL("http://bandori.party/card/" + data.four[num].id)
                        .setColor(0x96F08C)
                        .setThumbnail(data.four[num].icon)
                        .setDescription("[" + data.four[num].star + "★] " + data.four[num].name);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }
            });
        }
    }

    if (rand > 59 && rand < 145) {
        let flip = Math.floor(Math.random() * 85);
            //4star
            if (flip < 12) { //event 4star
                request(eventURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        if (data.eventThree.length == 0) {
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
                                        .setURL("http://bandori.party/card/" + data.three[num].id)
                                        .setColor(0x96F08C)
                                        .setThumbnail(data.three[num].icon)
                                        .setDescription("[" + data.three[num].star + "★] " + data.three[num].name);
                                    msg.channel.sendEmbed(embed).catch(console.error);
                                    msg.delete(1500);
                                }

                            });
                        }

                        else if (data.eventThree.length > 0) {
                            
                            let num = Math.floor(Math.random() * data.eventThree.length);

                            let id = msg.author.id;
                            let embed = new discord.RichEmbed();
                            embed.setTitle(msg.author.username + "'s Scouting Results")
                                .setURL("http://bandori.party/card/" + data.eventThree[num].id)
                                .setColor(0x96F08C)
                                .setThumbnail(data.eventThree[num].icon)
                                .setDescription("[" + data.eventThree[num].star + "★] " + data.eventThree[num].name);
                            msg.channel.sendEmbed(embed).catch(console.error);
                            msg.delete(1500);
                        }

                    }

                });
            } else {
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
                            .setURL("http://bandori.party/card/" + data.three[num].id)
                            .setColor(0x96F08C)
                            .setThumbnail(data.three[num].icon)
                            .setDescription("[" + data.three[num].star + "★] " + data.three[num].name);
                        msg.channel.sendEmbed(embed).catch(console.error);
                        msg.delete(1500);
                    }

                });
            }
        
    }

    if (rand > 144) {
        //4star
        flip = Math.floor(Math.random() * 90);
        if (flip < 10) { //event 3star
            request(eventURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                        if (data.eventTwo.length == 0) {
                            request(twoURL, function(error, response, body) {
                                if (error) {
                                    console.log(error);
                                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                                    msg.delete(1500);
                                    return;
                                }
                                if (!error) {
                                    data = JSON.parse(body);
                                    
                                    let num = Math.floor(Math.random() * data.two.length);

                                    let id = msg.author.id;
                                    let embed = new discord.RichEmbed();
                                    embed.setTitle(msg.author.username + "'s Scouting Results")
                                        .setURL("http://bandori.party/card/" + data.two[num].id)
                                        .setColor(0x96F08C)
                                        .setThumbnail(data.two[num].icon)
                                        .setDescription("[" + data.two[num].star + "★] " + data.two[num].name);
                                    msg.channel.sendEmbed(embed).catch(console.error);
                                    msg.delete(1500);
                                }

                            });
                        }

                        else if (data.eventTwo.length > 0) {

                            let num = Math.floor(Math.random() * data.eventTwo.length);

                            let id = msg.author.id;
                            let embed = new discord.RichEmbed();
                            embed.setTitle(msg.author.username + "'s Scouting Results")
                                .setURL("http://bandori.party/card/" + data.eventTwo[num].id)
                                .setColor(0x96F08C)
                                .setThumbnail(data.eventTwo[num].icon)
                                .setDescription("[" + data.eventTwo[num].star + "★] " + data.eventTwo[num].name);
                            msg.channel.sendEmbed(embed).catch(console.error);
                            msg.delete(1500);
                        }

                }

            });
        } else {
            request(twoURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.two.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setURL("http://bandori.party/card/" + data.two[num].id)
                        .setColor(0x96F08C)
                        .setThumbnail(data.two[num].icon)
                        .setDescription("[" + data.two[num].star + "★] " + data.two[num].name);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
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
