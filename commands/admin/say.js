const prefix = require('../../config/config.json');
const { MessageEmbed } = require("discord.js");


module.exports.run = async(client, message, args) =>{
     
    message.replyNoMention(`
      #1: **message**\n#2: **embed**\n#3: **end**
    `).then(main => {
        getType(message, main)
    })
  

}

module.exports.details = {
    name: 'say',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'say command',
    usage:`${prefix.prefix}say`,
    guildOnly: true,
    whitelist: false,
}

async function getType(message, main) {
    const filter = (m) => m.author.id === message.author.id && ["1", "2", "3"].includes(m.content.toString());
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {       
        if (collected.first().content.toString() === "1") {
            collected.first().delete()
          main.edit("قم بكتابه الرساله الخاصه بك")
          sayMessage(message, main)
        }
        if (collected.first().content.toString() === "2") {
            collected.first().delete()
            startEmbed(message, main)
        }
        else if (collected.first().content.toString() === "3"){
            main.delete()
            collected.first().delete()
        }
     }).catch(e => main.delete());
};

async function sayMessage(message, main) {
    const filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {       
        main.delete();
        message.channel.send(collected.first().content) 
        collected.first().delete()
        message.delete()
     }).catch(e => main.delete());
}

async function startEmbed(message, main) {
    const embed = new MessageEmbed();
    getColor(message, main, embed)
}

async function getColor(message, main, embed) {
 const filter = (reaction, user) => { return user.id === message.author.id; };

  main.edit("اختر اللون")
  main.react("🟢")
  main.react("🔴")
  main.react("⚪")
  main.react("🔵")
  main.react("🟣")
  main.react("🟡");

  main.awaitReactions(filter,{ max: 1, time: 60000, errors: ['time'] }).then(collected =>  {
    
    switch(collected.first()._emoji.name) {
        case "🟢" : embed.setColor('GREEN')
        break;
        case "🔴" : embed.setColor('RED')
        break;
        case "⚪" : embed.setColor('WHITE')
        break;
        case "🔵" : embed.setColor('BLUE')
        break;
        case "🟣" : embed.setColor('PURPLE')
        break;
        case "🟡" : embed.setColor('YELLOW')
    }
    main.reactions.removeAll()
	
    getTitle(message, main, embed)
  }).catch(e => main.delete())

}

async function getTitle(message, main, embed) {
    const filter = (m) => m.author.id === message.author.id;
    main.edit("قم بكتابه ال title")
    message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time'] }).then((collected) => {       
        collected.first().delete()
        embed.setTitle(collected.first().content+"\n\ ")
        main.edit("قم بكتابه ال description")
        getDescription(message, main, embed)
    }).catch(e => {main.delete()});
}

async function getDescription(message, main, embed) {
    const filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {       
        collected.first().delete();
        embed.setDescription("\n\ "+collected.first().content).setTimestamp()
        getImage(message, main, embed)
     }).catch(e => main.delete());
}

async function getImage(message, main, embed) {
    main.edit("هل تود وضع صوره `skip` [للتخطي]")
    const filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
        const content = collected.first().content;

        let a;
       if (collected.first().attachments) collected.first().attachments.forEach(value => {
            a = value.attachment
        });

        if (content === "skip") {
            collected.first().delete();
            message.channel.send(embed);
            message.delete()
            main.delete()
        }
        else {
        main.delete()
        collected.first().delete();
         embed.setImage(a || "https://cdn.discordapp.com/avatars/1015952224003829781/fdca647593b5cc818a68683f45d523eb.png?size=1024");
         message.channel.send(embed);
         message.delete()
        }
    })  
}