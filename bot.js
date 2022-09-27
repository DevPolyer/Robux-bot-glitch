const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const json = require('json-update');
const client = new Discord.Client();
require("discord-replys")


const config = require('./config/config.json')
const settings = require('./config/settings.json');
setBot(client, config.token)


async function setBot(client, token) {
  
client.commands = new Enmap();
client.database = {
  users: require("./database/models/users"),
  servers: require("./database/models/guilds"),
  commands: require("./database/models/commands")
}

client.config = config;
client.cooldown = new Discord.Collection()
client.Buycooldown = new Discord.Collection()

for (let file of fs.readdirSync("events")) {
  const event = require("./events/"+file);
  if (!event.name) client.on(file.split(".")[0], event.bind(null, client));
  if (event.name) client.on(event.name,  (...args) => event.execute(...args, client));
}

//console.log('Loading Commands...')
for (let folder of fs.readdirSync("commands").filter(folder => folder !== "index.js")) {
  for (let file of fs.readdirSync("commands/"+folder)) {
    const cmd = require("./commands/"+folder+"/"+file);
    cmd.category = folder;
    //console.log(`[+] ${cmd.details.name}`);
    client.commands.set(cmd.details.name, cmd);
  }
}


 client.login(token).catch(e => console.log)
  
}



(async () => {
const newBot = new Discord.Client()
const Bots = require("./database/models/bots");
const data = await Bots.find();  
 for (let child of data) {
 setBot(newBot, child.token);
   console.log("new bot add")
 }
})()


require("./database/connect");
require('./utils/prototypes');
exports.client = client;
module.exports.setBot = setBot;
