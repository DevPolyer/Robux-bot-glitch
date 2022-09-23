const discord = require ("discord.js");
const prefix = require('../../config/config.json');
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {
  await client.database.servers.setGuild(message.guild.id);
  const data = await client.database.servers.findOne({guildId: message.guild.id});

  if (!args[0]) {
    let embed = new discord.MessageEmbed()
    .setColor("Blue")
    .setAuthor(message.author.username, message.author.avatarURL())
    .addFields([
      {name: `**cookie**`, value: ` \`\`\` ${prefix.prefix}set cookie (cookie)\`\`\` `},
      {name: `**group**`, value: ` \`\`\` ${prefix.prefix}set group (groupId)\`\`\` `},
      {name: `**proofchannel**`, value: ` \`\`\` ${prefix.prefix}set proofchannel (channel)\`\`\` `},
      {name: `**price**`, value: ` \`\`\` ${prefix.prefix}set price (price) \`\`\` `},
      {name: `**owner**`, value: ` \`\`\` ${prefix.prefix}set owner (user) \`\`\` `},
      {name: `**limit**`, value: ` \`\`\` ${prefix.prefix}set limit (buy | transfer) (number) \`\`\` `},
      {name: `**logs**`, value: ` \`\`\` ${prefix.prefix}set logs (channel) \`\`\` `},
      {name: `**logs**`, value: ` \`\`\` ${prefix.prefix}set thankschannel (channel) \`\`\` `},
      {name: `**balance of user**`, value: ` \`\`\` ${prefix.prefix}set balance (user) (+10 | -10)  \`\`\` `},
    ])
    .setTimestamp()
    
   return message.replyNoMention(embed)
  }

  if (args[0].toLowerCase() === "cookie" && args[1]) {
    if (data.cookie === args[1]) {
        message.delete();
        return message.replyNoMention(`**هذا الكوكي محدد  بالفعل 😂**`)
    };

   await noblox.setCookie(args[1]).then(async user => {

       data.cookie = args[1];
       data.save();

      message.delete()
      message.replyNoMention(`**تم تحديد الكوكي بنجاح**`)

   })
   .catch(e => {
    let embed = new discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`**الكوكي الذي ادخلته غير صحيح قم بتباع التعليمات للحصول علي كوكي صحيح **`)
    .setAuthor(message.author.username, message.author.avatarURL())
   // .setImage(`https://cdn.discordapp.com/attachments/1019914674940162068/1020988784667545600/IMG_20220918_112416.jpg`)
    .setTimestamp()
    message.replyNoMention(embed)
   })

  }


if (args[0].toLowerCase() === "group" && args[1]) {
    if (data.groupId && data.groupId.toString() === args[1]) {
        return message.replyNoMention(`** هذا الجروب محدد بالفعل 😂**`)
    };

   await noblox.setCookie(data.cookie || "a").then(async user => {
    await noblox.getGroup(args[1]).then(async (group) => {
      if (user.UserID !== group.owner.userId) return message.replyNoMention(`**الرجاء تحديد جروب تابع لك 😒**`);
      
      data.groupId = args[1];
      data.save();

      message.replyNoMention(`**تم تحديد الجروب بنجاح**`)

    }).catch(e => {
        message.replyNoMention(`**الرجاء تحديد id جروب صحيح 😊**`)
    })
   })
   .catch(e => {
    message.replyNoMention(`**الرجاء تحديد كوكي صالح للاستخدام 😒**`)
   })

}

if (args[0].toLowerCase() === "owner" && args[1]) {

  let user = await client.users.cache.get(args[1].toDiscordId())
  if (!user) return message.replyNoMention(`**لا يمكنني العثور علي هذا المستخدم** 😁`);
 
  if (data.owner === user.id) return message.replyNoMention(`**هذا هو مستلم الارباح بالفعل** 😊`);

  data.owner = user.id;
  data.save();

  message.replyNoMention(`**تم تحديث مستلم الارباح بنجاح**`);
}

if (args[0].toLowerCase() === "price" && args[1]) {
    if (isNaN(args[1])) return message.replyNoMention(`**الرجاء تحديد سعر صحيح**`);
    if (data.price === args[1]) return message.replyNoMention(`**هذا السعر محدد بالفعل**`);

    data.price = args[1];
    data.save();

    message.replyNoMention(`**تم تحديد السعر هو ${data.price}**`);
}

