const prefix = require('../../config/config.json');
const fs = require('fs')
const discord = require('discord.js');
const { Admin } =  require("../../config/config.json")

module.exports.run = async(client, message, args) => {
 
    if (args[0] && args[0] !== "help") {
        const command = await client.commands.get(args[0])
        if (!command) return message.replyNoMention(`**لا يمكنني العثور علي هذا الامر**`);
        const cmd = command
        
        if (cmd.details.owners  && !message.member.permissions.has("ADMINISTRATOR")) return;

        let embed = new discord.MessageEmbed()
        .setColor("Blue")
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle(`Help  commands`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setFooter(`${prefix.prefix}help (command) للمساعده مع الاوامر الاخري`);
        
        const stuts = fs.readFileSync('config/settings.json', "utf-8").includes(command.details.name)

        cmd.details.description? embed.addField(`**description**`, cmd.details.description) : null;
        cmd.details.usage? embed.addField(`**usage**`, cmd.details.usage) : null;
        cmd.details.example? embed.addField(`**example**`, cmd.details.example) : null;
        embed.addField("**status**", `${stuts?  "مغلق 🔴" : "مفتوح 🟢"}`)

        message.replyNoMention(embed)

    }else {

   let embed = new discord.MessageEmbed()
   .setColor("Blue")
   .setAuthor(message.author.username, message.author.avatarURL())
   .setTitle(`Help all commands`)
   .setThumbnail(message.guild.iconURL())
   .setTimestamp()
   .setFooter(`${prefix.prefix}help (command) للمساعده مع الاوامر`);
    
   const commands = [];

   client.commands.filter(e => e.category != 'dev' && !e.details.help ).forEach(cmd => {
    if (!cmd.details.owners) commands.push({ name: `\`${prefix.prefix}${cmd.details.name}\``, category: cmd.category });
    if (cmd.details.owners && message.member.permissions.has("ADMINISTRATOR")) commands.push({ name: `\`${prefix.prefix}${cmd.details.name}\``, category: cmd.category });
  });
  
  let general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
  let mod = commands.filter(cmd => cmd.category == 'admin' || cmd.category == 'code').map(cmd => cmd.name);

  if (general.length) embed.addField("**عامه**", general.join(', '));
  if (mod.length) embed.addField(`**اداره**`, mod.join(","))
  
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