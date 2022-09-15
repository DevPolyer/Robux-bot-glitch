const prefix = require('../config/config.json');
const discord = require('discord.js');

module.exports.run = async(client, message, args) =>{
    const users = await client.database.users.find()
    const all = users.sort((a, b) => b.coins - a.coins )

    let Tops = new Array();
    let count = 0;

    all.forEach( e => {
      let user =  client.users.cache.get(e.userId);
      if (user && count !== 10) Tops.push(`**[#${count ++}] - [${user.username.toLocaleString("ar-SA")}] - [${e.coins}]** \n\ `);
    })

    const embed = new discord.MessageEmbed()
    .setColor("Blue")
    .setTitle(`اول  10 اشخاص لديهم رصيد`)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(Tops)
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()

    message.replyNoMention(embed)

}

module.exports.details = {
    name: 'top',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'top users in balance',
    usage:`${prefix.prefix}top`,
    guildOnly: true,
    owners: false,
}