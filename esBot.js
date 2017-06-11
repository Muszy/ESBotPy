/*
hey its me ur brother
author: waluigi

commenting thoroughly for ellie's reference

color guide:
    0xFF0040 - errors
    0x3399FF - 8ball/admin
    0x96F08C - gacha
    0xFFB6C1 - chat
    0xB48CF0 - help
    0xFFB400 - event/gacha info
    0xFF69B4 - rates
    0x753FCF - dia stuff
    0xA7DBD8 - profile
    0xFF3232 - luck

timeouts:
    1500 - commands
    4000 - errors
    5000 - interacts
    3000 - updating stuff

icons:
    treat daikichi - http://i.imgur.com/gUWJl0u.png
    reg daikichi - http://i.imgur.com/7TL0t99.png
    waving dai - http://i.imgur.com/nRleyfl.png
    michelle - http://i.imgur.com/408QceQ.png
    error kanon - http://i.imgur.com/XMVTWl9.png

==============================================*/

/*==============REQUIRED MODULES==============*/

//we require more resources, aka we set new variables to request these resources and therefore we can use them later on
const discord = require("discord.js");
var fs = require("fs");
var request = require("superagent");
const config = require("./config.json");
var schedule = require('node-schedule');

var serversName = "./db/servers.json";
var serverSettings = require(serversName);

var globalsName = "./db/globals.json";
var globals = require(globalsName);

var usersNames = "./db/users.json";
var userSettings = require(usersNames);

var quotesName = "./db/quotes.json";
var quotes = require(quotesName);

var weebName = "./db/weeb.json";
var weeb = require(weebName);

/*====================BASE====================*/

//important: don't forget to state the bot
const bot = new discord.Client();
var boofs = ["Boof!", "Woof!", "Woof woof!", "Arf!", "Bark!", "Bork!", "Bork bork bork!", "Ruff!", "Rrrrr...", "Yip!", "Arf arf!", "Grrrr..."]
var event = null;
var half = null;
var last = null;

var bEvent = null;
var bLast = null;

var recentComm = [];

var commError = new discord.RichEmbed();
commError.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Command not found! Woof! 🐾")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

//we check to make sure config.json has all the required variables
checkConfig();

//prints login on console
console.log("Logging in...");
bot.login(config.token, function(err, token) {
    //we login but also check for error
    //if there's an error, we print the error to the console then exit
    if (err) {
        console.log(err);
        setTimeout(() => { process.exit(1); }, 2000);
    }
    //if there's no actual token, wha t the fuk me m8
    if (!token) {
        console.log("***failed to connect***");
        setTimeout(() => { process.exit(1); }, 2000);
    }
});

//this is some scheduling stuff, if you want to know how this works ask me l8r
var ruleTreats = new schedule.RecurrenceRule();
ruleTreats.hour = 16;
ruleTreats.minute = 2;

var treatReset = schedule.scheduleJob(ruleTreats, function() {
    let commandFile = require(`./commands/treat.js`);
    commandFile.reset(bot);
    console.log("Daily Treats Reset");

    let dailyFile = require(`./commands/daily.js`);
    dailyFile.reset(bot);
    console.log("Daily Cash Reset");

    let rateFile = require(`./commands/rate.js`);
    rateFile.reset(bot);
    console.log("Ratings Reset");
});

var ruleRep = new schedule.RecurrenceRule();
ruleRep.hour = 0;
ruleRep.minute = 0;
ruleRep.dayOfWeek = 0;

var repReset = schedule.scheduleJob(ruleRep, function() {
    let commandFile = require(`./commands/rep.js`);
    commandFile.reset(bot);
    console.log("Weekly Rep Reset");
})

/*============ENSTARS EVENT CHECKERS======*/

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]); // Note: months are 0-based
}

