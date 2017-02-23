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

    if (args.length > 0 && !isNaN(args[0]) && file[msg.guild.id].quotes.length >= parseInt(args[0]) && parseInt(args[0]) > 0) {
        file[msg.guild.id].quotes.splice(parseInt(args[0])-1, 1);

        let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setDescription("Deleted quote.");

		msg.channel.sendEmbed(embed).catch(console.error);

        //console.log("Added quote #" + (file[msg.guild.id].quotes.length) + ".");
        updateQuotes();
    }

    else {
    	let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You need a quote to delete!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");

		msg.channel.sendEmbed(embed).catch(console.error);
    }

}

exports.help = (bot, msg, args) => {
    return "To delete a quote, just use `%delq [number]`.";
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
