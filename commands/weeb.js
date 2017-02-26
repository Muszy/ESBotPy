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
		return;
	}

	if (args.length > 0 && !isNaN(args[0]) && file[msg.guild.id].weeb.length >= parseInt(args[0]) && parseInt(args[0]) > 0) {

		msg.channel.sendMessage("📺 Weeb #" + args[0] + ": " + file[msg.guild.id].weeb[args[0]-1]);

	}

	else {

		let num = Math.floor(Math.random() * (file[msg.guild.id].weeb.length));

		msg.channel.sendMessage("📺 Weeb #" + (num+1) + ": " + file[msg.guild.id].weeb[num]);	

	}

}

exports.help = (bot, msg, args) => {
	return "To call a quote, just use `!call` or `!call [number]`.";
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
