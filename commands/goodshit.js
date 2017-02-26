var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription("👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌there👌👌👌 right✔there ✔✔if i do ƽaү so my self 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit");

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "GOOOOOOD SHIT";
}
