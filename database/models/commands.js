const mongoose = require('mongoose');

const commandsSchema = new mongoose.Schema({
 name: String,
 guildId: String,
 disabled: {type: Boolean, default: false},
 allowMembers: [],
 disallowMember: [],
 short: [],
});

commandsSchema.statics.get = async function(name, guildId) {
    const commandData = await this.findOne({name, guildId});
    if (commandData) return commandData;
    if (!commandData) {
        await this.create({name, guildId})
        return await this.findOne({name, guildId});
    }
}

commandsSchema.statics.enable = async function(name, guildId) {
    const commandData = await this.findOne({name, guildId});

    if (commandData && !commandData.disabled) return
    if (commandData && commandData.disabled) {
        commandData.disabled = false;
        commandData.save()
    }
    if (!commandData) {
      await this.create({name, guildId})
    }
}

commandsSchema.statics.disable = async function(name, guildId) {
    const commandData = await this.findOne({name, guildId});

    if (commandData && !commandData.disabled) {
        commandData.disabled = true;
        commandData.save()
    }
    if (!commandData) {
      await this.create({name, guildId, disabled: true})
    }
}


const commands = mongoose.model("Commands", commandsSchema);

module.exports = commands;