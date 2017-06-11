const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	let embed = new discord.RichEmbed();
    embed.setTitle("Attribute Items")
        .setColor(0xB48CF0)
        .setDescription("Pure = Fountain / Fruit Tart\nCool = Pool / Fruit Bowl\nHappy = Michelle Statue / Macaron Tower\nPowerful = Coconut Palm Tree / Spaghetti")
        .setThumbnail("http://i.imgur.com/408QceQ.png")
        .setURL("http://bangdreaming.tumblr.com/band");
    msg.channel.sendEmbed(embed).catch(console.error);
    
}

exports.help = (bot, msg, args) => {
	return "To get Bandori item attribute help, just use `item`.";
}