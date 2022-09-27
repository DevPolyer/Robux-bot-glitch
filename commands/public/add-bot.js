const prefix = require('../../config/config.json');
const discord = require('discord.js');
const newBot = new discord.Client();
const { setBot } = require("../../bot.js");
const Bots = require("../../database/models/bots");

module.exports.run = async(client, message, args) =>{
 
  message.replyNoMention("**قم بارسال توكن البوت**").then(main => {
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
    args: true,
}

async function getToken(main, message) {
    const filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
      const token = collected.first().content;
     
      
    }).catch(e => {
      main.delete()
    })
}
