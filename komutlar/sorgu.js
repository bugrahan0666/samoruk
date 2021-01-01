const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r => ["383627939989946369"].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.").then(x => x.delete({timeout: 5000}));
 
 let kullanıcı = message.mentions.users.first()
    
 
if(!kullanıcı) {
let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
let kadın = db.fetch(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setAuthor(message.author.username)
.setDescription(`˃ Toplam Kayıtların: \`${kayıtlar}\`
˃ Toplam Erkek Kayıtların: \`${erkek}\`
˃ Toplam Kadın Kayıtların: \`${kadın}\``)
.setColor('RANDOM')
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setAuthor(`${kullanıcı.username}`)
.setDescription(`˃ Toplam Kayıtlar: \`${kayıtlar1}\`
˃ Toplam Erkek Kayıtlar: \`${erkek1}\`
˃ Toplam Kadın Kayıtlar: \`${kadın1}\``)
 return message.channel.send(sorgu2)
  
};
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat", "kayıtlar", "kayıt-kontrol"],
    permLvl: 0,
}
  
exports.help = {  
  name: "stat"
}