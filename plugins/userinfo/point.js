exports.run = {
   noxious: ['point'],
   category: 'user info',
   async: async (m, {
      clips,
      isPrefix
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.point < 1) return clips.reply(m.chat, `Anda tidak memiliki saldo, untuk mendapatkan saldo kirim *${isPrefix}claim*`, m)
      clips.sendMessageModify(m.chat, Func.texted('bold', `Kamu punya points ${Func.h2k(user.point)} (${(user.point)}).`), m, {
      largeThumb: true,
      thumbnail: 'https://telegra.ph/file/baaf6dfa2e12052d68230.jpg'})
   },
   error: false
}
