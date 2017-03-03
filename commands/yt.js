var request = require("request");
const discord = require("discord.js");
var config = require("../config.json");

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube_api_key);

exports.run = (bot, msg, args) => {
    let embed = new discord.RichEmbed();

    if (args.length > 0) {

        youTube.search(args.join(" "), 10, function(error, result) {

            if (error || !result || !result.items || result.items.length < 1) {

                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("There was an error!  Sorry!")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;

            }

            if (typeof result.items[0].id.videoId === "undefined") {

                for (i = 1; i < result.items.length; i++) {

                    if (typeof result.items[i].id.videoId !== "undefined") {

                        msg.channel.sendMessage("I searched for **" + args.join(" ") + "** and found this **" + msg.author.username + "**: \nhttps://www.youtube.com/watch?v=" + result.items[i].id.videoId);
                        msg.delete(1500);
                        return;
                    }

                }

            }

            msg.channel.sendMessage("I searched for **\"" + args.join(" ") + "\"** and found this, **" + msg.author.username + "**: \nhttps://www.youtube.com/watch?v=" + result.items[0].id.videoId);
            msg.delete(1500);
            return;

        });
        return;
    }

    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!yt [search terms]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
    msg.delete(1500);
}

exports.help = (bot, msg, args) => {
    return "To search YouTube for a video, you can use `!yt [search terms]`.";
}
