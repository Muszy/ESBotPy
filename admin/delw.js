const discord = require("discord.js");
var fs = require('fs');
var fileName = "./../db/weeb.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {

	if (!file.hasOwnProperty(msg.channel.guild.id)) {
		//console.log("doesn't exist!");

		file[msg.channel.guild.id] = {
	        "weeb": []
	    }

	    console.log("Added server \'" + msg.channel.guild.name + "\' to the weeb list.  ID: " + msg.channel.guild.id);
    	updateWeeb();

	}

    if (args.length > 0 && !isNaN(args[0]) && file[msg.guild.id].weeb.length >= parseInt(args[0]) && parseInt(args[0]) > 0) {
        file[msg.guild.id].weeb.splice(parseInt(args[0])-1, 1);

        let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setDescription("Deleted weeb.");

		msg.channel.sendEmbed(embed).catch(console.error);

        //console.log("Added weeb #" + (file[msg.guild.id].weeb.length) + ".");
        updateWeeb();
    }

    else {
    	let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You need a weeb img to delete!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");

		msg.channel.sendEmbed(embed).catch(console.error);
    }

}

exports.help = (bot, msg, args) => {
    return "To delete a weeb img, just use `%delw [number]`.";
}

/*==============FUNCTIONS===============*/

function updateWeeb() {
    fs.writeFile(__dirname + '/../db/weeb-temp.json', JSON.stringify(file, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/weeb-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented weeb from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/weeb-temp.json', __dirname + '/../db/weeb.json', e => {
                        if (e) console.log(e) });
                }
            });
        }
    });
}
