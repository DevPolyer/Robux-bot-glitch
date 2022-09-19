const prefix = require('../../config/config.json');
const discord = require('discord.js');
const noblox = require('noblox.js');
const ms = require('ms');
const WorkingDays = require('moment-working-days');
const axios = require('axios')

module.exports.run = async(client, message, args) =>{

    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const price = data2.price;

    if (!args[0].isPositiveInteger()) return message.replyNoMention(`**الرجاء كتابه عدد صحيح ▫**`);
    const withProBotTax = parseInt(args[0] * price * 20 / 19 +1)
    const withoutProBotTax = parseInt(args[0] * price);


        const embed = new discord.MessageEmbed()
        .setTitle("Tax")
        .setColor("RANDOM")
        .addFields([
            {name: "** ضريبه مبلغ **", value: ` \`\`\` ${args[0]} \`\`\` `},
            {name: "**سعره بدون ضريبه**", value: ` \`\`\` ${withoutProBotTax} \`\`\` `},
            {name: "**سعره مع الضريبه**", value: ` \`\`\` ${withProBotTax} \`\`\` `},
        ])
        .setAuthor(message.author.username, message.author.avatarURL())
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()

        message.replyNoMention(embed)
  

    
}

module.exports.details = {
    name: 'tax',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'robux tax',
    usage:`${prefix.prefix}tax`,
    guildOnly: true,
    owners: false,
    example:`${prefix.prefix}tax 10`,
    args: true,
}