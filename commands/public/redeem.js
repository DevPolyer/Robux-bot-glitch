const discord = require ("discord.js");
const prefix = require('../../config/config.json')
const codesSchema = require('../../database/models/codes');

module.exports.run = async (client, message, args) =>{
  const codename = args[0];
  if (codename.includes(" ")) return message.replyNoMention(`**لا يمكنك استعمال المسافات مع اسم الكود 😊**`);

  const code = await codesSchema.findOne({name: codename, guildId: message.guild.id});
  if (!code) return message.replyNoMention(`**هذا الكود غير موجود او منتهي 😢**`);

  if (code.users.length >= code.limit) {
    message.replyNoMention(`**هذا الكود غير موجود او منتهي 😢**`);
    return code.delete({name: codename})
  };
 
  const user = await message.data

  if (code.users.includes(message.author.id)) return message.replyNoMention(`**لقد قمت باستعمال هذا الكود بالفعل**`)
  user.coins += code.prize;
  user.save();
 
  code.users.push(message.author.id)
  code.save();

  let embed = new discord.MessageEmbed()
  .setColor('Blue')
  .setDescription(`**تم استعمال الكود بنجاح 💕**`)

  message.replyNoMention(embed)
}

module.exports.details = {
    name: 'redeem',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'redeem a code',
    guildOnly: true,
    usage:`${prefix.prefix}redeem (code)`,
    example:`${prefix.prefix}redeem 5k-members`,
    args: true,
    author: true,
}