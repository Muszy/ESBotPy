const discord = require("discord.js");
var request = require("request");
var trim = require("trim");

const url = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/CardList.json";

exports.run = (bot, msg, args) => {

	if(args.length < 1) {
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
	       	.setColor(0xFF0040)
	       	.setDescription("Please enter in the form of `!card [character first name] (opt alias)`!")
	       	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	    msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

	else if(args.length == 1) {
		searchBoy(args[0].toLowerCase(), msg);
		return;
	}

	else {
		lookUp(args[0].toLowerCase(),args[1].toLowerCase(), msg);
		return;

	}	
}

exports.help = (bot, msg, args) => {
	return "To look up a card, please use the format of `!card [character firstname] (alias)`.";
}

function searchBoy(boy, msg) {
	let list=[];

	request(url, function(error, response, body) {
		if (error) { console.log(error); }
		if (!error) { 
			data = JSON.parse(body);
			//console.log(data);
			for(var id in data.cards){
				//console.log(data.cards[id].nick);

				if (data.cards[id].nick == boy.toLowerCase()) {
					list.push(data.cards[id].name + " : " + data.cards[id].alias.toUpperCase());
				}
			}

			if (list.length < 1) {
				let embed = new discord.RichEmbed();
				embed.setTitle("Error:")
			       	.setColor(0xFF0040)
			       	.setDescription("No such character found!")
			       	.setThumbnail("http://i.imgur.com/7TL0t99.png");
			    msg.channel.sendEmbed(embed).catch(console.error);
				return;
			}

			let str = list.join("\n");

			let embed = new discord.RichEmbed();
			embed.setTitle("Found (Name | Alias):")
	        	.setColor(0x96F08C)
	        	.setDescription("`"+str+"`")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.channel.sendEmbed(embed).catch(console.error);
		}
	});
}

function lookUp(boy, rare, msg) {

	let check = null;
	let list=[];

	request(url, function(error, response, body) {
		if (error) { console.log(error); }
		if (!error) { 
			data = JSON.parse(body);
			//console.log(data);
			for(var id in data.cards){
				//console.log(data.cards[id].nick);
				if (data.cards[id].nick == boy.toLowerCase() && rare == data.cards[id].alias) {
					check = id;
					//console.log("found" + id);
				}
			}

			if (check != null) {
				let embed = new discord.RichEmbed();
				embed.setTitle(data.cards[check].name)
					.setURL("http://enstars.info/card/" + data.cards[check].id)
		        	.setColor(0x96F08C)
		        	.setThumbnail(data.cards[check].img)
		        	.addField("Main Stat", data.cards[check].stat)
		        	.addField("Lesson Skill", data.cards[check].lesson)
		        	.addField("DreamFes Skill", data.cards[check].dreamfes)
		        	.addField("Source", data.cards[check].origin);
		        msg.channel.sendEmbed(embed).catch(console.error);
			}

			else {

				searchBoy(boy, msg);

			}
		}
	});

}

function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on("end", function() {
			callback(data);
		});
	}).on("error", function() {
		callback(null);
	});
}