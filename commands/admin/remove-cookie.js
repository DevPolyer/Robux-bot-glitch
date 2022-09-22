const discord = require ("discord.js");
const prefix = require('../../config/config.json');
const noblox = require("noblox.js");

module.exports.run = async (client, message, args) => {
  await client.database.servers.setGuild(message.guild.id);
  const data = await client.database.servers.findOne({guildId: message.guild.id});

  const cookie = data.cookie 

  if (!cookie) return message.replyNoMention(`**لم يتم تسجيل اي كوكي بالفعل**`);

  await noblox.setCookie(cookie).then(u => {
    data.cookie = "";
    data.save();
    message.replyNoMention(`**تم مسح الكوكي بنجاح**`)
  }).catch(e => {
    message.replyNoMention(`**لم يتم تسجيل اي كوكي بالفعل**`);
  })
}

module.exports.details = {
    name: 'remove-cookie',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to remove your cookie from the bot',
    guildOnly: true,
    usage:`${prefix.prefix}remove-cookie`,
    owners: true,
}