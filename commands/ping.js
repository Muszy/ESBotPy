exports.run = (bot, msg, args) => {
    msg.channel.sendMessage("Pong!");
}

exports.help = (bot, msg, args) => {
	return "Pong.";
}