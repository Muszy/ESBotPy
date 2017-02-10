const discord = require("discord.js");
var Twitter = require('twitter');
const config = require("./../config.json");

var client = new Twitter({
	consumer_key: config.twitKey,
	consumer_secret: config.twitSecret,
	access_token_key: config.twitToken,
	access_token_secret: config.twitTokenSecret
});

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Something went wrong!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.run = (bot, msg, args) => {
	var params = {
		screen_name: 'enst_border',
		count: '10',
		include_rts: 'false',
		exclude_replies: 'true'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if(error) { 
  			msg.channel.sendEmbed(errorMsg).catch(console.error);
  			return; 
  		}
  		if (!error) {
  			//console.log(tweets[0].text);
  			let embed = new discord.RichEmbed();
			embed.setTitle("The Current Border is:")
		        .setColor(0xFFB400)
		        .setDescription(tweets[0].text)
		        .setFooter("Info from @enst_border on TWitter.")
		        .setThumbnail("https://pbs.twimg.com/profile_images/664120113797292032/cbs9ZrNi.jpg");
		    msg.channel.sendEmbed(embed).catch(console.error);
  		}
	});
}

exports.help = (bot, msg, args) => {
	return "Use `border` in order to check the current event borders!";	
}