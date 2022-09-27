const mongoose = require('mongoose');

const codesSchema = new mongoose.Schema({
   name: String,
   guildId: String,
   prize: Number,
   users: [],
   blacklisted: [],
   limit: Number,
   madeBy: String,  
});


codesSchema.statics.createCode = async function(name, limit, prize, madeBy, message) {
   await this.create({name, limit, prize, madeBy, guildId: message.guild.id})
}

// usersSchema.statics.setUser = async function (userId) {
//   const oldData = await this.findOne({userId});
//   if(!oldData) await this.create({userId});
// }

const Codes = mongoose.model("Codes", codesSchema);

module.exports = Codes;