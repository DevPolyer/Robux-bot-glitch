const discord = require ("discord.js");
const prefix = require('../../config/config.json')
const codesSchema = require("../../database/models/codes");

module.exports.run = async (client, message, args) =>{
    const codename = args[0];
    if (codename.includes(" ")) return message.replyNoMention(`**لا يمكنك استعمال المسافات مع اسم الكود 😊**`);
  
    const code = await codesSchema.findOne({name: codename, guildId: message.guild.id});
    if (!code) return message.replyNoMention(`**هذا الكود غير موجود **`);
    code.delete();
    message.replyNoMention(`**تم مسح هذا الكود بنجاح 🌹**`)

}

module.exports.details = {
    name: 'delete-code',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'make a new code',
    example: `${prefix.prefix}delete-code hello`,
    guildOnly: true,
    usage:`${prefix.prefix}delete-code`,
    whitelist: true,
    args: true,
}