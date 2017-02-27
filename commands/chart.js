const discord = require("discord.js");
var Twitter = require('twitter');
const config = require("./../config.json");

var client = new Twitter({
    consumer_key: config.twitKey,
    consumer_secret: config.twitSecret,
    access_token_key: config.twitToken,
    access_token_secret: config.twitTokenSecret
});

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.run = (bot, msg, args) => {
    var params = {
        screen_name: 'chiaki918a',
        count: '15',
        include_rts: 'false',
        exclude_replies: 'true'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            msg.channel.sendEmbed(errorMsg).catch(console.error);
            return;
        }
        if (!error) {
            let count = -1;

            if (args.length > 0) {
                if (args[0].toLowerCase() == "t1" || args[0].toLowerCase() == "tier1" || args.join(" ").toLowerCase() == "tier 1") {

                    for (var i = 0; i < tweets.length; i++) {
                        if (tweets[i].text.indexOf("【完凸】") > -1) {
                            //console.log(tweets[i]);
                            if (count < 0) {
                                count = i;
                            }
                        }
                    }

                    if (count > -1) {

                        let embed = new discord.RichEmbed();
                        embed.setTitle("The Current Border T1 Chart:")
                            .setColor(0xFFB400)
                            .setFooter("Info from @chiaki918a on Twitter.")
                            .setURL("https://twitter.com/chiaki918a/status/" + tweets[count].id_str)
                            .setImage(tweets[count].entities.media[0].media_url);
                        msg.channel.sendEmbed(embed).catch(console.error);
                        return;
                    }
                }
            }

            for (var i = 0; i < tweets.length; i++) {
                if (tweets[i].text.indexOf("【1枚】") > -1) {
                    //console.log(tweets[i]);
                    if (count < 0) {
                        count = i;
                    }
                }
            }

            if (count > -1) {

                let embed = new discord.RichEmbed();
                embed.setTitle("The Current Border 5★ Chart:")
                    .setColor(0xFFB400)
                    .setFooter("Info from @chiaki918a on Twitter.")
                    .setURL("https://twitter.com/chiaki918a/status/" + tweets[count].id_str)
                    .setImage(tweets[count].entities.media[0].media_url);
                msg.channel.sendEmbed(embed).catch(console.error);
            }

        }
    });
}

exports.help = (bot, msg, args) => {
    return "Use `chart` in order to check the current event border chart!  Use `chart t1` to check the tier 1 chart.";
}
