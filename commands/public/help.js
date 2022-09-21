const prefix = require('../../config/config.json');
const fs = require('fs')
const discord = require('discord.js');
const { Admin } =  require("../../config/config.json")
const ownersSchema = require("../../database/models/whitelist");

module.exports.run = async(client, message, args) => {
 
    if (args[0] && args[0] !== "help") {
        const command = await client.commands.get(args[0])
        if (!command) return message.replyNoMention(`**لا يمكنني العثور علي هذا الامر**`);
        const cmd = command
        
        if (cmd.details.owners && message.author.id !== message.guild.ownerID) return message.replyNoMention(`> **يمكن للاونر فقط الاستعلام عن هذا الامر 😊**`);
        var commandData = await client.database.commands.get(cmd.details.name, message.guild.id);
        const adminAccess = await ownersSchema.findOne({userId: message.author.id, guildId: message.guild.id});
        if (cmd.details.whitelist && (!adminAccess || !adminAccess.commands.includes(cmd.details.name))) return message.replyNoMention(`> **لا يمكنك الاستعلام عن هذا الامر**`)

        let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle(`Help  commands`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setFooter(`${prefix.prefix}help (command) للمساعده مع الاوامر الاخري`);
        
        const stuts = fs.readFileSync('config/settings.json', "utf-8").includes(command.details.name);

        cmd.details.description? embed.addField(`**description**`, cmd.details.description) : null;
        cmd.details.usage? embed.addField(`**usage**`, cmd.details.usage) : null;
        cmd.details.example? embed.addField(`**example**`, cmd.details.example) : null;
        commandData.short.length > 0 ? embed.addField(`**shortcuts**`, `${commandData.short.join(", ")}`) : null
        embed.addField("**status**", `${commandData.disabled ?  "مغلق 🔴" :  "مفتوح 🟢" }`)

        message.replyNoMention(embed)

    }else {

   let embed = new discord.MessageEmbed()
   .setColor("RANDOM")
   .setAuthor(message.author.username, message.author.avatarURL())
   .setTitle(`Help all commands`)
   .setThumbnail(message.guild.iconURL())
   .setTimestamp()
   .setFooter(`${prefix.prefix}help (command) للمساعده مع الاوامر`);
    
   const commands = [];

   const adminAccess = await ownersSchema.findOne({userId: message.author.id, guildId: message.guild.id});

   client.commands.filter(e => e.category != 'dev' && !e.details.help ).forEach(cmd => {
   
        
    if (!cmd.details.whitelist && !cmd.details.owners) commands.push({ name: `\`${prefix.prefix}${cmd.details.name}\``, category: cmd.category });

    if ((cmd.details.whitelist && adminAccess && adminAccess.commands.includes(cmd.details.name)) ||  cmd.details.whitelist && message.author.id === message.guild.ownerID) {
        commands.push({ name: `\`${prefix.prefix}${cmd.details.name}\``, category: cmd.category });
    }
    if (cmd.details.owners) commands.push({ name: `\`${prefix.prefix}${cmd.details.name}\``, category: "owners" });
  });
  
  let general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
  let mod = commands.filter(cmd => cmd.category == 'admin' || cmd.category == 'code').map(cmd => cmd.name);
  let owners = commands.filter(cmd => cmd.category == 'owners').map(cmd => cmd.name);

  if (general.length) embed.addField("**عامه**", general.join(', '));
  if (mod.length) embed.addField(`**اداره**`, mod.join(", "))
  if (message.author.id === message.guild.ownerID &&  owners.length) embed.addField(`**اونرز**`, owners.join(", "))
  
  message.replyNoMention(embed)

 }

}

module.exports.details = {
    name: 'help',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'get help with this command',
    usage:`${prefix.prefix}help || ${prefix.prefix}help (command)`,
    guildOnly: true,
    help: true,
}