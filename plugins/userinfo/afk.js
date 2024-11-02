exports.run = {
   noxious: ['afk'],
   use: 'reason (option)',
   category: 'user info',
   async: async (m, {
      clips,
      text
   }) => {
         let users = global.db.users.find(v => v.jid == m.sender)
         users.afk = +new Date
         users.afkReason = text
         users.afkObj = m
         let pp = await clips.profilePictureUrl(m.sender, 'image').catch(_ => './media/image/default.jpg')
         let name = m.pushName
         let tag = m.sender.split`@` [0]
         let txt = `ㄡ *{ SlrmyApi } 🔐 AFK (Away From Keyboard)*\n\n`
         txt += `◎ *Nama Pengguna* : ${name}\n`
         txt += `◎ *Tanda Nama* : ${tag}\n`
         txt += `◎ *Dengan Alasan* : ${text ? '' + text : '{ Tiada Alasan'}`
         txt += `◎ { SlrmyApi } | @slrmyshopofficial\n`
         clips.sendMessageModify(m.chat, txt, m, {
         largeThumb: true,
         thumbnail: pp 
         }, { montions: m.sender })
   },
   error: false,
   group: true
}