function eventChecker() {
    let present = new Date(Date.now() + 1000);

    let time = globals["event"].end;

    var joins = time.split(", ").join("-");

    let end = parseDate(joins);
    //console.log(end);

    let count = end - present;
    //console.log(count);

    if (globals["event"].end != "" && event == null && count > 60000) {

        console.log("new event starting");

        //let end = globals["event"].end.toString();
        let temp = globals["event"].end;
        //console.log(temp.toString());
        var parts = temp.split(", ").join("-");
        //console.log(parts);
        let stop = parseDate(parts);
        //console.log(end.toString());

        var date = new Date(stop);
        //console.log(date);

        event = schedule.scheduleJob(date, function() {
            let embed = new discord.RichEmbed();

            embed.setTitle("Event is Over!")
                .setColor(0xFFB400)
                .setDescription(globals["event"].name + " is now over!")
                .setImage(globals["event"].img)
                .setURL(globals["event"].url);

            for (var id in serverSettings) {
                if (serverSettings[id].notify && serverSettings[id] != "") {
                    //console.log(id);
                    let ch = serverSettings[id].notifyChannel;
                    bot.channels.get(ch).sendMessage('Event is now over!');
                    bot.channels.get(ch).sendEmbed(embed).catch(console.error);
                }
            }

            //console.log("test");

            globals["event"].end = "";

            fs.writeFile(globalsName, JSON.stringify((globals)), function(err) {
                if (err) return console.log(err);
                //console.log(JSON.stringify(file));
                console.log('resetting event end in ' + globalsName);
            });

            event.cancel();

            event = null;

            updateGlobals();

        });

        //console.log(date-457200000);
        if ((date - 457200000) > 60000) {

            half = schedule.scheduleJob(date - 457200000, function() {
                let embed = new discord.RichEmbed();

                embed.setTitle("Halfway is Here!")
                    .setColor(0xFFB400)
                    .setDescription(globals["event"].name + " is now at the halfway! That means the 3rd challenger is open and you receive daily sports drinks for the rest of the event!")
                    .setImage(globals["event"].img)
                    .setURL(globals["event"].url);

                for (var id in serverSettings) {
                    if (serverSettings[id].notify && serverSettings[id] != "") {
                        //console.log(id);
                        let ch = serverSettings[id].notifyChannel;
                        bot.channels.get(ch).sendMessage('Event halfway is here!');
                        bot.channels.get(ch).sendEmbed(embed).catch(console.error);
                    }
                }

                half.cancel();

                half = null;

            });
        }

        //console.log(date-86400000);

        if ((date - 86400000) > 60000) {

            last = schedule.scheduleJob(date - 86400000, function() {
                let embed = new discord.RichEmbed();

                embed.setTitle("Last day of Event!")
                    .setColor(0xFFB400)
                    .setDescription(globals["event"].name + " is now on it's last day! If you're ranking, keep an eye out for the last day rush!")
                    .setImage(globals["event"].img)
                    .setURL(globals["event"].url);

                for (var id in serverSettings) {
                    if (serverSettings[id].notify && serverSettings[id] != "") {
                        //console.log(id);
                        let ch = serverSettings[id].notifyChannel;
                        bot.channels.get(ch).sendMessage('Last day of event!');
                        bot.channels.get(ch).sendEmbed(embed).catch(console.error);
                    }
                }

                last.cancel();

                last = null;

            });
        }
    } else if (globals["event"].end != "" && event != null) {

        if (count < 1) {
            event = null;
            half = null;
            last = null;
            console.log("invalid end date, resetting");

            globals["event"].end = "";

            fs.writeFile(globalsName, JSON.stringify((globals)), function(err) {
                if (err) return console.log(err);
                //console.log(JSON.stringify(file));
                console.log('resetting event end in ' + globalsName);
            });

            updateGlobals();
        }
    }
}

function diaChecker(msg) {
    //for (var id in serverSettings) {
    let id = msg.guild.id;
    if (serverSettings[id].diaMade) {

        if (serverSettings[id].lastDiaMsg != "") {
            if (serverSettings[id].lastDiaMsg == msg.id) {
                console.log("dia expired");
                serverSettings[id].diaMade = false;

                serverSettings[id].lastDiaMsg = "";
                msg.delete(1000);
                updateServers();
                return;
            }

            return;
        }

        console.log("dia expired");
        serverSettings[id].diaMade = false;

        updateServers();
        return;
    }
    //}
}

function diaExpire() {
    for (var id in serverSettings) {
        if (serverSettings[id].diaMade) {

            if (serverSettings[id].lastDiaMsg != "") {
                console.log("dia expired");
                serverSettings[id].diaMade = false;

                serverSettings[id].lastDiaMsg = "";
                updateServers();
                return;
            }

            console.log("dia expired");
            serverSettings[id].diaMade = false;

            updateServers();
            return;
        }
    }
    return;
}

