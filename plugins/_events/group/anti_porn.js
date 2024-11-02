const fs = require('fs')
exports.run = {
   async: async (m, {
      clips,
      groupSet,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (!m.fromMe && m.isGroup && groupSet.antiporn && /image/.test(m.mtype) && !isAdmin && isBotAdmin) {
            let sync = await Func.getFile(await m.download())
            const json = await Api.nexon('/porn-detector', {
                             url: fs.createReadStream(sync.file)
                        })
            if (json.status) return m.reply(Func.jsonFormat(json)).then(() => clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
         } else if (!m.fromMe && !m.isGroup && /image/.test(m.mtype)) {
            let sync = await Func.getFile(await m.download())
            const json = await Api.nexon('/porn-detector', {
                             url: fs.createReadStream(sync.file)
                        })
            if (json.status) return m.reply(Func.jsonFormat(json)).then(() => clips.updateBlockStatus(m.sender, 'block'))
         }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   cache: true,
   location: __filename
}