const mongoose = require('mongoose');

const BotsSchema = new mongoose.Schema({
   token: String,
   guildId: String,
});


BotsSchema.statics.addBot = async function(token, guildId) {
   await this.create({token, guildId});
}


const Bots = mongoose.model("Bots", BotsSchema);

module.exports = Bots;