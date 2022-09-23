const noblox = require("noblox.js");
const prefix = require('../../config/config.json');
const axios = require("axios");
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require("discord.js")

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

          check(message, args, group, clientId, data, client, currentfunds, proofchannel)
          // if (currentfunds < args[0]) return message.replyNoMention(`**عذرا هذا العدد من الروبوكس غير متوفر في الجروب في الوقت الحالي 😢**`);

   
      }).catch(e => {
        console.log(e)
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

function check(message, args, group, clientId, data, client, currentfunds, proofchannel) {


  message.replyNoMention(`> **هل انت متاكد من انك تريد تحويل ${args[0]} الي ${args[1]}**`).then(async main => {

    main.react("🟢");
    main.react("🔴");

    const yes = (reaction, user) => { return reaction.emoji.name === '🟢' && user.id === message.author.id};
    const no = (reaction, user) => { return reaction.emoji.name === '🔴' && user.id === message.author.id};

    const yesC = main.createReactionCollector(yes, { time: 15000 });
    const noC = main.createReactionCollector(no, { time: 15000 });

    yesC.once('collect', async (reaction, user) => {
      main.delete();
      yesC.stop();
      await noblox.groupPayout(group.id, clientId , args[0]).then(async() => {
        data.coins -= Number(args[0]);
        data.save();
  
        currentfunds = currentfunds - args[0];
        message.replyNoMention(`**تم تحويل  ${args[0] + " روبوكس "} الي حسابك** 💕`);
   
        const proochannel = await client.channels.cache.get(proofchannel);
        if (!proochannel) return;

            let th = await noblox.getPlayerThumbnail(parseInt(clientId), 420, "png", true, "Headshot").then(async(a) => {
              let url = "";
              a.forEach(avatar => url = avatar.imageUrl);   
      
            const canvas = createCanvas(991, 172);
            const ctx = canvas.getContext('2d')
            const background = await loadImage('https://cdn.glitch.global/8e162bb4-d4c3-4bbc-8811-ac29c822a781/pay%20image%201.png?v=1657613444619');
            ctx.beginPath();
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.font = '15px impact';
            ctx.fillStyle = 'black';
            ctx.fillText(args[0].toLocaleString().toString(), 802.5, 42.4);
            ctx.font = "650 16px impact";
            ctx.fillText(args[0].toLocaleString().toString(), 864.5, 82.5);
            ctx.fillText(currentfunds.toString(), 830.5, 105.7);
            ctx.font = "570 15.2px impact";
            ctx.fillText(args[1].toString(), 61, 35);
            ctx.font = '10px impact';
            ctx.fillStyle = 'Gray';
            ctx.fillText('Member', 65, 47);
            ctx.closePath();
            const userImage = await loadImage(url.toString());
            ctx.beginPath();
            ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 7;
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(userImage, 11.5,16.5,35,35);
            const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
            await proochannel.send(`تم الشراء بواسطه : <@${message.author.id}>`, attach)

          });

    
       }).catch(e => {
         message.reply(`**انت لم تتم اسبوعين في الجروب 😢🤔**`)
       })
    });

    noC.once("collect", () => main.delete());

    yesC.once("end", () => main.delete());
  })
}