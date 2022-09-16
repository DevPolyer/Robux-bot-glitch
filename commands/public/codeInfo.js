const discord = require ("discord.js");
const prefix = require('../../config/config.json')
const codesSchema = require('../../database/models/codes');

module.exports.run = async (client, message, args) =>{
  const codename = args[0];
  if (codename.includes(" ")) return message.replyNoMention(`**لا يمكنك استعمال المسافات مع اسم الكود 😊**`);

  const code = await codesSchema.findOne({name: codename});
  if (!code) return message.replyNoMention(`**هذا الكود غير موجود او منتهي 😢**`);

  let embed = new discord.MessageEmbed()
  .setColor('Blue')
  .setAuthor(message.author.username+message.author.discriminator, message.author.avatarURL())
  .setTitle("info")
  .addFields([
    {name: "**اسم الكود**", value: `**${code.name}**`},
    {name: `**عدد مستخدمين الكود**`, value: `**${code.users.length}**`},
    {name: `**الحد الاقصي لاستخدام الكود**`, value:`**${code.limit}**`},
    {name: "**جائزه من يستعمل هذا الكود**", value: `**${code.prize}**`},
    {name: "**صانع الكود**", value: `**<@${code.madeBy}>**`},
  ])
  .setThumbnail(message.guild.iconURL())
  .setTimestamp()
  .setFooter(`يمكن ل ${code.limit - code.users.length} استعمال هذا الكود`);

  message.replyNoMention(embed)
}

module.exports.details = {
    name: 'codeinfo',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'get all code information',
    guildOnly: true,
    usage:`${prefix.prefix}codeinfo (code)`,
    example:`${prefix.prefix}codeinfo 5k-members`,
    args: true,
}