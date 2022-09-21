const discord = require ("discord.js");
const prefix = require('../../config/config.json');
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {
   const command = await client.commands.get(args[0]);
   if (!command) return message.replyNoMention(`**لا يمكنني العثور علي هذا الامر 🔴**`);
   const Shortcut = args[1];
   if (!Shortcut) return message.replyNoMention(`**الرجاء كتابه الاختصار الجديد**`);
   const commandData = await client.database.commands.get(command.details.name, message.guild.id);
   if (!commandData.short.includes(Shortcut)) return message.replyNoMention(`**هذا الاختصار غير موجود بالفعل**`);

   let array = [-commandData.short.indexOf(Shortcut)]
   commandData.short.splice(array[0], 1)
   commandData.save();

    message.replyNoMention(`> **تم ازاله هذا الاختصار بنجاح**`)
}

module.exports.details = {
    name: 'delete-shortcuts',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to remove your cookie from the bot',
    guildOnly: true,
    usage:`${prefix.prefix}delete-shortcuts (command) (Shortcut)`,
    example: `${prefix.prefix}delete-shortcuts buy (Shortcut)`,
    whitelist: true,
    args: true,
}