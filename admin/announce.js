const discord = require("discord.js");
const config = require("../config.json");

var serversName = "../db/servers.json";
var serverSettings = require(serversName);

exports.run = (bot, msg, args) => {

    if (msg.author.id != config.admin_id) {
        
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("You do not have the required permissions to do this.")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.send({embed}).then(m => m.delete(4000)).catch(console.error);
        return;
    }

    if (msg.channel.type == "dm" || msg.channel.type == "group") {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use this command in a server, not a DM!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.send({embed}).catch(console.error);
        return;
    }

    if (args.length < 1) {
        return;
    }

    for (var id in serverSettings) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Daikichi Announces:")
            .setColor(0x3399FF)
            .setDescription(args.join(" "))
            .setThumbnail("http://i.imgur.com/7TL0t99.png");

        bot.channels.get(serverSettings[id].notifyChannel).send({embed}).catch(console.error);
    }

    msg.delete(3000);

}

exports.help = (bots, msg, args) => {
    return "(Bot Owner Only) Use `announce [msg]` in order to announce a message across servers.";
}
