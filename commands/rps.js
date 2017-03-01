const discord = require("discord.js");

exports.run = (bot, msg, args) => {
    let choice = Math.floor(Math.random() * 3);
    let str = "";

    if ( choice == 0 ) str = "rock";
    else if (choice == 1 ) str = "scissors";
    else if (choice == 2) str = "paper";

    let embed = new discord.RichEmbed();
    embed.setColor(0xFF3232)
    	.setDescription("Daikichi picked: **" + str + "**!");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "To play Rock/Paper/Scissors, just use `!rps`.";
}
