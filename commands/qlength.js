const discord = require("discord.js");
var fs = require('fs');
var fileName = "./../db/quotes.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {

    if (!file.hasOwnProperty(msg.channel.guild.id)) {
        //console.log("doesn't exist!");

        file[msg.channel.guild.id] = {
            "quotes": []
        }

        console.log("Added server \'" + msg.channel.guild.name + "\' to the quotes list.  ID: " + msg.channel.guild.id);
        updateQuotes();

    }

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription("There are currently " + (file[msg.guild.id].quotes.length) + " quotes.");

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bot, msg, args) => {
    return "To see how many quotes there are, just use `!qlength`.";
}

/*==============FUNCTIONS===============*/

function updateQuotes() {
    fs.writeFile(__dirname + '/../db/quotes-temp.json', JSON.stringify(file, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/quotes-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented quotes from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/quotes-temp.json', __dirname + '/../db/quotes.json', e => {
                        if (e) console.log(e) });
                }
            });
        }
    });
}
