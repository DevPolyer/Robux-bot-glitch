const prefix = require('../../config/config.json');
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) =>{

    await client.database.servers.setGuild(message.guild.id);
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter(`all guild info`);

    data2.owner ? embed.addField(`مستلم الارباح`, `<@${data2.owner}>`) :  embed.addField(`مستلم الارباح`, `<@${message.guild.ownerID}>`)
    data2.price ? embed.addField(` سعر الروبوكس`, "```"+`${data2.price}`+"```") :  embed.addField(`سعر الروبوكس`, "```"+`1000`+"```")
    data2.groupId ? embed.addField(`اي دي الجروب`, "```"+`${data2.groupId}`+"```") :  embed.addField("اي دي الجروب", "```"+`اي دي الجروب`, `لم تم تسجيله بعد`+"```")
    data2.limit.transfer ? embed.addField(`الحد الاقصي للتحويل فقط`, "```"+`${data2.limit.transfer}`+"```") :  embed.addField(`الحد الاقصي للتحويل فقط`, "```"+`5`+"```")
    data2.limit.buy ? embed.addField(`الحد الاقصي للشراء فقط`, "```"+`${data2.limit.buy}`+"```") :  embed.addField(`الحد الاقصي للشراء فقط`, "```"+`5`+"```")

    embed.setDescription(`
     **روم الاثباتات** \n\ <#${data2.proofchannel? data2.proofchannel : "لم يتم تسجيله بعد"}> 
     \n\ **روم الشكر**  \n\ <#${data2.thanksChannel? data2.thanksChannel : "لم يتم تسجيله بعد"}> \n\ 
     **روم اللوج**  \n\ <#${data2.logsChannel? data2.logsChannel : "لم يتم تسجيله بعد"}> \n\ 
     **رول  العميل**  \n\ <@${message.guild.roles.cache.get(data2.clientRole || "1") ? data2.clientRole : "لم يتم تسجيلها بعد"}>
    `)

    message.replyNoMention(embed)
    
}

module.exports.details = {
    name: 'info',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'all guild info',
    usage:`${prefix.prefix}info`,
    guildOnly: true,
    whitelist: true,
}