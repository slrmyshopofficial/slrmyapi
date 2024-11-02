exports.run = {
   noxious: ['runtime'],
   hidden: ['run'],
   category: 'about',
   async: async (m, {
      clips
   }) => {
      let _uptime = process.uptime() * 1000
      let uptime = Func.toTimeV2(_uptime)
      clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi } 🔐 Running Time for : [ ${uptime} ]`), m)
   },
   error: false
}