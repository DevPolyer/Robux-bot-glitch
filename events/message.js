const fs = require('fs');
const { Admin } =  require("../config/config.json")

module.exports = async (client, message) => {
    if (message.author.bot) return;
   // await client.database.users.setUser((message.mentions.members.first())? (message.mentions.members.first().id) : (message.author.id));
    await client.database.users.upDateProfile(message.author, message.guild).then(async user => {
      message.author.data = user
    })
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    const cmd = client.commands.get(command);
    if (!cmd) return;

    const stuts = fs.readFileSync('config/settings.json', "utf-8").includes(command)
    if (stuts) return message.replyNoMention(`**هذا الامر مقفل  😢**`);

    if (cmd.details.owners && !message.member.permissions.has("ADMINISTRATOR")) return;
    
    if (message.content == client.config.prefix+'index') return;

    
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