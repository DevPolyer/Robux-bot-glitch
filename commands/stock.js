const prefix = require('../config/config.json');
const noblox = require('noblox.js')

module.exports.run = async(client, message, args) =>{
     
    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const cookie = data2.cookie;
    const groupId = data2.groupId;

    await noblox.setCookie(cookie).then(async (user) => {
        await noblox.getGroup(groupId).then(async g => {
          var currentfunds = await noblox.getGroupFunds(g.id);
          var revenueSummary = await noblox.getGroupRevenueSummary(g.id, "Year")
         message.replyNoMention(`**رصيد جروب ${g.name} الحالي هو ${currentfunds} \n\ الرصيد القادم هو ${revenueSummary.pendingRobux}**`)
    }).catch(e => {
      message.replyNoMention(`**هذا الامر مقفل حاليا 😢**`)   
    })
    }).catch(e => {
        message.replyNoMention(`**هذا الامر مقفل حاليا 😢**`)
    })
}

module.exports.details = {
    name: 'stock',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to Know current group funds',
    usage:`${prefix.prefix}stock`,
    guildOnly: true,
    owners: true,
}