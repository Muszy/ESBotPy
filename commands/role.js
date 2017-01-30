var request = require("superagent");
const discord = require("discord.js");

exports.run = (bot, msg, args) => {

	if (args.length < 1 ) {
		let embed = new discord.RichEmbed()

		embed.setTitle("ℹ List of Roles")
			.setColor(0xB48CF0)
			.setDescription(msg.channel.guild.roles.map(role => role.name).join(', '));

		msg.channel.sendEmbed(embed).catch(console.error);
	}
	
	else {
		var role = args.join(" ");
		//console.log(role);
		try {
			let myRole = msg.guild.roles.find("name", role);

			let membersWithRole = msg.guild.roles.get(myRole.id).members;
			let listOfMembers = membersWithRole.map(m=>m.user.username).join(", ");

			let embed = new discord.RichEmbed();

			embed.setTitle("ℹ List of " + role)
				.setColor(0xB48CF0)
				.setDescription(listOfMembers);

			msg.channel.sendEmbed(embed).catch(console.error);
		}

		catch (e) {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
	    		.setColor(0xFF0040)
	        	.setDescription("Please look up a valid role!")
	        	.setThumbnail("http://i.imgur.com/7TL0t99.png");
	        msg.channel.sendEmbed(embed).catch(console.error);
		}
	}
}

exports.help = (bot, msg, args) => {
	return "To look up a role, you can use `!role [role]`.";
}