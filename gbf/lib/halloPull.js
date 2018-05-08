const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var halloPull = require("./halloPull.js");
var scout = require("./../scout.js");

const pullURL = "https://raw.githubusercontent.com/Hanifish/Granblue/master/halloween.json";
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");

exports.tenPull = function(names, count, msg) {
    if (count == 10) {
        scout.generatePull(names, 0, msg);
    } else if (count == 0) {
        let rand = Math.floor(Math.random() * 100);
        let flip;

        if (rand < 3) {
            //ssr
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.ssr.length);

                    names.push(data.ssr[num]);

                    halloPull.tenPull(names, 1, msg);
                }
            });
        }
        if (rand > 2) {
            //sr
            flip = Math.floor(Math.random() * 3);
            if (flip < 1) { //sr char
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.srChar.length);

                        names.push(data.srChar[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.sr.length);

                        names.push(data.sr[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            }
        }
    } else {
        let rand = Math.floor(Math.random() * 100);
        let flip;

        if (rand < 3) {
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.ssr.length);

                    names.push(data.ssr[num]);

                    halloPull.tenPull(names, count + 1, msg);
                }
            });
        }
        if (rand > 2 && rand < 19) {
            //sr
            flip = Math.floor(Math.random() * 3);
            if (flip < 1) { //sr char
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);

                        let num = Math.floor(Math.random() * data.srChar.length);

                        names.push(data.srChar[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.sr.length);

                        names.push(data.sr[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            }
        }
        if (rand > 18) {
            //r
            flip = Math.floor(Math.random() * 8);
            if (flip < 1) { //r char
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.rChar.length);

                        names.push(data.rChar[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            } else if (flip > 0) {
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                        return;
                    }
                    if (!error) {
                        data = JSON.parse(body);


                        let num = Math.floor(Math.random() * data.rare.length);

                        names.push(data.rare[num]);

                        halloPull.tenPull(names, count + 1, msg);
                    }

                });
            }
        }
    }
}

exports.solo = function(msg) {
    let rand = Math.floor(Math.random() * 100);

    if (rand < 3) {
        request(pullURL, function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }
            if (!error) {
                data = JSON.parse(body);

                let num = Math.floor(Math.random() * data.ssr.length);

                let id = msg.author.id;
                let embed = new discord.RichEmbed();
                embed.setTitle(msg.author.username + "'s Scouting Results")
                    .setColor(0x96F08C)
                    .setDescription(data.ssr[num]);
                msg.channel.sendEmbed(embed).catch(console.error);
                msg.delete(1500);
            }
        });
    }

    if (rand > 2 && rand < 19) {
        //sr
        flip = Math.floor(Math.random() * 3);
        if (flip < 1) { //sr char
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.srChar.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(data.srChar[num]);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }

            });
        } else if (flip > 0) {
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.sr.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(data.sr[num]);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }

            });
        }
    }

        if (rand > 18) {
            //r
            flip = Math.floor(Math.random() * 8);
            if (flip < 1) { //r char
                request(pullURL, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                        msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);


                    let num = Math.floor(Math.random() * data.rChar.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(data.rChar[num]);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }

            });
        } else if (flip > 0) {
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.rare.length);

                    let id = msg.author.id;
                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author.username + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(data.rare[num]);
                    msg.channel.sendEmbed(embed).catch(console.error);
                    msg.delete(1500);
                }

            });
        }
    }

}
