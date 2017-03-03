const discord = require("discord.js");

var usersName = "../db/users.json";
var userSettings = require(usersName);

exports.run = (bot, msg, args) => {

    if (msg.channel.type == "dm" || msg.channel.type == "group") {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use this command in a server, not a DM!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args.length == 1) {
    	if (args[0].toLowerCase() == "rep") {
            guildSortRep(bot, msg, "Server", "Rep");
            return;
        }
        if (args[0].toLowerCase() == "cash") {
            guildSort(bot, msg, "Server", "Cash");
            return;
        }
    }

    if (args.length > 1) {
        if (args[0].toLowerCase() == "server" && args[1].toLowerCase() == "cash") {
            guildSort(bot, msg, "Server", "Cash");
            return;
        }
        if (args[0].toLowerCase() == "server" && args[1].toLowerCase() == "rep") {
            guildSortRep(bot, msg, "Server", "Rep");
            return;
        }
        if (args[0].toLowerCase() == "global" && args[1].toLowerCase() == "rep") {
            let rep = [];
            for (var id in userSettings) {
                rep.push([id, userSettings[id].rep]);
            }
            rep.sort(function(a, b) {
                return b[1] - a[1]
            });
            genList(bot, msg, "Global", "Rep", rep.splice(0, 10));
            return;
        }
    }

    let cash = [];
    for (var id in userSettings) {
        cash.push([id, userSettings[id].dia]);
    }
    cash.sort(function(a, b) {
        return b[1] - a[1]
    });
    //console.log(cash.splice(0, 10));
    genList(bot, msg, "Global", "Cash", cash.splice(0, 10));
}

exports.help = (bots, msg, args) => {
    return "To get the top 10 rankings, you can use `!rank [server/global] [rep/cash]`.\nThe default is rankings for global cash.";
}

function guildSort(bot, msg, type, cred, gID) {
    let users = [];
    for (var help in userSettings) {
        if (msg.guild.member(help) != null) {
            users.push([help, userSettings[help].dia]);
        }
    }
    users.sort(function(a, b) {
        return b[1] - a[1]
    });
    //console.log(users.splice(0, users.length));
    genList(bot, msg, type, cred, users.splice(0, users.length));
}

function guildSortRep(bot, msg, type, cred, gID) {
    let users = [];
    for (var help in userSettings) {
        if (msg.guild.member(help) != null) {
            users.push([help, userSettings[help].rep]);
        }
    }
    users.sort(function(a, b) {
        return b[1] - a[1]
    });
    //console.log(users.splice(0, users.length));
    genList(bot, msg, type, cred, users.splice(0, users.length));
}

function genList(bot, msg, type, cred, list) {

    var names = [];

    bot.fetchUser(list[0][0]).then(function(user) {
        names[0] = user.username;
        if (list.length == 1) {
            pushList(bot, msg, type, cred, names, list);
            return;
        }
        bot.fetchUser(list[1][0]).then(function(user) {
            names[1] = user.username;
            if (list.length == 2) {
                pushList(bot, msg, type, cred, names, list);
                return;
            }
            bot.fetchUser(list[2][0]).then(function(user) {
                names[2] = user.username;
                if (list.length == 3) {
                    pushList(bot, msg, type, cred, names, list);
                    return;
                }
                bot.fetchUser(list[3][0]).then(function(user) {
                    names[3] = user.username;
                    if (list.length == 4) {
                        pushList(bot, msg, type, cred, names, list);
                        return;
                    }
                    bot.fetchUser(list[4][0]).then(function(user) {
                        names[4] = user.username;
                        if (list.length == 5) {
                            pushList(bot, msg, type, cred, names, list);
                            return;
                        }
                        bot.fetchUser(list[5][0]).then(function(user) {
                            names[5] = user.username;
                            if (list.length == 6) {
                                pushList(bot, msg, type, cred, names, list);
                                return;
                            }
                            bot.fetchUser(list[6][0]).then(function(user) {
                                names[6] = user.username;
                                if (list.length == 7) {
                                    pushList(bot, msg, type, cred, names, list);
                                    return;
                                }
                                bot.fetchUser(list[7][0]).then(function(user) {
                                    names[7] = user.username;
                                    if (list.length == 8) {
                                        pushList(bot, msg, type, cred, names, list);
                                        return;
                                    }
                                    bot.fetchUser(list[8][0]).then(function(user) {
                                        names[8] = user.username;
                                        if (list.length == 9) {
                                            pushList(bot, msg, type, cred, names, list);
                                            return;
                                        }
                                        bot.fetchUser(list[9][0]).then(function(user) {
                                            names[9] = user.username;
                                            pushList(bot, msg, type, cred, names, list);
                                        }).catch(console.error);
                                    }).catch(console.error);
                                }).catch(console.error);
                            }).catch(console.error);
                        }).catch(console.error);
                    }).catch(console.error);
                }).catch(console.error);
            }).catch(console.error);
        }).catch(console.error);
    }).catch(console.error);

}

function pushList(bot, msg, type, cred, names, list) {
    //console.log(names);
    //console.log(list);
    let toSend = [];

    toSend.push("**Rankings for " + cred + "** (" + type + ")");
    toSend.push("```ruby");

    for (var i = 0; i < names.length; i++) {
    	
        toSend.push("[" + (i + 1) + "] " + names[i] + " | " + cred + ": " + list[i][1]);
        if (i == names.length-1) {
        	toSend.push("```");
        	msg.channel.sendMessage(toSend).catch(console.error);
        }
    }

}
