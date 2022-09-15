const config = require("../config/config.json")
const vers = require("../config/version.json")
const discord = require('../bot')
var figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = (client) => {
    console.clear()
    console.log('Launched Succesfully...')
    console.log('Version:',`${vers.ver}`)
    console.log('Prefix:',`${config.prefix}\n`)
    console.log(`${discord.client.user.username}`,`is online!`)
    console.log(`Dashboard:`,`http://localhost:`+config.port)

}