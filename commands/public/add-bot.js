const prefix = require('../../config/config.json');
const discord = require('discord.js');
const newBot = new discord.Client();
const setBot  = require("../../bot.js");
const Bots = require("../../database/models/bots");

module.exports.run = async(client, message, args) =>{
  message.replyNoMention("**قم بارسال توكن البوت اذا ادخلت توكن خاطي لم يتم تشغيل البوت**").then(main => {
    getToken(main, message);
  })
}

module.exports.details = {
    name: 'add-bot',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'make your new bot',
    usage:`${prefix.prefix}add-bot (token)`,
    guildOnly: true,
    owners: false,
}

async function getToken(main, message) {
    const filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async (collected) => {
      const token = collected.first().content;
       const TokenData = await Bots.findOne({userId: message.author.id});
       if (TokenData) {
         collected.first().delete();
         message.delete();   
         message.replyNoMention("**يمكن لكل مستخدم الحصول علي بوت واحد فقط**")
       };
        
      collected.first().delete();
      setBot.setBot(newBot, token)
      main.delete();
      message.delete();
          
  
    }).catch(e => {
      console.log(e)
      main.delete()
    })
}
