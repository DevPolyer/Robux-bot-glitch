const discord = require ("discord.js");
const prefix = require('../../config/config.json')
const codesSchema = require("../../database/models/codes");

module.exports.run = async (client, message, args) =>{
    const codename = args[0];
    if (codename.includes(" ")) return message.replyNoMention(`**لا يمكنك استعمال المسافات مع اسم الكود 😊**`);
  
    const code = await codesSchema.findOne({name: codename, guildId: message.guild.id});
    if (code) return message.replyNoMention(`**هذا الكود  موجود بالفعل يمكن استعماله**`);
    const prize = args[2];
    const limit = args[1];

    if (isNaN(limit)) return message.replyNoMention(`**يجب ان يكون الحد الاقصي لاستخدام الكود عدد صحيح 😂**`);
    if (isNaN(prize)) return message.replyNoMention(`**يجب ان تكون جائزه الكود رقم صحيح 😊**`);

    codesSchema.createCode(codename, limit, prize, message.author.id, message).then(() => {
        message.replyNoMention("done")
    })

}

module.exports.details = {
    name: 'createcode',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'make a new code',
    example: `${prefix.prefix}createcode hello 10 5`,
    guildOnly: true,
    usage:`${prefix.prefix}createcode (codename) (limit) (prize)`,
    whitelist: true,
    args: true,
}