exports.run = {
   async: async (m, {
      clips,
      groupSet,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.antisticker && !isAdmin && isBotAdmin && /stickerMessage/.test(m.mtype)) {
          m.reply('*[ ! ] Terdeteksi kamu mengirim sticker*').then(() => clips.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender
               }
            }))
          }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   cache: true,
   location: __filename
}