const discord = require("discord.js");
var http = require("http");
var request = require("request");
var trim = require("trim");
var fs = require("fs");

const url = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/";
// + boy + "/" + rare + ".json"

var errMsg = new discord.RichEmbed();
errMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Please enter in the form of `!card [character first name] (opt rarity/opt alias)`!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

var oops = new discord.RichEmbed();
oops.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.run = (bot, msg, args) => {

    if (args.length < 1) {
        msg.channel.sendEmbed(errMsg).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    } else if (args.length == 1) {
        let list = [];
        searchBoy(args[0].toLowerCase(), list, 0, msg);
        return;
    } else {
        if (args[1].toLowerCase() == "r" || args[1].toLowerCase() == "sr" || args[1].toLowerCase() == "ur") {
            searchRare(args, msg);
            return;
        } else if (args[1] == "3" || args[1].toLowerCase() == "4" || args[1].toLowerCase() == "5") {
            if (args[1] == "3") args[1] = "r";
            else if (args[1] == "4") args[1] = "sr";
            else if (args[1] == "5") args[1] = "ur";

            searchRare(args, msg);
            return;
        }

        lookUp(args, msg);
        return;
    }
}

exports.help = (bot, msg, args) => {
    return "To look up a card, please use the format of `!card [character firstname] (opt rarity/opt alias)`.";
}

//====================================================================================================

function searchBoy(boy, list, count, msg) {

    let star;

    if (count < 3) {

        if (count == 0) star = "three";
        else if (count == 1) star = "four";
        else if (count == 2) star = "five";

        request(url + boy + "/" + star + ".json", function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(oops).then(m => m.delete(4000)).catch(console.error);
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
                //console.log(data);
                list.push(data.cards.length);
                searchBoy(boy, list, count + 1, msg);
                return;
            }
        });
    } else {

        request(url + boy + "/five.json", function(error, response, body) {
            if (error) {
                console.log(error);
                msg.channel.sendEmbed(oops).then(m => m.delete(4000)).catch(console.error);
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
                //console.log(data);

                let name = data.cards[0].name.split(")");

                let temp = name[1];
                if (boy == "cn") temp = "CN/TW Enstars";

                let embed = new discord.RichEmbed();
                embed.setTitle("Results for " + temp + ":")
                    .setColor(0x96F08C)
                    .setDescription("Number of 3★: " + list[0] + "\nNumber of 4★: " + list[1] + "\nNumber of 5★: " + list[2])
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }
        });
    }

}

//====================================================================================================

function searchRare(args, msg) {
    let boy = args[0].toLowerCase();
    let rare = args[1].toLowerCase();
    let star;

    if (rare == "r") star = "three";
    else if (rare == "sr") star = "four";
    else if (rare == "ur") star = "five";
    else return;

    let list = [];

    request(url + boy + "/" + star + ".json", function(error, response, body) {
        if (error) {
            console.log(error);
            msg.channel.sendEmbed(oops).then(m => m.delete(4000)).catch(console.error);
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
            if (rare == "r") {
                let name = data.cards[0].name.split(")");

                let temp = name[1];
                if (boy == "cn") temp = "CN/TW Enstars";

                let embed = new discord.RichEmbed();
                embed.setTitle("Found:")
                    .setColor(0x96F08C)
                    .setDescription("`[" + data.cards.length + "]` 3★ cards for " + temp + ".")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }
            //console.log(data);
            for (var id in data.cards) {
                //console.log(data.cards[id].nick);

                if (data.cards[id].nick == boy.toLowerCase()) {
                    list.push(data.cards[id].name + " : " + data.cards[id].alias.toUpperCase());
                }
            }

            if (list.length < 1) {
                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("No such character found!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;
            }

            let str = list.join("\n");

            let embed = new discord.RichEmbed();
            embed.setTitle("Found (Name | Alias):")
                .setColor(0x96F08C)
                .setDescription("`" + str + "`")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
        }
    });
}

//====================================================================================================


function lookUp(args, msg) {

    let boy = args[0].toLowerCase(),
        alias = args[1].toLowerCase(),
        star;

    if (alias.startsWith("r")) star = "three";
    else if (alias.startsWith("s")) star = "four";
    else if (alias.startsWith("u")) star = "five";

    let check = null;
    let list = [];

    request(url + boy + "/" + star + ".json", function(error, response, body) {
        if (error) {
            console.log(error);
            msg.channel.sendEmbed(oops).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }
        if (!(response.statusCode === 200)) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Card was not found.")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }
        if (!error) {
            data = JSON.parse(body);
            //console.log(data);
            for (var id in data.cards) {
                //console.log(data.cards[id].nick);
                if (data.cards[id].nick == boy.toLowerCase() && alias == data.cards[id].alias) {
                    check = id;
                    //console.log("found" + id);
                }
            }

            if (check != null) {
                let embed = new discord.RichEmbed();
                embed.setTitle(data.cards[check].name + " [" + data.cards[check].star + "★]")
                    .setURL("http://enstars.info/card/" + data.cards[check].id)
                    .setColor(0x96F08C)
                    .setThumbnail(data.cards[check].img)
                    .addField("Main Stat", data.cards[check].stat)
                    .addField("Lesson Skill", data.cards[check].lesson)
                    .addField("DreamFes Skill", data.cards[check].dreamfes)
                    .addField("Source", data.cards[check].origin);
                msg.channel.sendEmbed(embed).catch(console.error);
            } else {

                let searcher = [boy];

                if (alias.startsWith("r")) searcher[1] = "r";
                else if (alias.startsWith("sr")) searcher[1] = "sr";
                else if (alias.startsWith("ur")) searcher[1] = "ur";
                else searchBoy(boy, msg);

                searchRare(searcher, msg);

            }
        }
    });

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

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
