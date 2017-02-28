var serversName = "../db/servers.json";
var serverSettings = require(serversName);
var usersName = "../db/users.json";
var userSettings = require(usersName);
const discord = require("discord.js");


exports.run = (bot, member, guild) => {

	//console.log("new member");
	//console.log(member.guild.id);

	//console.log(serverSettings[member.guild.id].notify);

	if(serverSettings[member.guild.id].banAlerts) {
		let embed = new discord.RichEmbed();

		embed.setTitle(member.user.username + " has been banned!")
			.setColor(0xFFB6C1)
			.setDescription("Bye bye!")
			.setThumbnail("http://i.imgur.com/nRleyfl.png");

		let ch = serverSettings[member.guild.id].notifyChannel;
		bot.channels.get(ch).sendEmbed(embed).catch(console.error);
	}
}

function updateUsers() {
    fs.writeFile(__dirname + '/../db/users-temp.json', JSON.stringify(userSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/../db/users-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented users from being overwritten');
                else {
                    fs.rename(__dirname + '/../db/users-temp.json', __dirname + '/../db/users.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}