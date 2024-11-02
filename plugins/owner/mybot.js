const PhoneNumber = require('awesome-phonenumber')
const moment = require('moment-timezone')
exports.run = {
   noxious: ['mybot'],
   category: 'auth bot',
   async: async (m, {
      clips,
      text
   }) => {
      try {
         let found = global.db.bots.find(v => v.jid == m.sender) || global.db.bots.find(v => v.sender == m.sender) || false
         if (!found) return m.reply(Func.texted('bold', `🚩 You don't have a bot`))
         let caption = `⼷  *{ SlrmyApi }  SlrmyBot*\n\n`
         caption += `	◎  *Number* : ${PhoneNumber('+' + found.jid.split`@`[0]).getNumber('international')}\n`
         caption += `	◎  *Connected* : ${Func.switcher(found.is_connected, '√', '×')}\n`
         caption += `	◎  *Last Connect* : ${moment(found.last_connect).format('DD/MM/YY hh:mm')}\n\n`
         caption += global.footer
         clips.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('')
         })
      } catch {
         clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}