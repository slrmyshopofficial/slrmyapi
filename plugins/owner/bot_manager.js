const fs = require('fs')
exports.run = {
   noxious: ['-auth', '+auth'],
   use: 'mention or reply',
   category: 'auth bot',
   async: async (m, {
      clips,
      text,
      command
   }) => {
      try {
         let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
         if (!input) return clips.reply(m.chat, Func.texted('bold', `🚩 Mention or reply chat target.`), m)
         let p = await clips.onWhatsApp(input.trim())
         if (p.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Invalid number.`), m)
         let jid = clips.decodeJid(p[0].jid)
         let number = jid.replace(/@.+/, '')
         if (command == '-auth') {
            let user = global.db.users.find(v => v.jid == jid)
            if (!user) return m.reply(Func.texted('bold', `🚩 User not found.`))
            user.authentication = false
            if (global.db.bots.length < 1) return m.reply(Func.texted('bold', `🚩 No connected bots.`))
            let found = global.db.bots.find(v => v.jid == jid) || global.db.bots.find(v => v.sender == jid) || false
            if (!found) return m.reply(Func.texted('bold', `🚩 Session not found.`))
            fs.rmSync(`./media/sessions/${number}`, {
               recursive: true,
               force: true
            })
            Func.removeItem(global.db.bots, found)
            m.reply(Func.texted('bold', `✅ Session deleted successfully.`))
         } else {
            let found = global.db.users.find(v => v.jid == jid)
            if (!found) return m.reply(Func.texted('bold', `🚩 User not found.`))
            found.authentication = true
            m.reply(Func.texted('bold', `✅ Successfully granted permission to authenticate.`))
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   owner: true,
}