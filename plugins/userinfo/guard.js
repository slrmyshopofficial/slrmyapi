exports.run = {
   noxious: ['guard'],
   async: async (m, {
      clips,
      isPrefix
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.guard < 1) return clips.reply(m.chat, `Kamu tidak mempunyai guard.`, m)
      clips.sendMessageModify(m.chat, Func.texted('bold', `Kamu mempunyai guard sebanyak ${Func.h2k(Func.formatNumber(user.guard))} (${Func.formatNumber(user.guard)}).`), m, {
          largeThumb: true,
          thumbnail: 'https://telegra.ph/file/ba887bbfcec3755dc76b1.jpg'
      })
   },
   error: false
}