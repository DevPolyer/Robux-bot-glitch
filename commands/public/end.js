const discord = require ("discord.js");
const prefix = require('../../config/config.json')

module.exports.run = async (client, message, args) =>{
    if (client.Buycooldown.has(`${message.author.id}-${message.guild.id}`)) {
        client.Buycooldown.delete(`${message.author.id}-${message.guild.id}`);
        message.replyNoMention(`**تم انهاء عمليه الشراء بنجاح 😊**`)
    }else {
        message.replyNoMention(`**ليس لديك عمليه شراء 😢**`)
    }
}

module.exports.details = {
    name: 'end',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to end your last buy',
    guildOnly: true,
    usage:`${prefix.prefix}end`
}