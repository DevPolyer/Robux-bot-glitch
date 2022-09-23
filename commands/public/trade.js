const prefix = require('../../config/config.json')
const Captcha = require("@haileybot/captcha-generator");
const Discord = require("discord.js");

module.exports.run = async(client, message, args) =>{

    const db =  client.database.users;
    db.setUser(message.author.id, message.guild.id)
    const data = await db.findOne({userId: message.author.id, guildId: message.guild.id});

    const user = await message.guild.members.cache.get(args[0].toDiscordId());
    if (!user) return message.replyNoMention(`> **لايمكنني العثور علي هذا العضو**`);
    if (user.bot) return message.replyNoMention(`> **البوت ليس لديه حساب 🔴**`);
    db.setUser(user.id,  message.guild.id);
    const data2 = await db.findOne({userId: user.id, guildId: message.guild.id});

    const amount = args[1];

    if (!amount.isPositiveInteger()) return message.replyNoMention(`> **الرجاء كتابه عدد صحيح 🔴**`);
    if (amount > data.coins) return message.replyNoMention(`> ** ليس لديك هذا العدد من الروبوكس 🔴**`);

    function verifyHuman() {

        let captcha = new Captcha(100);
        message.channel.send(
            `** قم بالتاكيد لتحويل \`${amount}\` الي <@${user.id}>:**`,
            new Discord.MessageAttachment(captcha.JPEGStream, "statics.png")
        ).then(async main => {
            const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id,  {time: 20000 });
    
            collector.on("collect", m => {
                collector.stop();
                if (m.content.toUpperCase() === captcha.value) {
                    main.delete();

                    data.coins -= amount;
                    data.save();
                    data2.coins = +data2.coins + +amount;
                    data2.save();
                    m.delete()
                    message.replyNoMention(`**<@${user.id}> الي <@${message.author.id}> من قبل  \`${amount}\` تم تحويل**`)
                }
                else main.delete();
            });
         
            collector.on("end", () => main.delete());
        })
    }
     verifyHuman()
}

module.exports.details = {
    name: 'trade',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'trade with user ',
    usage:`${prefix.prefix}trade (user) (amount)`,
    example:`${prefix.prefix}trade 860865950945378325 100 `,
    guildOnly: true,
    args: true,
}

