var request = require("superagent");
const discord = require("discord.js");

var Ratings = {};

exports.run = (bot, msg, args) => {

    var name;

    if (args.length < 1) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use the format `!rate <user>`.")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (msg.mentions.users.size > 1) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You can't rate multiple people!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (msg.mentions.users.first() === bot.user || args.join(" ").trim().toLowerCase() == bot.user.username.toLowerCase() || args.join(" ").trim().toLowerCase() == "daikichi" || args.join(" ").trim().toLowerCase() == "daikichi bot") {
        //console.log( "I'd rate myself **10/10**");
        let embed = new discord.RichEmbed();
        embed.setTitle("Rating:")
            .setColor(0xFF69B4)
            .setDescription("I'd rate myself **10/10**!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (msg.mentions.users.size == 1) {
        name = msg.mentions.users.first().username;

        if (Ratings.hasOwnProperty(name.toLowerCase())) {

            let embed = new discord.RichEmbed();
            embed.setTitle("Rating:")
                .setColor(0xFF69B4)
                .setDescription("I've rated **" + name + "** a **" + Ratings[name.toLowerCase()] + "/10**!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);

        } else {

            let embed = new discord.RichEmbed();
            embed.setTitle("Rating:")
                .setColor(0xFF69B4)
                .setDescription("I'd rate **" + name + "** a **" + generateUserRating(bot, msg, msg.mentions.users.first()) + "/10**!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
        }

    } else if (args.length > 0) {
        name = args.join(" ");

        if (Ratings.hasOwnProperty(name.toLowerCase())) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Rating:")
                .setColor(0xFF69B4)
                .setDescription("I've rated **" + name + "** a **" + Ratings[name.toLowerCase()] + "/10**!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
        } else {
            let embed = new discord.RichEmbed();
            embed.setTitle("Rating:")
                .setColor(0xFF69B4)
                .setDescription("I'd rate **" + name + "** a **" + generateRandomRating(bot, msg, name, true) + "/10**!")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);
        }
    }

}

exports.help = (bots, msg, args) => {
    return "To rate someone, use `!rate <user>`.";
}

/*======================FUNCTIONS============================*/

function generateRandomRating(bot, msg, user, store) {
    var weightedNumber = Math.floor((Math.random() * 20) + 1); //between 1 and 20
    var score, moreRandom = Math.floor(Math.random() * 4);
    if (weightedNumber < 5) { score = Math.floor((Math.random() * 3) + 1); } //between 1 and 3
    else if (weightedNumber > 4 && weightedNumber < 16) { score = Math.floor((Math.random() * 4) + 4); } //between 4 and 7
    else if (weightedNumber > 15) { score = Math.floor((Math.random() * 3) + 8); } //between 8 and 10
    if (moreRandom === 0 && score !== 1) {
        score -= 1;
    } else if (moreRandom == 3 && score != 10) { score += 1; }

    if (store) { Ratings[user.toLowerCase()] = score; }

    return score;
}

function generateUserRating(bot, msg, user) {
    let score = generateRandomRating() - 1;
    try {
        var joined = new Date(msg.guild.member(user.id).joinedAt),
            now = new Date();
        if (now.valueOf() - joined.valueOf() >= 2592000000) { score += 1; } //if user has been on the server for at least one month +1
    } catch (e) { console.log("ERROR WITH DATE"); }
    //console.log(msg.guild.member(user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS"));
    //console.log(msg.guild.member(user).hasPermission("ADMINISTRATOR"));
    if (msg.guild.member(user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) { score += 1; } //mods get points!
    if (msg.guild.member(user).hasPermission("ADMINISTRATOR")) { score += 1; } //admins get even more~
    if (user.username.length > 15) { score -= 1; } //long ass names get WAY LESS
    if (!user.avatarURL) { score -= 1; } //no avatar = succ
    //maybe add something to do with dia later

    if (score > 10) { score = 10; } else if (score < 1) { score = 1; } //keep it within 1-10

    Ratings[user.username.toLowerCase()] = score;
    return score;

}
