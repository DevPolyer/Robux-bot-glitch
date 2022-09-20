const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  coins: {type: Number, default:0},
  booster: Boolean,  
  createAt: Date,
});

usersSchema.statics.get = async function(message, type) {
   var userId = message.mentions.users.first()|| message.author;
   var guildId = message.guild.id; 
   
   if (!userId || userId.bot) return;
   type.author? userId = message.author.id : userId = userId.id;
    

  const Data = await this.findOne({userId, guildId});

  if (Data) {
    
    return message.data = Data
  };

  if (!Data) {
    await this.create({userId, guildId});
    return message.data  = await this.findOne({userId, guildId});
  }

} 

usersSchema.statics.setUser = async function (userId) {
  const oldData = await this.findOne({userId});
  if(!oldData) await this.create({userId});
}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;