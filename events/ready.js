const config = require("../config/config.json")
const vers = require("../config/version.json")
const discord = require('../bot')
const discords = require("discord.js");

module.exports = (client) => {

 
    console.clear()
    console.log('Launched Succesfully...')
    console.log('Version:',`${vers.ver}`)
    console.log('Prefix:',`${config.prefix}\n`)
    console.log(`${discord.client.user.username}`,`is online!`)
    console.log(`Dashboard:`,`http://localhost:`+config.port)
    client.user.setActivity(`${config.prefix}help`, { type: 'WATCHING' });

    let embed = new discords.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`اعتذر على الإزعاج ، تم طرد البوت من السيرفر ♥
    بس يتوثق البوت دخله لأي سيرفر تبيه لكن الحين اعتذر ما يمديني اقدم على التوثيق و البوت داخل سيرفرات فيها اعضاء قليله
    `)
    .setTimestamp();

    client.guilds.cache.forEach(async server => {
        const ownerId = await server.members.cache.get(server.ownerID);

        if (server.memberCount < 30) {
          ownerId.send(embed)
           server.leave()
        }
       
    });

}