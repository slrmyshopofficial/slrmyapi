exports.run = {
   noxious: ['setmenu'],
   use: '(option)',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
      let teks = `• *Example* : ${isPrefix + command} 1`
         let setting = global.db.setting
         if (!args || !args[0]) {
            clips.reply(m.chat, teks, m)
         } else {
            clips.sendMessageModify(m.chat, `Menu bot berhasil disetel menggunakan style *${args[0]}*.`, m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/a776ddaf7bed1e3eb627b.jpg'}).then(() => setting.menuStyle = parseInt(args[0]))
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true
}