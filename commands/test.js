var request = require("superagent");
const discord = require("discord.js");

var snorfs = ["APPLESAUCE.", "*lays on floor*", "snorfs", "squanto..."]

exports.run = (bot, msg, args) => {

	var tester;

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(snorfs[Math.floor(Math.random() * (snorfs.length))]);

    msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);

    /*msg.channel.sendEmbed(embed).then(function(m) {
    	tester = m.id;
    	console.log(tester);
    }).catch(console.error);*/

    msg.delete(3000);

}

exports.help = (bots, msg, args) => {
    return "snorfs";
}
