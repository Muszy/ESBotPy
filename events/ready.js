var serversName = "./../db/servers.json";
var serverSettings = require(serversName);
var fs = require("fs");


exports.run = (bot, guild) => {
	console.log(`Now ready in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
	bot.user.setGame("Ensemble Stars!");

	for (var id in serverSettings) {
        if (serverSettings[id].diaMade) {
            console.log("reset dia in server " + id);
            serverSettings[id].diaMade = false;

            serverSettings[id].lastDiaMsg = "";
            updateServers();
        }
    }
}

function updateServers() {
    fs.writeFile(__dirname + './../db/servers-temp.json', JSON.stringify(serverSettings, null, 4), error => {
        if (error) console.log(error)
        else {
            fs.stat(__dirname + '/db/servers-temp.json', (err, stats) => {
                if (err) console.log(err)
                else if (stats["size"] < 2) console.log('Prevented servers from being overwritten');
                else {
                    fs.rename(__dirname + './../db/servers-temp.json', __dirname + './../db/servers.json', e => {
                        if (e) console.log(e)
                    });
                }
            });
        }
    })
}