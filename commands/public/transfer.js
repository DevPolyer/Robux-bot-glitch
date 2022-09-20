const noblox = require("noblox.js");
const prefix = require('../../config/config.json');
const axios = require("axios")

module.exports.run = async(client, message, args) =>{

    let user = message.author;
    await client.database.servers.setGuild(message.guild.id);
    const data = await message.data
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const coins = data.coins;
    const cookie = data2.cookie || "a";
    const groupId = data2.groupId || 1;
    const proofchannel = data2.proofchannel;
    const limit = data2.limit.transfer;

    if (!args[0] ||isNaN(args[0]) || args[0] < 1) return message.replyNoMention(`**لا يمكنك استخدام الامر بهذه الطريقه 😁**`);
    if (args[0] < limit) return message.replyNoMention(`**الحد الاقصي للتحويل هو ${limit}**`);
    if (args[0] > coins) return message.replyNoMention(`**رصيد الحالي لا يكفي لتحويل هذا المبلغ 😁**`);
    
    await noblox.setCookie(cookie).then(async (user) => {
      await noblox.getIdFromUsername(args[1]? args[1].toString() : null).then(async clientId => {
        await noblox.getGroup(groupId).then(async(group) => {

         const groups = [];;
          await noblox.getGroups(clientId).then(async result => await result.forEach(group => groups.push(group.Id)));
          if (!groups.includes(groupId)) return message.replyNoMention(`**انت غير متواجد في الجروب 😢😢**`);
          
          var currentfunds = await noblox.getGroupFunds(group.id);
          if (currentfunds < args[0]) return message.replyNoMention(`**عذرا هذا العدد من الروبوكس غير متوفر في الجروب في الوقت الحالي 😢**`);

          await noblox.groupPayout(group.id, clientId , args[0]).then(async() => {
             data.coins -= Number(args[0]);
             data.save();

             currentfunds = currentfunds - args[0];
             message.replyNoMention(`**تم تحويل  ${args[0] + " روبوكس "} الي حسابك** 💕`);
         
             const proochannel = await client.channels.cache.get(proofchannel);
             if (!proochannel) return;
             
             var options = {
              method: 'GET',
              url: `https://gold-psychedelic-fahrenheit.glitch.me/payout/${clientId}/${args[1]}/${args[0]}/${currentfunds}/${prefix.token}/${proochannel.id}/**bought by** <@!${message.author.id}>`,
            }
             axios.get(options.url)

        }).catch(e => {
          console.log(e)
            message.reply(`**انت لم تتم اسبوعين في الجروب 😢🤔**`)
        })
      }).catch(e => {
        message.replyNoMention(`**هذا الامر مقفل حاليا 😢**`)
      })
     }).catch(e => {
       message.replyNoMention(`**لا يمكنني العثور علي هذا اللاعب في روبلوكس 😢🤔**`)
     });
    }).catch(e => {
        message.replyNoMention(`**هذا الامر مقفل حاليا 😢**`)
    });
    
}
module.exports.details = {
    name: 'transfer',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'transfer your coins to robux',
    usage:`${prefix.prefix}transfer (amount) (user)`,
    example:`${prefix.prefix}transfer 1 ziademad2008 `,
    guildOnly: true,
    args: true,
    author: true,
}