var request = require("superagent");
const discord = require("discord.js");
var config = require("../config.json");
var request = require("request");


const OWM_API_KEY = config.weather_api_key;

exports.run = (bot, msg, args) => {

    if (OWM_API_KEY == null || OWM_API_KEY == "") {

        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("⚠ No API key defined by bot owner.")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args.length < 1) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please use the format `!weather <city/zip>`.")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args.length > 0) {
        var suffix = args.join(); }

    var rURL = (/\d/.test(suffix) == false) ? "http://api.openweathermap.org/data/2.5/weather?q=" + suffix + "&APPID=" + OWM_API_KEY : "http://api.openweathermap.org/data/2.5/weather?zip=" + suffix + "&APPID=" + OWM_API_KEY;
    
    request(rURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            if (!body.hasOwnProperty("weather")) {
                return;
            }
            var tempF = Math.round(parseInt(body.main.temp) * (9 / 5) - 459.67) + " °F";
            var tempC = Math.round(parseInt(body.main.temp) - 273.15) + " °C";
            var windspeedUS = Math.round(parseInt(body.wind.speed) * 2.23694) + " mph";
            var windspeed = body.wind.speed + " m/s";
            var emoji = "☀";
            if (body.weather[0].description.indexOf("cloud") > -1) { emoji = "☁"; }
            if (body.weather[0].description.indexOf("snow") > -1) { emoji = "❄"; }
            if (body.weather[0].description.indexOf("rain") > -1 || body.weather[0].description.indexOf("storm") > -1 || body.weather[0].description.indexOf("drizzle") > -1) { emoji = "☔"; }

            let embed = new discord.RichEmbed();
            embed.setTitle(emoji + " __Weather for " + body.name + "__:")
                .setColor(0xFF0040)
                .setDescription("**Conditions:** " + body.weather[0].description + " \n**Temp:** " + tempF + " / " + tempC + "\n**Humidity:** " + body.main.humidity + "% \n**Wind:** " + windspeedUS + " / " + windspeed + " \n**Cloudiness:** " + body.clouds.all + "%")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).catch(console.error);

        } else { console.log(error); }
    });
}

exports.help = (bots, msg, args) => {
    return "To look up the weather somewhere, just use `!weather <city/zip>`.";
}
