const discord = require("discord.js");

exports.run = (bot, msg, args) => {
    let roll = 100;

    if (args.length > 0 && !isNaN(args[0])) {
        if (parseInt(args[0]) > 1) {
            roll = parseInt(args[0]);
        }
    }

    let embed = new discord.RichEmbed();
    embed.setColor(0xFF3232)
    	.setDescription("🎲 Daikichi rolled from 1 to " + roll + " and got: " + Math.floor((Math.random() * (roll)) + 1) + "!");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "To roll, just use `!roll (optional)[number]`.";
}
