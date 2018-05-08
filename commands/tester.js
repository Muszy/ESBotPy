var request = require("superagent");
const discord = require("discord.js");

var snorfs = ["APPLESAUCE.", "*lays on floor*", "snorfs", "squanto..."]

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(snorfs[Math.floor(Math.random() * (snorfs.length))]);

    //msg.channel.sendEmbed(embed).catch(console.error);

    let id = msg.guild.id;
    let ch = bot.channels.get("108753685122715648");
    
    let myRole = ch.guild.roles.find("name", "General");
    if (myRole != null) {
        msg.channel.sendMessage(myRole+" : test").catch(console.error);     
    }

    else {
        msg.channel.sendMessage("no strike role defined").catch(console.error);     
        return;
    }
    
}

exports.help = (bots, msg, args) => {
    return "snorfs";
}
