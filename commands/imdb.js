var request = require("request");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {
    let embed = new discord.RichEmbed();
    if (args.length > 0) {
        request("http://www.omdbapi.com/?t=" + args.join(" ") + "&y=&plot=short&r=json", function(error, response, body) {
            if (error) {
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("Error: " + error)
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).catch(console.error);
                return;
            }
            if (!error) {
                movie = JSON.parse(body);
                if (movie.Response == "False") {
                    embed.setTitle("Error:")
                        .setColor(0xFF0040)
                        .setDescription("Couldn't find `" + args.join(" ") + "`.")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(embed).catch(console.error);
                    return;
                }

                embed.setTitle("**" + movie.Title + "** (" + movie.Year + ")")
                    .setURL("http://www.imdb.com/title/" + movie.imdbID + "/")
                    .setColor(0xFF69B4)
                    .setDescription(movie.Plot)
                    .addField("Scores", "Metascore: " + movie.Metascore + " || IMDB Rating: " + movie.imdbRating)
                    .addField("Rating", movie.Rated)
                    .addField("Released", movie.Released)
                    .addField("Length", movie.Runtime)
                    .addField("Genre", movie.Genre)
                    .setThumbnail(movie.Poster);

                msg.channel.sendEmbed(embed).catch(console.error);
                return;

            }
            return;
        });
        return;
    }

    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Please use the format `!imdb [movie]`!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "To look up a movie, you can use `!imdb [movie]`.";
}
