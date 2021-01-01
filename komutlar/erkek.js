const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run =  async (client, message, args) => {
  
if(![ayarlar.register].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
const erkekrol = message.guild.roles.cache.find(r => r.id === '788615678751014963') //erkekrol ismini değişmeyin
const erkekrol2 = message.guild.roles.cache.find(r => r.id === '794289886785044551')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '783346366188355624')


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.').then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.').then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.').then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({timeout: 5000}));
  
if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 datab.add('case', 1)
 const phentosss = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
 let isim = message.mentions.members.first() || message.guild.members.get(args[0]);//Useri tanımladık
 var sayi = 1 //Sıralam için sayı tanımladık
 let data = datab.get(`isim.${message.guild.id}`)//İsim verisini data diye tanımladık
 let rol = datab.fetch(`rol.${message.guild.id}`)
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>), (<@&${x.role2}>)`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
  
let tag = '•' 
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirt.')
if(!age) return message.channel.send('Bir yaş belirt.')
  
datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkekrol)
member.roles.add(erkekrol2)
member.roles.remove(kayıtsız)


const embed = new Discord.MessageEmbed()
.setDescription(`
• ${member}, ${message.author} Tarafından Kayıt Edildi.
• ${erkekrol} Rolleri Verildi.
• İsmi \`${tag} ${name} | ${age}\` Olarak Güncellendi.
• Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş

${isimler}
`) 
.setFooter(`${message.author.username} Toplam ${alldata} Kayıta Sahip.`)
.setColor("RANDOM")
message.channel.send(embed)
message.guild.channels.cache.get('783346545113694248').send(new Discord.MessageEmbed().setDescription(`${member} aramıza katıldı. Sunucumuz şuanda **${message.guild.memberCount}** kişi! KURALLARI OKUMAYI UNUTMA!`).setColor('RANDOM')).then(x => x.delete({timeout: 10000}))

  
datab.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: age,
  role: erkekrol.id,
  role2: erkekrol2.id,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }