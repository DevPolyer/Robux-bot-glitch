const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  commands: [],
  by: String,
});

whitelistSchema.statics.set = async function(id, message, array) {
  const userId = id;
  const guildId = message.guild.id;
  const by = message.author.id;
  const commands = array;

  const oldData = await this.findOne({userId, guildId});

  if (oldData) {
    oldData.commands = []
    oldData.commands.push(...commands)
    oldData.save()
  }
  else {
    await this.create({userId, guildId, by, commands: [...array] })
  }
}

whitelistSchema.statics.get = async function(id, message) {
  const userId = id;
  const guildId = message.guild.id;
  const by = message.author.id;

  const oldData = await this.findOne({userId, guildId});

  if (oldData) {
    return oldData
  }
  else {
    await this.create({userId, guildId, by})
    return await this.findOne({userId, guildId});
  }
}


const whitelist = mongoose.model("Whitelist", whitelistSchema);

module.exports = whitelist;