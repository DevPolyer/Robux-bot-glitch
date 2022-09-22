const discord = require ("discord.js");
const prefix = require('../../config/config.json');
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {
   const command = await client.commands.get(args[0]);
   if (!command) return message.replyNoMention(`**لا يمكنني العثور علي هذا الامر 🔴**`);
 
   const commandData = await client.database.commands.get(command.details.name, message.guild.id);
  
    if (commandData.disabled) return message.replyNoMention(`**هذا الامر مقفل بالفعل 🔴**`);
    
    await client.database.commands.disable(command.details.name, message.guild.id)
    message.replyNoMention(`**تم اغلاق هذا الامر بنجاح🟢**`);
}

module.exports.details = {
    name: 'disable-command',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to remove your cookie from the bot',
    guildOnly: true,
    usage:`${prefix.prefix}disable-command (command)`,
    example: `${prefix.prefix}disable-command buy`,
    whitelist: true,
    args: true,
}