const mongoose = require('mongoose');

const BotsSchema = new mongoose.Schema({
   token: String,
   userId: String,
});


BotsSchema.statics.addBot = async function(token, userId) {
   await this.create({token, userId});
}


const Bots = mongoose.model("Bots", BotsSchema);

module.exports = Bots;