if (args[0].toLowerCase() === "proofchannel" && args[1]) {
  let channel = await client.channels.cache.get(args[1].toDiscordId());
  if (!channel) return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);
  if (channel.type !== "text") return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);

  data.proofchannel = channel.id;
  data.save();

  message.replyNoMention(`**تم تحديد روم الاثبات بنجاح**`);
}

if (args[0].toLowerCase() === "clientrole" && args[1]) {
  let role = await message.guild.roles.cache.get(args[1].toDiscordId());
  if (!role || ["@everyone", "here"].includes(role.name)) return message.replyNoMention(`**لا يمكنني العثور علي هذه الرول 😢**`);

  data.clientRole = role.id;
  data.save();

  message.replyNoMention(`**تم تحديد رول المشتري بنجاح**`);
}


if (args[0].toLowerCase() === "balance" && args[1]) {

  let embed = new discord.MessageEmbed()
  .setColor("Blue")
  .setDescription(`**${prefix.prefix}set balance (user) (+10 | -10)**`)

  if (!args[2] || !args[2] || !args[2].trim(" ").slice(1).isPositiveInteger()) return message.replyNoMention(embed);

  let user = await client.users.cache.get(args[1].toDiscordId());
  if (!user) return message.replyNoMention(`**لا يمكنني العثور علي هذا المستخدم**`);

  var userData = await message.data;

  if (message.content.slice(1).includes("+")) {
    userData.coins += Number(args[2].trim(" ").slice(1));
    userData.save();

   return message.replyNoMention(`**تم تحديث رصيده بنجاح \n\ رصيده الحالي هو ${userData.coins}**`)
  }
  if (message.content.slice(1).includes("-")) {
    userData.coins -=  Number(args[2].trim(" ").slice(1));
    userData.save();

    return message.replyNoMention(`**تم تحديث رصيده بنجاح \n\ رصيده الحالي هو ${userData.coins}**`)
  }
  else message.replyNoMention(embed)
  
};

if (args[0].toLowerCase() === "limit" && args[1]) {
 let helpEmbed = new discord.MessageEmbed()
 .setColor("Blue")
 .setDescription(`**${prefix.prefix}set limit (buy | transfer) (number)**`)

 if (!['buy', "transfer"].includes(args[1])) return message.replyNoMention(helpEmbed);
 if (!args[2] || !args[2].isPositiveInteger() ) return message.replyNoMention(helpEmbed);

 if (data.limit[args[1]] === args[2]) return message.replyNoMention(`> **الحد الاقصي ل هذا الامر محدد هكذا بالفعل🤦‍♂️**`);

 data.limit[args[1]] = args[2];
 data.save();

 message.replyNoMention(`> \`${args[1]}\` **تم تحديد الحد الاقصي ل امر** 🟢`)

};

if (args[0].toLowerCase() === "logs" && args[1]) {
  const channel = await message.guild.channels.cache.get(args[1].toDiscordId());
  if (!channel) return message.replyNoMention(`> **الرجاء تحديد روم  صالح للاتسخدام**`);

  if (!channel) return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);
  if (channel.type !== "text") return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);

  data.logsChannel = channel.id;
  data.save();

  message.replyNoMention(`**تم تحديد روم الاثبات بنجاح**`);
}

if (args[0].toLowerCase() === "thankschannel" && args[1]) {
  const channel = await message.guild.channels.cache.get(args[1].toDiscordId());
  if (!channel) return message.replyNoMention(`> **الرجاء تحديد روم  صالح للاتسخدام**`);

  if (!channel) return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);
  if (channel.type !== "text") return message.replyNoMention(`**لا يمكنني العثور علي هذه الروم 😢**`);

  data.thanksChannel = channel.id;
  data.save();

  message.replyNoMention(`**تم تحديد روم الشكر بنجاح**`);
} 



}
module.exports.details = {
    name: 'set',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to setup the bot',
    guildOnly: true,
    usage:`${prefix.prefix}set`,
    whitelist: true,
}