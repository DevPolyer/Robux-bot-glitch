const prefix = require('../../config/config.json');
const discord = require('discord.js');
const noblox = require('noblox.js');
const timestamp = require('unix-timestamp');
const axios = require('axios');

module.exports.run = async(client, message, args) =>{

    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const cookie = data2.cookie || "a";
    const groupId = data2.groupId || 1 ;
  
await noblox.setCookie(cookie).then(async (user) => {
    await noblox.getGroup(groupId).then(async g => {
        
        var tran = await noblox.getGroupTransactions(g.id, "Sale")
        tran = tran.filter(r => r.isPending === true);

        const times = [];
        
        for (robux of tran) {
            times.push(`**ٌ${Math.floor((robux.currency.amount + 0.1) *  0.7) .toString()}R: arrives <t:${parseInt(timestamp.fromDate(robux.created) + 86400 * 5)   }:R>**`)
        }

        await axios.get(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${g.id}&size=150x150&format=Png&isCircular=false`).then(({data}) => {
             
        const embed = new discord.MessageEmbed()
        .setTitle(g.name)
        .setColor("RANDOM")
        .setDescription(times.join("\n"))
        .setAuthor(message.author.username, message.author.avatarURL())
        .setThumbnail(data.data[0].imageUrl)
        .setTimestamp()
        message.replyNoMention(embed)
    })

    }).catch(e => {
        console.log(e)
      message.replyNoMention(`**يجب عليك تسجيل اي دي الجروب😢**`)   
    })
    }).catch(e => {
        message.replyNoMention(`**يجب عليك تسجيل كوكي جروبك اولا😢**`)
    })
}

module.exports.details = {
    name: 'time',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to know the time of robux',
    usage:`${prefix.prefix}time`,
    guildOnly: true,
    owners: false,
}