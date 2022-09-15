const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
json = require('json-update');

const client = new Discord.Client();
require("discord-replys");
const config = require('./config/config.json')
const settings = require('./config/settings.json')
client.commands = new Enmap();
client.database = {
  users: require("./database/models/users"),
  servers: require("./database/models/guilds")
}

client.config = config;
client.cooldown = new Discord.Collection()
client.Buycooldown = new Discord.Collection()

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();


console.log('Loading Commands...')
for (file of fs.readdirSync("commands").filter(file => file !== "index.js")) {
  const cmd = require("./commands/"+file);
  console.log(`[+] ${cmd.details.name}`);
  client.commands.set(cmd.details.name, cmd);
}

client.on("ready", () => {
  client.user.setActivity('-help', { type: 'WATCHING' });
});

client.login(config.token)
require("./database/connect");
require('./utils/prototypes');
exports.client = client;
