const prefix = require('../../config/config.json');
const discord = require('discord.js');
const noblox = require('noblox.js');
const axios = require('axios');

module.exports.run = async(client, message, args) =>{
    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const groupId = data2.groupId || 1 ;
  
    await noblox.getGroup(groupId).then(async (g) => {
        await axios.get(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${g.id}&size=150x150&format=Png&isCircular=false`).then(({data}) => {
             
            const embed = new discord.MessageEmbed()
            .setTitle(g.name)
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage(data.data[0].imageUrl)
            .setDescription(`
              [group](https://www.roblox.com/groups/${g.id}/)
            `)
            .setTimestamp()
            message.replyNoMention(embed)
      })

    }).catch(e => {
        message.replyNoMention(`**لم يتم تحديد اي دي الجروب**`)
    })
  
}

module.exports.details = {
    name: 'group',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'get group info',
    usage:`${prefix.prefix}group`,
    guildOnly: true,
    owners: false,
}