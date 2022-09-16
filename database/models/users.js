const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  coins: {type: Number, default:0},
  booster: Boolean,  
  createAt: Date,
});

usersSchema.statics.upDateProfile = async function(user, guild) {
  const userId = user.id;
  const guildId = guild.id;
   
  const oldOldoldData = await this.findOne({userId});
  const oldData = await this.findOne({userId, guildId});

   if (oldData) {
    if (oldOldoldData && !oldOldoldData.guildId) {
      console.log("editing")
      oldData.coins = oldOldoldData.coins;
      oldData.booster = oldOldoldData.booster;
      oldData.save();
      oldOldoldData.delete();
      return oldData
    }else {
      return oldData
    }
   }

  if (!oldData) {
    await this.create({userId, guildId});
    return  await this.findOne({userId, guildId});
  }
} 

usersSchema.statics.setUser = async function (userId) {
  const oldData = await this.findOne({userId});
  if(!oldData) await this.create({userId});
}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;