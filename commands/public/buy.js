const  { MessageEmbed } = require ("discord.js");
const prefix = require('../../config/config.json')

module.exports.run = async (client, message, args) =>{
 
    if (!message.channel.name.startsWith("ticket")) return message.replyNoMention(`**يمكن استخدام هذا الامر داخل التكت فقط**`)
    
    
    let user = message.author;
    await client.database.servers.setGuild(message.guild.id);
    const data = await message.data
    const data2 = await client.database.servers.findOne({guildId: message.guild.id});
     
    if (client.Buycooldown.has(`${message.author.id}-${message.guild.id}`)) return message.replyNoMention(`**لديك عمليه شراء بالفعل 😒**`);
    if (isNaN(args[0])) return message.replyNoMention(`**يجب عليك كتابه عدد صحيح 🤔**`);  
    if (args[0] > 1000) return message.replyNoMention(`**الحد الاقصي للشراء هو  👍1000**`)
    const coins = data.coins;
    const owner = data2.owner || message.guild.ownerID;
    const limit = data2.limit.buy || 5;
    const price = data2.price || 1000;
    const logs = await message.guild.channels.cache.get(data2.logsChannel || "1");
    const role = await message.guild.roles.cache.get(data2.clientRole);

    if (limit && limit > args[0]) return message.replyNoMention(`**الحد الاقصي للشراء ${limit}**`);
    
    let require = parseInt(args[0] * price * 20 / 19 + 1);
    let resived = parseInt(args[0] * price);
    
    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("GOLD")
    .setTitle("رساله شراء")
    .setDescription(`   قم بتحويل  الي  <@${owner}> مبلغ ${resived} \n\ 
       \`\`\` #credits ${owner} ${require} \`\`\`
       \n\
       **لانهاء عمليه الشراء اكتب end${prefix.prefix}**
    `)
    .setFooter(`لديك 5 دقائق للتحويل`)
    .setTimestamp()

    message.replyNoMention(embed).then(async (buyMessage) => {
        client.Buycooldown.set(`${message.author.id}-${message.guild.id}`, message.channel.id);
        const filter = m => m.author.id === '282859044593598464' && m.content.includes(resived) && m.content.includes(`<@!${owner}>`) ;
        const collector = message.channel.createMessageCollector(filter, {time: 300000 });

        collector.once("collect", async() => { 
            if (!client.Buycooldown.has(`${message.author.id}-${message.guild.id}`)) return buyMessage.delete().catch(e => {});
              
            data.coins = Number(+coins + +args[0]);
            data.save();
            
            client.Buycooldown.delete(`${message.author.id}-${message.guild.id}`);
            message.replyNoMention(`**تمت عمليه الشراء سوف يتم قفل التكت 😊❤**`);
          //  if (role)  message.author.roles.add(role)

            const channel = await client.channels.cache.get(message.channel.id);
            if (channel) {
                if (logs) logs.send(`**🟢  ${data.coins}روبوكس رصيده الحالي هو ${args[0]}بشراء <@${message.author.id}> قام **`)
                setTimeout(() => channel.delete(), 5000);
            }


        });

        collector.once("end", async () => {
         if (!client.Buycooldown.has(`${message.author.id}-${message.guild.id}`)) return buyMessage.delete().catch(e => {})
          buyMessage.delete().catch(e => {});
          client.Buycooldown.delete(`${message.author.id}-${message.guild.id}`);
          message.replyNoMention(`**لقد انتهي وقت التحويل 😒**`);
        })
    })
}

module.exports.details = {
    name: 'buy',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'buy coins to your balance',
    guildOnly: true,
    usage:`${prefix.prefix}buy (amount)`,
    example:`${prefix.prefix}buy 5`,
    args: true,
}