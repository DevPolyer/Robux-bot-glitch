const prefix = require('../../config/config.json');
const noblox = require('noblox.js')
const discord = require('discord.js');

module.exports.run = async(client, message, args) =>{
     
    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const cookie = data2.cookie || "a";
    const groupId = data2.groupId || 1 ;
  
    await noblox.setCookie(cookie).then(async (user) => {
        await noblox.getGroup(groupId).then(async g => {
          var currentfunds = await noblox.getGroupFunds(g.id);
          var revenueSummary = await noblox.getGroupRevenueSummary(g.id, "Year")

          const embed = new discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(g.name)
          .setDescription(`** - اجمالي الروبوكس : (\`${currentfunds}\`) \n\ - القادم من روبوكس : (\`${revenueSummary.pendingRobux}\`) **`);
    
          message.replyNoMention(embed)

    }).catch(e => {
      message.replyNoMention(`**يجب عليك تسجيل اي دي الجروب😢**`)   
    })
    }).catch(e => {
        message.replyNoMention(`**يجب عليك تسجيل كوكي جروبك اولا😢**`)
    })
}

module.exports.details = {
    name: 'stock',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to Know current group funds',
    usage:`${prefix.prefix}stock`,
    guildOnly: true,
    whitelist: true,
}