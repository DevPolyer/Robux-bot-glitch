const prefix = require('../../config/config.json');
const discord = require('discord.js');
const newBot = new discord.client();
const { setBot } = require("../../bot.js");

module.exports.run = async(client, message, args) =>{

}

module.exports.details = {
    name: 'add-bot',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'make your new bot',
    usage:`${prefix.prefix}add-bot (token)`,
    guildOnly: true,
    owners: false,
}