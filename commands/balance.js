const prefix = require('../config/config.json')

module.exports.run = async(client, message, args) =>{
 
    let user = message.author
    await client.database.users.setUser(user.id);
    const data = await client.database.users.findOne({userId: user.id});
    const coins = data.coins;
 
    return message.replyNoMention(`**رصيدك الحالي هو ${coins} 👍**`);
}

module.exports.details = {
    name: 'balance',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to Know yor current balance of robux',
    usage:`${prefix.prefix}Balance`,
    guildOnly: false,
}