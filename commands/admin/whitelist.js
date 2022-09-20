const prefix = require('../../config/config.json');
const discord = require('discord.js');
const ownersSchema = require("../../database/models/whitelist");

module.exports.run = async(client, message, args) => {
    const user = await message.guild.members.cache.get(args[0].toDiscordId());
    if (!user) return message.replyNoMention(`**لا يمكنني العثور علي هذا العضو**`);
    if (user.bot) return message.replyNoMention(`**لا يمكنن للبوتات التحكم باوامر الاداره**`);
    if (user.id === message.guildID) return message.replyNoMention(`> **اونر السيرفر يستطيع التحكم في كل الاوامر بالفعل**`);

    const embed = new discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("RANDOM");

    function collect(m) {

        const filter = m2 => m2.author.id === message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
            const index = await commands.indexOf(collected.first().content);
            if (commands.length === 1) return;
            commands.splice(index, 1)            
            embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط  \n\ `yes` لتاكيد اضافه هذا العضو ك متحكم في هذه الاوامر فقط اكتب \n\ `no` للالغاء");
            m.edit(embed)
        })
    }

    if (!args[1]) {
      var commands = [];

      await client.commands.filter(cmd => cmd.details.whitelist).forEach((value, key) => {
        embed.setTitle(`الاوامر الذ يستطيع التحكم بها`);
        commands.push(key)
      });
      embed.setDescription(commands.join("\n\ ") + "\n\ \n\ لمسح اي امر من هذه الاوامر قم بكتابه اسمه فقط  \n\ `yes` لتاكيد اضافه هذا العضو ك متحكم في هذه الاوامر فقط اكتب \n\ `no` للالغاء");

      const filter = m => m.author.id === message.author.id;
      const yes$no_filter = m => m.author.id === message.author.id && ["yes", "no"].includes( m.content);
    
      const collector = message.channel.createMessageCollector(filter, { time: 30000 });
      const yes$no = message.channel.createMessageCollector(yes$no_filter, { time: 30000 });

      message.replyNoMention(embed).then(main => {
        collect(main)
        collector.on('collect', m => {
            
            if (main && commands.includes(m.content)) {
                collect(main)
                m.delete();
            }
        });

        yes$no.once("collect", m => {
            if (main && m.content === "yes") {
                main.delete()
                message.delete()
                message.replyNoMention(`**تم اضافه <@${user.id}> للتحكم في بعض الاوامر**`)
                ownersSchema.set(user.id, message, commands)
            }
            if (main && m.content === "no") {
                main.delete()
                message.delete()
            }
        })

        yes$no.on("end", m => {
            if (main) main.delete()
        })
      });

    }
    if (args[1] && args[1].toLowerCase() === "remove") {
     const userData = await ownersSchema.findOne({userId: user.id, guildId: message.guild.id})
     if (!userData) return message.replyNoMention(`**هذا العضو ليس لديه اي تحكمات بالبوت بالفعل😊**`)  
     userData.delete();
     message.replyNoMention(`**تم ازاله هذا العضو الان هو لا ليس لديه اي صلحيات لاي امر 😁**`);
    }
}

module.exports.details = {
    name: 'whitelist',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'add user to controll the bot with you',
    usage:`${prefix.prefix}whitelist (user) `,
    example:`${prefix.prefix}whitelist 860865950945378325 (none | remove) `,
    guildOnly: true,
    owners: true,
    args: true,
}