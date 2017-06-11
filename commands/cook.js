const discord = require("discord.js");
var fs = require("fs");

var usersName = "../db/users.json";
var userSettings = require(usersName);

var serversName = "../db/servers.json";
var serverSettings = require(serversName);

var dishes = require("./food/food.json")

var games = {};
const food = [
    ["apple", "🍎"], ["orange", "🍊"], ["lemon", "🍋"], ["banana", "🍌"], ["grape", "🍇"],[ "strawberry", "🍓"], ["melon", "🍈"], ["cherry", "🍒"], ["peach", "🍑"], ["pineapple", "🍍"], ["tomato", "🍅"], ["eggplant", "🍆"], ["pepper", "🌶️"], ["corn", "🌽"], ["yam", "🍠"], ["cheese", "🧀"], ["rice", "🍚"], ["choco", "🍫"], ["cucumber", "🥒"], ["potato", "🥔"], ["carrot", "🥕"], ["egg", "🥚"], ["milk", "🥛"], ["fish", "🐟"], ["mushroom", "🍄"],[ "chicken", "🍗"], ["meat", "🍖"]
]

exports.run = (bot, msg, args) => {

    let bet;

    if (msg.channel.type == "dm" || msg.channel.type == "group") {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use this command in a server, not a DM!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args.length < 1) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use the format `!cook [bet/all]`!");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    if (isNaN(args[0]) && args[0].toLowerCase() != "all") {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please bet a valid number or all!");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        
        return;
    }

    if (args[0].toLowerCase() != "all" && ( parseInt(args[0]) < 10 ) ) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please bet above 10!");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }

    if (args[0].toLowerCase() == "all") {
        bet = userSettings[msg.author.id].dia;
        //console.log(bet);
    }

    if (!isNaN(args[0]) && parseInt(args[0]) > 9) {
        bet = parseInt(args[0]);
        //console.log(bet);
    }

    if (userSettings[msg.author.id].dia < bet) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You don't have enough to cook!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    }


    if (games.hasOwnProperty(msg.channel.id)) {
        //checking if a game already is queued
        let check = -1;
        //console.log(games[msg.channel.id].players[0][0]);
        for (var i = 0; i < games[msg.channel.id].players.length; i++) {
            if (games[msg.channel.id].players[i][0] == msg.author.id) {
                check = i;
            }
        }

        if (check > -1) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("You're already in the contest!");
            msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);
            msg.delete(1500);
            return;
        }

        if (check == -1) {
            //if user isn't in
            let num = Math.floor(Math.random() * food.length);
            //games[msg.channel.id].players[msg.author.id] = [food[num][0], food[num][1], bet];
            games[msg.channel.id].players.push([msg.author.id, food[num][0], food[num][1], bet ]);

            let embed = new discord.RichEmbed();
            embed.setTitle("Cooking Contest!")
                .setColor(0xFF3232)
                .setDescription("**" + msg.author.username + "** joined with " + food[num][1] + " and bet **" + bet + serverSettings[msg.channel.guild.id].diaType + "**!");
            msg.channel.sendEmbed(embed).catch(console.error);

            userSettings[msg.author.id].dia -= parseInt(bet);

            updateUsers();

            //console.log(games);
            return;
        }
        console.log("channel already in");
        return;
    }

    games[msg.channel.id] = {
        "contestOn": false,
        "players": []
    };

    let num = Math.floor(Math.random() * food.length);
    games[msg.channel.id].players.push([msg.author.id, food[num][0], food[num][1], bet ]);

    let embed = new discord.RichEmbed();
    embed.setTitle(msg.author.username + " has started a Cooking Contest!")
        .setColor(0xFF3232)
        .setDescription("Type `!cook [bet/all]` to join!")
        .setFooter("Contest starts in 30 seconds.");
    msg.channel.sendEmbed(embed).catch(console.error);

    let join = new discord.RichEmbed();
    join.setTitle("Cooking Contest!")
        .setColor(0xFF3232)
        .setDescription("**" + msg.author.username + "** joined with " + food[num][1] + " and bet **" + bet + serverSettings[msg.channel.guild.id].diaType + "**!");
    msg.channel.sendEmbed(join).catch(console.error);

    userSettings[msg.author.id].dia -= parseInt(bet);

    updateUsers();

    setTimeout(() => {
        if (Object.keys(games[msg.channel.id].players).length > 1) {

            let testArray = {
                "contestOn": false,
                "players": [
                    ['john', 'egg', '🥚', 10 ],
                    ['161882610652545024', 'pineapple', '🍍', 10 ],
                    ['steven', 'apple', '🥚', 10 ],
                    ['jonna', 'peach', '🥚', 10 ]
                ]
            };

            startCooking(bot, msg, games[msg.channel.id], msg.channel.id);
            //startCooking(bot, msg, testArray, msg.channel.id);
            return;
        }

        let embed = new discord.RichEmbed();
        embed.setTitle("Oh well...")
            .setColor(0xFF0040)
            .setDescription("Not enough people joined the contest!");
        msg.channel.sendEmbed(embed).catch(console.error);
        
        console.log("deleting " + msg.channel.id + " from contests");

        userSettings[msg.author.id].dia += parseInt(bet);

        updateUsers();

        delete games[msg.channel.id];

        return;

    }, 30000);

}

