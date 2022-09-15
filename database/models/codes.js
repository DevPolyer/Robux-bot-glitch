const mongoose = require('mongoose');

const codesSchema = new mongoose.Schema({
   name: String,
   prize: Number,
   users: [],
   blacklisted: [],
   limit: Number,
   madeBy: String,  
});


codesSchema.statics.createCode = async function(name, limit, prize, madeBy) {
   await this.create({name, limit, prize, madeBy})
}

// usersSchema.statics.setUser = async function (userId) {
//   const oldData = await this.findOne({userId});
//   if(!oldData) await this.create({userId});
// }

const Codes = mongoose.model("Codes", codesSchema);

module.exports = Codes;