function bEventChecker() {
    let present = new Date(Date.now() + 1000);

    let time = globals["bEvent"].end;

    var joins = time.split(", ").join("-");

    let end = parseDate(joins);
    //console.log(end);

    let count = end - present;
    //console.log(count);

    if (globals["bEvent"].end != "" && bEvent == null && count > 60000) {

        console.log("new bandori event starting");

        //let end = globals["bEvent"].end.toString();
        let temp = globals["bEvent"].end;
        //console.log(temp.toString());
        var parts = temp.split(", ").join("-");
        //console.log(parts);
        let stop = parseDate(parts);
        //console.log(end.toString());

        var date = new Date(stop);
        //console.log(date);

        bEvent = schedule.scheduleJob(date, function() {
            let embed = new discord.RichEmbed();

            embed.setTitle("Event is Over!")
                .setColor(0xFFB400)
                .setDescription(globals["bEvent"].name + " is now over!")
                .setImage(globals["bEvent"].img)
                .setURL(globals["bEvent"].url);

            for (var id in serverSettings) {
                if (serverSettings[id].bNotify && serverSettings[id] != "") {
                    //console.log(id);
                    let ch = serverSettings[id].bNotifyChannel;
                    bot.channels.get(ch).sendMessage('Event is now over!');
                    bot.channels.get(ch).sendEmbed(embed).catch(console.error);
                }
            }

            //console.log("test");

            globals["bEvent"].end = "";

            fs.writeFile(globalsName, JSON.stringify((globals)), function(err) {
                if (err) return console.log(err);
                //console.log(JSON.stringify(file));
                console.log('resetting bandori event end in ' + globalsName);
            });

            bEvent.cancel();

            bEvent = null;

            updateGlobals();

        });

        //console.log(date-457200000);

        //console.log(date-86400000);

        if ((date - 86400000) > 60000) {

            bLast = schedule.scheduleJob(date - 86400000, function() {
                let embed = new discord.RichEmbed();

                embed.setTitle("Last day of Event!")
                    .setColor(0xFFB400)
                    .setDescription(globals["bEvent"].name + " is now on it's last day!")
                    .setImage(globals["bEvent"].img)
                    .setURL(globals["bEvent"].url);

                for (var id in serverSettings) {
                    if (serverSettings[id].bNotify && serverSettings[id] != "") {
                        //console.log(id);
                        let ch = serverSettings[id].bNotifyChannel;
                        bot.channels.get(ch).sendMessage('Last day of event!');
                        bot.channels.get(ch).sendEmbed(embed).catch(console.error);
                    }
                }

                bLast.cancel();

                bLast = null;

            });
        }
    } else if (globals["bEvent"].end != "" && bEvent != null) {

        if (count < 1) {
            bEvent = null;
            bLast = null;
            console.log("invalid bandori end date, resetting");

            globals["bEvent"].end = "";

            fs.writeFile(globalsName, JSON.stringify((globals)), function(err) {
                if (err) return console.log(err);
                //console.log(JSON.stringify(file));
                console.log('resetting bandori event end in ' + globalsName);
            });

            updateGlobals();
        }
    }
}

exports.eventReset = function() {
    event = null;
    half = null;
    last = null;
    console.log("event reset : " + event + half + last);
}

exports.bEventReset = function() {
    bEvent = null;
    bLast = null;
    console.log("bandori event reset : " + event + bEvent + bLast);
}

setInterval(() => {
    eventChecker();
    bEventChecker();
}, 30000);

/*setInterval(() => {
    diaExpire();
}, 600000);*/

/*===========EVENT HANDLER=============*/

//adds events as a directory, checks for files
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        // This loop reads the /events/ folder and attaches each event file to the appropriate event.
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `bot` var.
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});

//when we first join a server
bot.on("guildCreate", guild => {
    serverSettings[guild.id] = {
        "ignore": [],
        "banAlerts": false,
        "greet": false,
        "welcome": "Welcome $USER$ to $SERVER$!",
        "welcomeChannel": guild.defaultChannel.id,
        "notifyChannel": guild.defaultChannel.id,
        "treats": 0,
        "roles": [],
        "tags": false,
        "diaGen": false,
        "ignoreDiaCh": [],
        "diaChance": 3,
        "diaType": "Dia",
        "lastDia": 0,
        "diaMade": false,
        "lastDiaMsg": "",
        "enstars": false,
        "notify": false,
        "eNotifyChannel": guild.defaultChannel.id,
        "bandori": false,
        "bNotify": false,
        "bNotifyChannel": guild.defaultChannel.id,
        "gbf": false,
        "gNotify": false,
        "gNotifyChannel": guild.defaultChannel.id,
        "sino": false,
        "sNotify": false,
        "sNotifyChannel": guild.defaultChannel.id
    }
    quotes[guild.id] = {
        "quotes": []
    }
    weeb[guild.id] = {
        "weeb": []
    }
    console.log("Added server \'" + guild.name + "\' to the servers and quotes/weeb list.  ID: " + guild.id);
    updateServers();
    updateQuotes();
    updateWeeb();

    let embed = new discord.RichEmbed();
    embed.setTitle("Hi! I'm DaikichiBot!")
        .setColor(0xFFB6C1)
        .setDescription("I'm a custom bot created by <@108752547166031872> for use by the /r/EnsembleStars discord! Feel free to pet me and give me lots of love! 💕")
        .setThumbnail("http://i.imgur.com/nRleyfl.png");
    guild.defaultChannel.sendEmbed(embed).catch(console.error);
});

