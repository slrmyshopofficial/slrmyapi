exports.run = {
   async: async (m, {
      clips,
      body,
      users,
      groupSet,
      setting,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.filter && !isAdmin && isBotAdmin && !m.fromMe) {
            let toxic = setting.toxic
            if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
               groupSet.member[m.sender].warning += 1
               let warning = groupSet.member[m.sender].warning
               if (warning > 9) return clips.sendMessageModify(m.chat, Func.texted('bold', `Amaran telah mencapai had : [ 10 / 10 ], selamat tinggal bossku!`), m, {
               largeThumb: true,
               thumbnail: ''}).then(() => {
                  clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
                     groupSet.member[m.sender].warning = 0
                     clips.sendMessage(m.chat, {
                        delete: {
                           remoteJid: m.chat,
                           fromMe: isBotAdmin ? false : true,
                           id: m.key.id,
                           participant: m.sender
                        }
                     })
                  })
               })
               return clips.sendMessageModify(m.chat, `⼷  *{ SlrmyApi } 🔐 Amaran Penggunaan Kata - Kata Kesat* \n\nAnda telah amaran sebanyak : [ ${warning} / 5 ]\n\nJika anda mencapai 10 amaran, maka anda akan dikeluarkan dari kumpulan ini secara langsung bossku!`, m, { 
               largeThumb: true,
               thumbnail: ''}).then(() => clips.sendMessage(m.chat, {
                  delete: {
                     remoteJid: m.chat,
                     fromMe: isBotAdmin ? false : true,
                     id: m.key.id,
                     participant: m.sender
                  }
               }))
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true
}