exports.help = (bots, msg, args) => {
    return "To start a cooking contest, use `!cook [bet/all]`!  To join an already existing cooking contest, use `!cook [bet/all]` to enter in.  Bets must be at least 10.  Winner takes all!";
}

//===============================FUNCTIONS====================================

function startCooking(bot, msg, list, id) {
    //console.log(list.players);
    //console.log(list.players[0][0]);
    //console.log(Object.keys(list.players)[0]);
    let randomed = shuffle(list.players);
    //console.log(randomed);
    let names = [];
    genResults(bot, msg, randomed, id, names, 0);
}

function genResults(bot, msg, list, id, names, count) {

    if (count < list.length) {
        bot.fetchUser(list[count][0]).then(function(user) {
            //console.log(user.username);
            names[count] = user.username;
            genResults(bot, msg, list, id, names, count+1)
            return;
        }).catch(console.error);
        return;
    }

    pushDishes(bot, msg, list, id, names);
}

function pushDishes(bot, msg, list, gID, names) {

    let dish = [];

    for (var i = 0; i < list.length; i++) {
        let str = list[i][1];
        //console.log(dishes[str]);
        //console.log(dishes[str][Math.floor(Math.random()*dishes[str].length)]);
        dish[i] = dishes[str][Math.floor(Math.random()*dishes[str].length)];

        if(i == (list.length-1)) {
            pushResults(bot, msg, list, gID, names, dish);
        }
    }

}

function pushResults(bot, msg, list, gID, names, dish) {
    let embed = new discord.RichEmbed();
    embed.setTitle("Cooking Contest Results!")
        .setColor(0xFF3232)
        .setDescription("With " + list.length + " participants!");
    msg.channel.sendEmbed(embed).catch(console.error);
    let toSend = [];
    toSend.push("```ruby");
    for (var i = 0; i < list.length; i++) {
        if ( i == (list.length-1)) {
            toSend.push("[" + (i+1) + "] " + names[i] + " with dish: " + dish[i] + "!" + list[i][2]);
            toSend.push("```");
            msg.channel.sendMessage(toSend).catch(console.error);

            updateDia(bot, msg, list, gID, dish[0]);
        }
        else {
            toSend.push("[" + (i+1) + "] " + names[i] + " with dish: " + dish[i] + "!" + list[i][2]);
        }
    }
}

function updateDia(bot, msg, list, gID, dish) {
    let sum = 0;

    for (var i = 0; i < list.length; i++) {
        sum += parseInt(list[i][3]);
    }

    userSettings[list[0][0]].dia += sum;

    let win = new discord.RichEmbed();
    win.setTitle("Cooking Contest Winner!")
        .setColor(0xFF3232)
        .setDescription("<@" + list[0][0] + "> won with **" + dish + "** and received **" + sum + serverSettings[msg.channel.guild.id].diaType + "!**");
    msg.channel.sendEmbed(win).catch(console.error);

    delete games[msg.channel.id];

    updateUsers();

}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function updateUsers() {
    fs.writeFile(__dirname + '/../db/users-temp.json', JSON.stringify(userSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/users-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented users from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/users-temp.json', __dirname + '/../db/users.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}