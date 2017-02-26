const discord = require("discord.js");

var lizard = [
	"http://i0.kym-cdn.com/photos/images/facebook/000/804/849/54c.jpg",
	"http://i3.kym-cdn.com/photos/images/original/000/836/625/1de.png",
	"http://i2.kym-cdn.com/photos/images/original/000/836/623/82d.jpg",
	"http://i0.kym-cdn.com/photos/images/original/000/804/856/043.jpg",
	"http://i1.kym-cdn.com/photos/images/original/000/804/852/e07.jpg",
	"http://i2.kym-cdn.com/photos/images/original/000/804/854/937.jpg",
	"http://i1.kym-cdn.com/photos/images/original/000/804/868/54e.jpg",
	"http://i0.kym-cdn.com/photos/images/original/000/804/855/a9f.jpg",
	"http://i2.kym-cdn.com/photos/images/original/000/804/851/ee2.png",
	"http://i2.kym-cdn.com/photos/images/original/000/804/862/27c.jpg",
	"http://i3.kym-cdn.com/photos/images/original/000/804/861/5ac.jpg",
	"http://i0.kym-cdn.com/photos/images/original/000/804/867/945.jpg",
	"http://i0.kym-cdn.com/photos/images/original/000/804/869/67f.jpg",
	"http://i3.kym-cdn.com/photos/images/original/000/804/865/c50.jpg",
	"http://i3.kym-cdn.com/photos/images/original/000/804/870/d7a.jpg",
	"http://i2.kym-cdn.com/photos/images/original/000/804/893/92c.jpg"
]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setImage(lizard[Math.floor(Math.random() * (lizard.length))]);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "hehehehehahhaahaheuehe";
}
