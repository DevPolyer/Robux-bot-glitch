const prefix = require('../../config/config.json');
const discord = require('discord.js');
const noblox = require("noblox.js");

module.exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setTimestamp()
  
    await noblox.getIdFromUsername(args[0]).then(async clientId => {
        let thumbnail_default = await noblox.getPlayerThumbnail(clientId, 420, "png", true, "Headshot")
        embed.setImage(thumbnail_default[0].imageUrl)
        message.replyNoMention(embed)
    }).catch(e => {
        message.replyNoMention(`**لا يمكنني العثور علي هذا المستخدم في روبلوكس 🤷‍♂️**`)
    })
}

module.exports.details = {
    name: 'avatar',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'get your roblox skin',
    usage:`${prefix.prefix}avatar (username)`,
    example: `${prefix.prefix}avatar ziademad2008`,
    guildOnly: true,
    owners: false,
    args: true,
}