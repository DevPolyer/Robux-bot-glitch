const discord = require ("discord.js");
const prefix = require('../config/config.json')

module.exports.run = async (client, message, args) =>{
  
}

module.exports.details = {
    name: 'blackliste',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'to add users to blacklist',
    guildOnly: true,
    usage:`${prefix.prefix}blackliste (code)`
}