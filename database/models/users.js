const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: String,
  coins: {type: Number, default:0},
  booster: Boolean,  
});

usersSchema.statics.setUser = async function (userId) {
  const oldData = await this.findOne({userId});
  if(!oldData) await this.create({userId});
}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;