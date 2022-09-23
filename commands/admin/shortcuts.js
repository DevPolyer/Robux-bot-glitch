const discord = require ("discord.js");
const prefix = require('../../config/config.json');
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {
   const command = await client.commands.get(args[0]);
   if (!command) return message.replyNoMention(`**لا يمكنني العثور علي هذا الامر 🔴**`);
   const commandData = await client.database.commands.get(command.details.name, message.guild.id);
  
   const embed = new discord.MessageEmbed()
   .setDescription(`**${commandData.short.join("\n ")}**`)
   .setTimestamp()

   commandData.short.length > 0? message.replyNoMention(embed) : message.replyNoMention("هذا الامر ليس لديه اي اختصارات");

}

module.exports.details = {
    name: 'shortcuts',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to know all shortcuts of this command',
    guildOnly: true,
    usage:`${prefix.prefix}shortcuts (command)`,
    example: `${prefix.prefix}shortcuts buy`,
    whitelist: true,
    args: true,
}