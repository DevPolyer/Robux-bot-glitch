const prefix = require('../../config/config.json');
const discord = require('discord.js');
const number = require('easy-number-formatter')
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) =>{
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const embed = new discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail(message.guild.iconURL())
    .setDescription(`
        **[add theBot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**
     \n\
    🗄 Total Guilds: **${number.formatNumber(client.guilds.cache.size)}**
    👥 Total Users: **${number.formatNumber(client.users.cache.size)}**
    💻 Total Commands: **${number.formatNumber(client.commands.size)}**
    ⏳ Uptime: **${duration}**
    `)
    .setFooter(`${client.user.username} Developers: Ziad#1768`)

    message.replyNoMention(embed)
}

module.exports.details = {
    name: 'about',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'all bot info',
    usage:`${prefix.prefix}about`,
    guildOnly: true,
    owners: false,
}