var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {
	var responses = ["Signs point to yes.",
		"Yes.",
		"Reply hazy, try again.",
		"Without a doubt.",
		"My sources say no.",
		"As I see it, yes.",
		"You may rely on it.",
		"Concentrate and ask again.",
		"Outlook not so good.",
		"It is decidedly so.",
		"Better not tell you now.",
		"Very doubtful.",
		"Yes - definitely.",
		"It is certain.",
		"Cannot predict now.",
		"Most likely.",
		"Ask again later.",
		"My reply is no.",
		"Outlook good.",
		"Don't count on it. "];
	//msg.channel.sendMessage("🎱 " + responses[choice]).catch(console.error);
	let embed = new discord.RichEmbed();
    embed.setTitle("🎱 says:")
        .setColor(0x3399FF)
        .setDescription(responses[Math.floor(Math.random() * (responses.length))])
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
	return "To use 8ball, just use `!8ball [query]`.";
}