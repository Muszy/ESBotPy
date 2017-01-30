const discord = require("discord.js");

exports.run = (bot, msg, args) => {
	let objs = args.join(" ");
	let list = objs.split(",");
	//console.log(list);
	//console.log(list[Math.floor(Math.random() * (list.length))].trim());

	if(list.length<2) {
		let embed = new discord.RichEmbed();
		embed.setTitle("Error:")
		    .setColor(0xFF0040)
		    .setDescription("Please use at least 2 choices!")
		    .setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);
		return;
	}

	let embed = new discord.RichEmbed();
	embed.setTitle("Daikichi chooses:")
        .setColor(0x3399FF)
        .setDescription(list[Math.floor(Math.random() * (list.length))].trim() + "!")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
	return "To choose just do `choose [choice1], [choice2], [choice3], etc...`! Make sure to separate with commas.";	
}