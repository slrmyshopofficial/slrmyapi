exports.run = {
   noxious: ['admin'],
   async: async (m, {
      clips,
      text,
      isPrefix,
      command,
      participants
   }) => {
      try {
         return clips.groupParticipantsUpdate(m.chat, [m.sender], 'promote').then(res => clips.reply(m.chat, `${res.jid.replace(/@.+/, '')} sekarang admin.`, m))
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, global.status.error, m)
      }
   },
   group: true,
   owner: true,
   botAdmin: true
}