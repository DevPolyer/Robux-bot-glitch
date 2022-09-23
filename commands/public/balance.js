const prefix = require('../../config/config.json')

module.exports.run = async(client, message, args) =>{
 
    const data = await message.data;
    const coins = data.coins;

    const user = await message.mentions.users.first() || message.author.id; 
    if (user.bot) return message.replyNoMention(`**البوتات ليس لديها روبوكس 😢😢**`);

    message.author.id === data.userId? message.replyNoMention(`**رصيدك الحالي هو ${coins} 👍**`) : message.replyNoMention(`**رصيد ${user.username} هو ${coins} 👍**`);
}

module.exports.details = {
    name: 'balance',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to Know yor current balance of robux',
    usage:`${prefix.prefix}Balance`,
    guildOnly: true,
}