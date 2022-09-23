const prefix = require("../config/config.json");

module.exports = {
    name: "message",
    async execute(message, client) {
      if (message.channel.type === "dm") return

        const args = message.content.split(/ +/g);
        const cmd = args.shift();        
        var $cmdD = await client.database.commands.find()
        const command = $cmdD.find(e => e.short.includes(cmd) && e.guildId === message.guild.id)
        
        if (!command) return;
        message.content = `${prefix.prefix}${command.name} ${args.toString().replace(/\,/gi, " ")}`;
        return require("./message")(client, message);
        
    }
}