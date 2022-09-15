const mongoose = require('mongoose');

const guildsSchema = new mongoose.Schema({
  guildId: String,
  language: String,
  prefix: String,
  cookie: String,

  status: Boolean,
  proofchannel: String,
  thanksChannel: String,
  groupId: Number,
  price: Number,
  owner: String,
  thankschannel: Number,
  status: {
    buy: Boolean,
    transfer: Boolean,
    balance: Boolean
  },
  logsChannel: String,
  boostRole: String,
  limit: {
    buy: Number,
    transfer: Number,
  }
});

guildsSchema.statics.setLanguage = async function (guildId, language) {
  let oldData = await this.findOne({ guildId });
  if (language) language = language.toLowerCase();
  if (oldData) {
    oldData.language = language;
    return await oldData.save();
  } else {
    return await this.create({ guildId, language });
  }
}

guildsSchema.statics.setGuild = async function (guildId) {
  let oldData = await this.findOne({ guildId });
  if (oldData) return;
    return await this.create({ guildId});
  
};

const Guilds = mongoose.model("Guilds", guildsSchema);

module.exports = Guilds;