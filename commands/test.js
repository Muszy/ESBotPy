var redis = require("redis"),
    client = redis.createClient();
const discord = require("discord.js");

client.on("error", function(err) {
    console.log("Error " + err);
});

exports.run = (bot, msg, args) => {

    /*var tester;

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(snorfs[Math.floor(Math.random() * (snorfs.length))]);

    msg.channel.sendEmbed(embed).then(m => m.delete(3000)).catch(console.error);*/

    /*msg.channel.sendEmbed(embed).then(function(m) {
        tester = m.id;
        console.log(tester);
    }).catch(console.error);*/

    //msg.delete(3000);

    client.HMSET("key2", {
        "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings
        "some manner of key": "a type of value"
    });

}

exports.help = (bots, msg, args) => {
    return "help";
}