//when we leave a server
bot.on("guildDelete", guild => {

    delete serverSettings[guild.id];
    delete quotes[guild.id];
    delete weeb[guild.id];
    console.log("Deleted server \'" + guild.name + "\' from the servers list.  ID: " + guild.id);

    updateServers();
    updateQuotes();
    updateWeeb();
});

function updateServers() {
    fs.writeFile(__dirname + '/db/servers-temp.json', JSON.stringify(serverSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/servers-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented servers from being overwritten');
                else {
                    fs.rename(__dirname + '/db/servers-temp.json', __dirname + '/db/servers.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}

function updateGlobals() {
    fs.writeFile(__dirname + '/db/globals-temp.json', JSON.stringify(globals, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/globals-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented globals from being overwritten');
                else {
                    fs.rename(__dirname + '/db/globals-temp.json', __dirname + '/db/globals.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}

function updateUsers() {
    fs.writeFile(__dirname + '/db/users-temp.json', JSON.stringify(userSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/users-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented users from being overwritten');
                else {
                    fs.rename(__dirname + '/db/users-temp.json', __dirname + '/db/users.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}

function updateQuotes() {
    fs.writeFile(__dirname + '/db/quotes-temp.json', JSON.stringify(quotes, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/quotes-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented quotes from being overwritten');
                else {
                    fs.rename(__dirname + '/db/quotes-temp.json', __dirname + '/db/quotes.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    });
}

function updateWeeb() {
    fs.writeFile(__dirname + '/db/weeb-temp.json', JSON.stringify(weeb, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/weeb-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented weeb from being overwritten');
                else {
                    fs.rename(__dirname + '/db/weeb-temp.json', __dirname + '/db/weeb.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    });
}

function checkIgnore(bot, msg) {
    let channel = msg.channel;

    let check = -1;
    for (var i = serverSettings[msg.guild.id].ignore.length - 1; i >= 0; i--) {
        if (channel.id === serverSettings[msg.guild.id].ignore[i]) {
            check = i;
        }
    }

    if (check < 0) {
        //console.log("not ignored");
        return false;
    } else {
        //console.log("ignored");
        return true;
    }
}

function checkDiaIgnore(bot, msg) {
    let channel = msg.channel;

    let check = -1;
    for (var i = serverSettings[msg.guild.id].ignoreDiaCh.length - 1; i >= 0; i--) {
        if (channel.id === serverSettings[msg.guild.id].ignoreDiaCh[i]) {
            check = i;
        }
    }

    if (check < 0) {
        //console.log("not ignored");
        return false;
    } else {
        //console.log("ignored");
        return true;
    }
}

function guildChecker(msg) {
    serverSettings[msg.channel.guild.id] = {
        "ignore": [],
        "banAlerts": false,
        "greet": false,
        "welcome": "Welcome $USER$ to $SERVER$!",
        "welcomeChannel": guild.defaultChannel.id,
        "notifyChannel": guild.defaultChannel.id,
        "treats": 0,
        "roles": [],
        "tags": false,
        "diaGen": false,
        "ignoreDiaCh": [],
        "diaChance": 3,
        "diaType": "Dia",
        "lastDia": 0,
        "diaMade": false,
        "lastDiaMsg": "",
        "enstars": false,
        "notify": false,
        "eNotifyChannel": guild.defaultChannel.id,
        "bandori": false,
        "bNotify": false,
        "bNotifyChannel": guild.defaultChannel.id,
        "gbf": false,
        "gNotify": false,
        "gNotifyChannel": guild.defaultChannel.id,
        "sino": false,
        "sNotify": false,
        "sNotifyChannel": guild.defaultChannel.id
    }

    console.log("Added server \'" + msg.channel.guild.name + "\' to the servers list.  ID: " + msg.channel.guild.id);
    updateServers();
}

function userChecker(msg) {
    userSettings[msg.author.id] = {
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
        "rep": 0,
        "style": 1,
        "fontOne": "",
        "fontTwo": "",
        "fontThree": ""
    }

    console.log("Added user \'" + msg.author.username + "\' to the users list.  ID: " + msg.author.id);
    updateUsers();
}

/*=========MSG/CMD HANDLER==============*/

//we put the message event handler in here so we can handle everything thru it idk why i just yeah
bot.on("message", msg => {
    //bot doesn't respond to it's own messages
    if (msg.author.id == bot.user.id) return;

    if (!userSettings.hasOwnProperty(msg.author.id)) {
        userChecker(msg);
    }

    if (msg.channel.type != "dm" && msg.channel.type != "group") {
        if (!serverSettings.hasOwnProperty(msg.channel.guild.id)) {
            guildChecker(msg);
        }
        if (!quotes.hasOwnProperty(msg.channel.guild.id)) {
            quotes[guild.id] = {
                "quotes": []
            }
            updateQuotes();
        }
        if (!weeb.hasOwnProperty(msg.channel.guild.id)) {
            weeb[guild.id] = {
                "weeb": []
            }
            updateWeeb();
        }
    }

    //if the channel is on the ignore list and ur not an admin
    if (msg.channel.type != "dm" && msg.channel.type != "group") {
        if (checkIgnore(bot, msg) && !msg.content.startsWith(config.mod_prefix)) return;
    }

    //if the msg is a dm
    if (msg.channel.type == "dm" || msg.channel.type == "group") {
        //if doesn't start with a command prefix and mod prefix and eval
        if (!msg.content.startsWith(config.prefix) && !msg.content.startsWith(config.mod_prefix) && !msg.content.startsWith("b!")) {
            if (/^(help|how do I use this\??)$/i.test(msg.content)) {
                let help = require('./commands/help.js');
                let args = "";
                help.run(bot, msg, args);
                return;
                //always put a return!!  this way it doesn't just go str8 to the bottom

            }
            //cleverbot(bot, msg);
            //if we had cleverbot in this bot, obv
            let embed = new discord.RichEmbed();
            //declaring a new embed!
            embed.setTitle("Daikichi says:")
                .setColor(0xFFB6C1)
                .setDescription(boofs[Math.floor(Math.random() * (boofs.length))])
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            //this kinda looks funky but it works as a giant method, discord.js makes setting up embeds ez
            //also for Description, i've set it to randomize a number and then use that number to generate what the bot says in return
            //this is b/c there's no cleverbot for dogs
            //bork
            msg.channel.sendEmbed(embed).catch(console.error);
            //catch the error in case something goes wrong!
            return;
        }
    }

    //iff the message is in a server and is not a command
    if (!msg.content.startsWith(config.prefix) && !msg.content.startsWith(config.mod_prefix) && !msg.content.startsWith("b!")) {
        //generate dia
        if (msg.channel.type != "dm" && msg.channel.type != "group") {
            if (!(serverSettings[msg.channel.guild.id].diaMade) && serverSettings[msg.channel.guild.id].diaGen) {

                if (!checkDiaIgnore(bot, msg)) {

                    let rand = Math.floor(Math.random() * 100);

                    if (rand < serverSettings[msg.channel.guild.id].diaChance) {
                        let dia = Math.floor(Math.random() * 20) + 5;
                        serverSettings[msg.channel.guild.id].lastDia += dia;
                        serverSettings[msg.channel.guild.id].diaMade = true;
                        let embed = new discord.RichEmbed();
                        embed.setColor(0x753FCF)
                            .setDescription(serverSettings[msg.channel.guild.id].lastDia + " " + serverSettings[msg.channel.guild.id].diaType + " has appeared!  Type `!pick` to pick it up!");
                        msg.channel.sendEmbed(embed).then(function(m) {
                            serverSettings[msg.channel.guild.id].lastDiaMsg = m.id;
                            updateServers();
                            setTimeout(() => {
                                diaChecker(m);
                            }, 600000);
                        }).catch(console.error);
                    }
                }

            }
        }

        //if bot is pinged
        //if you ask why there are two startsWith <@, it's because <@id> is without nickname, and <@!id> is with nickname!
        if (msg.isMentioned(bot.user) && (msg.content.startsWith("<@" + bot.user.id) || msg.content.startsWith("<@!" + bot.user.id))) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Daikichi says:")
                .setColor(0xFFB6C1)
                .setDescription(boofs[Math.floor(Math.random() * (boofs.length))])
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
        }

        //================chat listeners-==============================

        //=================enstars specific============================

        if (serverSettings[msg.channel.guild.id].enstars) {

            if (msg.content.toLowerCase().indexOf("when") > -1 && (msg.content.toLowerCase().indexOf("gacha") > -1 || msg.content.toLowerCase().indexOf("scout") > -1) && msg.content.toLowerCase().indexOf("announc") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("The gacha is announced **24 hours after the new event** is announced!\n\nIt occurs at **11PM PST / 2AM EST / 7AM GMT / 3PM JST!**")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("when") > -1 && msg.content.toLowerCase().indexOf("event") > -1 && msg.content.toLowerCase().indexOf("announc") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("The next event is announced **24 hours after revivals open** / **the day after the previous event ends**!\n\nIt occurs at **11PM PST / 2AM EST / 7AM GMT / 3PM JST!**")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("when") > -1 && msg.content.toLowerCase().indexOf("item") > -1 && msg.content.toLowerCase().indexOf("expire") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("Items in your giftbox expire 30 days upon entering the giftbox. Items on the events rewards page expire before the next event, according to whatever time is on the event rewards page. Items accepted from your giftbox expire either at the end of an event, or the beginning of the next event.")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("when") > -1 && (msg.content.toLowerCase().indexOf("gacha") > -1 || msg.content.toLowerCase().indexOf("scout") > -1 || msg.content.toLowerCase().indexOf("event") > -1) && msg.content.toLowerCase().indexOf("open") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("It opens at **11PM PST / 2AM EST / 7AM GMT / 3PM JST** on the date announced!")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("where is tsumugi?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Tsumugi is...")
                    .setColor(0xB48CF0)
                    .setDescription("Throwing eggs at people.")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("where is tetora?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Tetora is...")
                    .setColor(0xB48CF0)
                    .setDescription("Here he is!  (With his  new card!)")
                    .setImage("https://pbs.twimg.com/media/C4gdyIBUMAEVhso.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("when") > -1 && msg.content.toLowerCase().indexOf("revival") > -1 && (msg.content.toLowerCase().indexOf("open") > -1 || msg.content.toLowerCase().indexOf("start") > -1) && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("Revivals open **17 hours after** the current event ends at **11PM PST / 2AM EST / 7AM GMT / 3PM JST**!")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }
            if (((msg.content.toLowerCase().indexOf("what") > -1) || (msg.content.toLowerCase().indexOf("schedule") > -1)) && msg.content.toLowerCase().indexOf("daily") > -1 && msg.content.toLowerCase().indexOf("course") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("In JST:\n\n**Monday:** Trickstar (Yellow)\n**Tuesday:** Ryuseitai (Red)\n**Wednesday:** UNDEAD (Blue)\n**Thursday:** Knights (Yellow)\n**Friday:** Akatsuki/2wink (Red)\n**Saturday:** Ra*bits/Valkyrie (Blue)\n**Sunday:** fine/Switch (Double EXP)")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("announc") > -1 && msg.content.toLowerCase().indexOf("schedule") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Daikichi says:")
                    .setColor(0xB48CF0)
                    .setDescription("**Revivals / Possible Story Scout:** 17 hrs after event end\n**Event Announcement:** 24 hrs after Revivals open\n**Gacha Announcement:** 24 hrs after Event Announcement")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (((msg.content.toLowerCase().indexOf("jewel") > -1) || (msg.content.toLowerCase().indexOf("gem") > -1) || (msg.content.toLowerCase().indexOf("card") > -1)) && msg.content.toLowerCase().indexOf("skill") > -1 && msg.content.toLowerCase().indexOf("what") > -1 && msg.content.toLowerCase().indexOf("trans") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Click here for the full Jewel Skill Guide:")
                    .setColor(0xB48CF0)
                    .setURL("https://docs.google.com/document/d/1SPnw-AE9MapcyAwm1VkriS1VgExTRyZ7n9nN070Ew3A/pub")
                    .setDescription("赤 = Red\n青 = Blue\n黄 = Yellow\n全 = All\n小 = Small\n中 = Medium\n大 = Large\nジュエル = Jewel\nフィーバー上昇割合が = Fever Up\n全員の信頼度上昇率が = Trust Up")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("luck") > -1 && msg.content.toLowerCase().indexOf("what") > -1 && msg.content.toLowerCase().indexOf("do") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Click here for the Master Guide!")
                    .setColor(0xB48CF0)
                    .setURL("http://ensemble-stars.wikia.com/wiki/Ensemble_Stars!_Master_Guide")
                    .setDescription("The higher your luck, the more Trust increases. There is also a chance that more mini-events will appear.")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("master") > -1 && msg.content.toLowerCase().indexOf("guide") > -1 && msg.content.toLowerCase().indexOf("link") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Click here for the Master Guide!")
                    .setColor(0xB48CF0)
                    .setURL("http://ensemble-stars.wikia.com/wiki/Ensemble_Stars!_Master_Guide")
                    .setDescription("Click here to check out a lot of info!.")
                    .setThumbnail("http://i.imgur.com/nRleyfl.png");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

        }

        //======================bandori===============================

        if (serverSettings[msg.channel.guild.id].bandori) {

            if ((msg.content.toLowerCase().indexOf("what") > -1 || msg.content.toLowerCase().indexOf("which") > -1 ) > -1 && msg.content.toLowerCase().indexOf("item") > -1 && (msg.content.toLowerCase().indexOf("attribute") > -1 || msg.content.toLowerCase().indexOf("boost")) > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Attribute Items")
                    .setColor(0xB48CF0)
                    .setDescription("Pure = Fountain / Fruit Tart\nCool = Pool / Fruit Bowl\nHappy = Michelle Statue / Macaron Tower\nPowerful = Coconut Palm Tree / Spaghetti")
                    .setThumbnail("http://i.imgur.com/408QceQ.png")
                    .setURL("http://bangdreaming.tumblr.com/band");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("master") > -1 && (msg.content.toLowerCase().indexOf("guide") > -1 || msg.content.toLowerCase().indexOf("post") > -1) && msg.content.toLowerCase().indexOf("link") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Bandori Help Masterpost:")
                    .setColor(0xB48CF0)
                    .setDescription("Click here to go to the Bandori help masterpost!")
                    .setThumbnail("http://i.imgur.com/408QceQ.png")
                    .setURL("http://bangdreaming.tumblr.com/start");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

            if (msg.content.toLowerCase().indexOf("event") > -1 && msg.content.toLowerCase().indexOf("guide") > -1 && msg.content.toLowerCase().indexOf("?") > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("Bandori Event Guide:")
                    .setColor(0xB48CF0)
                    .setDescription("Click here to go to the Bandori event guide!")
                    .setThumbnail("http://i.imgur.com/408QceQ.png")
                    .setURL("http://bangdreaming.tumblr.com/eventguide");
                msg.channel.sendEmbed(embed).catch(console.error);
            }

        }

        //=====================non specific===========================

        if (msg.content.toLowerCase().indexOf("faggot") > -1 || msg.content.toLowerCase().indexOf("retard") > -1) {

            let embed = new discord.RichEmbed();
            embed.setTitle("Daikichi says:")
                .setColor(0x3399FF)
                .setDescription("Please don't use offensive language in this server.")
                .setThumbnail("http://i.imgur.com/nRleyfl.png");
            msg.channel.sendEmbed(embed).catch(console.error);
            msg.delete()
                .then(msg => console.log(`Deleted message from ${msg.author} for slurs`))
                .catch(console.error);
        }

        if (msg.content.toLowerCase() == "/o/") {

            msg.channel.sendMessage("\\o\\");
        }

        if (msg.content.toLowerCase() == "\\o\\") {

            msg.channel.sendMessage("/o/");
        }


        /*if (msg.content.toLowerCase() == "hg me is a damn fool") {
            //let id;
            //let embed = new discord.RichEmbed();
            //embed.setDescription("tester");
            //msg.channel.sendEmbed(embed).catch(console.error);

            //msg.channel.fetchMessages({ limit: 4 })
            //    .catch(console.error);
            //let id = bot.lastMessageID;
            for(var id in userSettings){
                userSettings[id].fontOne = "";
                userSettings[id].fontTwo = "";
                userSettings[id].fontThree = "";
            }

            updateUsers();
        }*/
        //============================im too lazy to make it nice========================================================
        return;
    }

    //if the message starts w mod prefix
    if (msg.content.startsWith(config.mod_prefix) && msg.channel.type != "dm" && msg.channel.type != "group") {

        //let's define the admin role!
        let adminRole = msg.guild.roles.find("name", config.mod_role);

        if (typeof adminRole == 'undefined' || adminRole == null) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Please set a role to `" + config.mod_role + "` in order to use mod commands!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(5000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        //if ur in the admin role or if ur the admin themself
        if (msg.guild.member(msg.author.id).roles.has(adminRole.id) || msg.author.id == config.admin_id) {
            let mCommand = msg.content.split(" ")[0];
            mCommand = mCommand.slice(config.mod_prefix.length);
            mCommand = mCommand.toLowerCase();

            let mArgs = msg.content.split(" ").slice(1);

            try {
                let mCommandFile = require(`./admin/${mCommand}.js`)
                mCommandFile.run(bot, msg, mArgs)
            } catch (e) {
                console.log("command not found");

                msg.channel.sendEmbed(commError).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
            }
            return;
        }

        //if ur a scrub aka not a mod aka not me
        else {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You do not have the proper rank to access this! Grrr... 🐾")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }
    } else if ((msg.content.startsWith(config.mod_prefix + "event") || msg.content.startsWith(config.mod_prefix + "gachas")) && msg.author.id == config.admin_id) {
        let mCommand = msg.content.split(" ")[0];
        mCommand = mCommand.slice(config.mod_prefix.length);
        mCommand = mCommand.toLowerCase();

        let mArgs = msg.content.split(" ").slice(1);

        try {
            let mCommandFile = require(`./admin/${mCommand}.js`)
            mCommandFile.run(bot, msg, mArgs)
        } catch (e) {
            console.log("command not found");

            msg.channel.sendEmbed(commError).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
        }
        return;
    } else if (msg.content.startsWith(config.mod_prefix) && (msg.channel.type == "dm" || msg.channel.type == "group")) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use this command in a server, not a DM!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    //====================================================================================================

    //bot ignores blacklisted ppl

    if (userSettings[msg.author.id].botIgnore) return;

    if (recentComm.includes(msg.author.id)) {
        let embed = new discord.RichEmbed();
        embed.setColor(0xFF0040)
            .setDescription("Please wait!  The command cooldown is 2 seconds!");
        msg.channel.sendEmbed(embed).then(m => m.delete(2000)).catch(console.error);
        msg.delete(1000);
        return;
    }

    if (msg.content.startsWith("b!")) {

        let bCommand = msg.content.split(" ")[0];
        bCommand = bCommand.slice(2);
        bCommand = bCommand.toLowerCase();

        let bArgs = msg.content.split(" ").slice(1);

        console.log(msg.author + " : " + msg);

        try {
            let bCommandFile = require(`./bandori/${bCommand}.js`)
            bCommandFile.run(bot, msg, bArgs)

            recentComm.push(msg.author.id);
            setTimeout(() => {
                let index = recentComm.indexOf(msg.author.id);
                // Removes the user from the array after 2.5 seconds
                recentComm.splice(index, 1);
            }, 2000);
            return;
        } catch (e) {
            //console.log(e);
            console.log("COMMAND NOT FOUND : " + bCommand);
            console.log(e);

            //msg.channel.sendEmbed(commError).catch(console.error);
            return;
        }
        return;

    }

    let command = msg.content.split(" ")[0];
    //command is whatever you put in like !help
    command = command.slice(config.prefix.length);
    command = command.toLowerCase();
    //it splits off the prefix so it becomes like help

    let args = msg.content.split(" ").slice(1);
    //this is whatever the following things are stored in an array, useful for multiple searchs

    console.log(msg.author + " : " + msg);

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, msg, args);

        //cooldown duder
        recentComm.push(msg.author.id);
        setTimeout(() => {
            let index = recentComm.indexOf(msg.author.id);
            // Removes the user from the array after 2.5 seconds
            recentComm.splice(index, 1);
        }, 2000);
    } catch (e) {
        //console.log(e);
        console.log("COMMAND NOT FOUND : " + command);
        console.log(e);

        //msg.channel.sendEmbed(commError).catch(console.error);
    }

});

/*==============FUNCTIONS==============*/

function checkConfig() {
    //simple config check, sends the console an error if some shit goes down
    if (config.token === null) { console.log("***ERROR: Token not defined!***"); }
    if (config.prefix === null || config.prefix.length !== 1) { console.log("***ERROR: Prefix either not defined or more than one character!***"); }
    if (config.mod_prefix === null || config.mod_prefix.length !== 1) { console.log("***ERROR: Mod prefix either not defined or more than one character!***"); }
    if (config.admin_id === null) { console.log("***ERROR: Admin user's id not defined in config!***"); }
}
