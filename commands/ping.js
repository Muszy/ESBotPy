exports.run = (bot, msg, args) => {
    msg.channel.sendMessage("Ping!");
}

exports.help = (bot, msg, args) => {
	return "Pong.";
}