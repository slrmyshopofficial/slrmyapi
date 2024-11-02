exports.run = {
   noxious: ['limit'],
   category: 'user info',
   async: async (m, {
      clips,
      isPrefix,
   }) => {
   try {
   let _pp = 'https://telegra.ph/file/58637fb65348e50964e22.jpg'
   let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? clips.user.jid : m.sender
let pp = await clips.profilePictureUrl(who, 'image').catch(_ => './media/image/default.jpg')
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return clips.sendMessageModify(m.chat, `Limit penggunaan bot mu sudah habis dan akan di reset pada pukul 00.00 WIB\n\nUntuk mendapatkan lebih banyak limit upgrade ke premium kirim *${isPrefix}premium* atau membelinya dengan point menggunakan perintah *${isPrefix}buy*`, m, {
          ads: true,
          largeThumb: true,
          thumbnail: 'https://iili.io/JRKUhDF.jpg'})
      clips.sendMessageModify(m.chat, `🍟 Your limit : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nUntuk mendapatkan lebih banyak limit, tingkatkan ke pengiriman paket premium *${isPrefix}premium*` : ''}`, m, {
          ads: true,
          largeThumb: true,
          thumbnail: pp})
            } catch (e) {
    return clips.reply(m.chat, Func.jsonFormat(e))
    }
   },
   error: false
}