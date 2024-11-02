const os = require('os')
exports.run = {
   noxious: ['server'],
   category: 'about',
   async: async (m, {
      clips
   }) => {
      try {
         const json = await Func.fetchJson('http://ip-api.com/json')
         delete json.status
         let caption = `〤  *{ SlrmyApi } 🔐 S E R V E R*\n\n`
         caption += `┌  ◦  OS : ${os.type()} (${os.arch()} / ${os.release()})\n`
         caption += `│  ◦  RAM : ${Func.formatSize(process.memoryUsage().rss)} / ${Func.formatSize(os.totalmem())}\n`
         for (let key in json) caption += `│  ◦  ${Func.ucword(key)} : ${json[key]}\n`
         caption += `│  ◦  UPTIME : ${Func.toTime(os.uptime * 1000)}\n`
         caption += `└  ◦  PROCESS BY : ${os.cpus()[0].model}\n\n`
         caption += global.footer
         clips.sendMessageModify(m.chat, caption, m, {
            ads: false,
            largeThumb: true,
            thumbnail: global.db.setting.cover
         })
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}