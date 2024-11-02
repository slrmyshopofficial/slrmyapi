exports.run = {
   noxious: ['claim'],
   category: 'user info',
   async: async (m, {
      clips
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      let timeClaim = 86400000
      let claimed = new Date(user.lastclaim + timeClaim)
      let timeout = claimed - new Date()
      if (new Date - user.lastclaim > timeClaim) {
         clips.sendMessageModify(m.chat, Func.texted('bold', `Selamat Kamu Mendapatkan Point 5M Dan 50 Limit Telah Di Claim.`), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/771afc32a30af926c5005.jpg')
         })
         user.point += 5000000
         user.limit += 50
         user.lastclaim = new Date() * 1
      } else {
         clips.sendMessageModify(m.chat, Func.texted('bold', `Kamu sudah melakukan claim sebelumnya silahkan claim kembali di jam berikutnya*\n\n*🕒 : ${Func.toTime(timeout)}️`), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/a130779815ab19f25a040.jpg')
         })
      }
   },
   error: false,
   group: true
}
