const prefix = require('../config/config.json');
const discord = require('discord.js');

module.exports.run = async(client, message, args) =>{
    const users = await client.database.users.find()
    const all = users.map(e => e.coins).reduce((a, b) => a + b)
    const usages = users.length
    const embed = new discord.MessageEmbed()
    .setColor("Blue")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`** \`${all}\` :مجموع رصيد الاعضاء \n\  \`${usages}\` : مجموع مستخدمين اوامر البوت**`)
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter(`cmd`)

    message.replyNoMention(embed)

}

module.exports.details = {
    name: 'all',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to Know all users funds',
    usage:`${prefix.prefix}all`,
    guildOnly: true,
    owners: false,
}