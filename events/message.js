const fs = require('fs');
const { Admin } =  require("../config/config.json");
const ms = require("ms");
const ownersSchema = require(`../database/models/whitelist`);

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const guildData = await client.database.servers.findOne({guildId: message.guild.id}); 
  
    const bot = message.guild.members.cache.get(client.user.id);
    if (!bot.hasPermission(["SEND_MESSAGES", "MANAGE_MESSAGES", "VIEW_CHANNEL"])) return;
    if (guildData && guildData.thanksChannel) {
      const thxChannel = await message.guild.channels.cache.get(guildData.thanksChannel);
      if (thxChannel && message.channel.id === thxChannel.id) message.react("❤");
    }

    if (message.content.indexOf(client.config.prefix) !== 0) return 
  
    const args = message.content.slice(client.config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();
  
    const cmd = client.commands.get(command);
    if (!cmd) return;

    message.channel.startTyping();
    setTimeout(() =>  message.channel.stopTyping(), 5000)

    const key = message.channel.type !== "dm" ? `${message.author.id}-${message.guild.id}-${command}` : `${message.author.id}-${command}`;
    const cooldown = await client.cooldown.get(key);


    if  (cooldown) {
      if (!cooldown.replyied) message.replyNoMention(`يجب عليك الانتظار لمده (**${ms(cooldown.time - Date.now())}**) اعاده استخدام هذا لامر`).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })

      if (!cooldown.replyied)  client.cooldown.set(key, {
        time: cooldown.time,
        replyied: true
       })
       return
    }

    const adminAccess = await ownersSchema.findOne({userId: message.author.id, guildId: message.guild.id});

    const stuts = fs.readFileSync('config/settings.json', "utf-8").includes(command)
    if (stuts) return message.replyNoMention(`**هذا الامر مقفل  😢**`);

     if (cmd.details.owners && message.author.id !== message.guild.ownerID) return message.replyNoMention(`> **ليس لديك صلاحيات لاستخدام هذا الامر 😢**`);

    if (cmd.details.whitelist && message.author.id !== message.guild.ownerID) {
      if (!adminAccess || !adminAccess.commands.includes(command)) return message.replyNoMention(`> **ليس لديك صلاحيات لاستخدام هذا الامر 😢**`)
    }
    
    cmd.details.author? await client.database.users.get(message, { author: true }) : await client.database.users.get(message, { author: false })
     
    client.cooldown.set(key, {
      time: Date.now() + 20000,
      replyied: false
    })

    setTimeout(() => {
      client.cooldown.delete(key);
    }, 20000)    

    if (cmd.details.guildOnly && message.channel.type === 'dm') {
      return message.replyNoMention('**لا يمكن استخدام هذا الامر في الخاص**');
    }


    if (cmd.details.args && !args.length) {
      const help = await client.commands.get("help");
      args[0] = command;
      return help.run(client, message, args)
    }
   
    cmd.run(client, message, args);
};