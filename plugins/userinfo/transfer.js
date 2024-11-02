exports.run = {
   noxious: ['transfer'],
   hidden: ['tf'],
   use: '@tag amount',
   category: 'user info',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      if (m.quoted) {
         if (m.quoted.isBot) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat melakukan transfer ke bot.`), m)
         if (!args || !args[0]) return clips.reply(m.chat, Func.texted('bold', `Sediakan point nominal yang akan ditransfer.`), m)
         if (isNaN(args[0])) return clips.reply(m.chat, Func.texted('bold', `Point harus berupa angka.`), m)
         let nominal = parseInt(args[0])
         let ppn = parseInt(((25 / 100) * nominal).toFixed(0))
         let point = global.db.users.find(v => v.jid == m.sender).point
         let target = clips.decodeJid(m.quoted.sender)
         if (target == m.sender) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat mentransfer ke diri sendiri.`), m)
         if (nominal > point) return clips.reply(m.chat, Func.texted('bold', `Point Anda tidak cukup untuk melakukan transfer.`), m)
         if ((nominal + ppn) > point) return clips.reply(m.chat, Func.texted('bold', `Point Anda tidak cukup untuk membayar biaya transfer sebesar 25%`), m)
         if (nominal < 10000) return clips.reply(m.chat, Func.texted('bold', `Point nominal untuk transfer minimal 10K.`), m)
         global.db.users.find(v => v.jid == m.sender).point -= (nominal + ppn)
         global.db.users.find(v => v.jid == target).point += nominal
         let teks = `⼷  *T R A N S F E R*\n\n`
         teks += `“Transfer successfully to *@${target.replace(/@.+/g, '')}*”\n\n`
         teks += `➾ *Nominal* : ${Func.formatNumber(nominal)}\n`
         teks += `➾ *Fee* : ${Func.formatNumber(ppn)} [25%]\n`
         teks += `➾ *Remaining Balance* : ${Func.formatNumber(global.db.users.find(v => v.jid == m.sender).point)}`
         clips.sendMessageModify(m.chat, teks, m, {
             largeThumb: true,
             thumbnail: 'https://telegra.ph/file/21dec0bc859f88b46c0de.jpg'})
      } else if (m.mentionedJid.length != 0) {
         if (!args || !args[1]) return clips.reply(m.chat, Func.texted('bold', `Sediakan point nominal yang akan ditransfer.`), m)
         if (isNaN(args[1])) return clips.reply(m.chat, Func.texted('bold', `Point harus berupa angka.`), m)
         let nominal = parseInt(args[1])
         let ppn = parseInt(((25 / 100) * nominal).toFixed(0))
         let point = global.db.users.find(v => v.jid == m.sender).point
         let target = clips.decodeJid(m.mentionedJid[0])
         if (target == clips.decodeJid(clips.user.id)) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat melakukan transfer ke bot.`), m)
         if (target == m.sender) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat mentransfer ke diri sendiri.`), m)
         if (nominal > point) return clips.reply(m.chat, Func.texted('bold', `Point Anda tidak cukup untuk melakukan transfer.`), m)
         if ((nominal + ppn) > point) return clips.reply(m.chat, Func.texted('bold', `Point Anda tidak cukup untuk membayar biaya transfer sebesar 25%`), m)
         if (nominal < 10000) return clips.reply(m.chat, Func.texted('bold', `Point nominal untuk transfer minimal 10K.`), m)
         global.db.users.find(v => v.jid == m.sender).point -= (nominal + ppn)
         global.db.users.find(v => v.jid == target).point += nominal
         let teks = `⼷  *T R A N S F E R*\n\n`
         teks += `“Transfer successfully to *@${target.replace(/@.+/g, '')}*”\n\n`
         teks += `➾ *Nominal* : ${Func.formatNumber(nominal)}\n`
         teks += `➾ *Fee* : ${Func.formatNumber(ppn)} [25%]\n`
         teks += `➾ *Remaining Balance* : ${Func.formatNumber(global.db.users.find(v => v.jid == m.sender).point)}`
         clips.sendMessageModify(m.chat, teks, m, {
             largeThumb: true,
             thumbnail: 'https://telegra.ph/file/4d130d601fb97257013be.jpg'})
      } else {
         let teks = `• *Example* :\n\n`
         teks += `${isPrefix + command} @0 10000\n`
         teks += `${isPrefix + command} 10000 (reply chat target)`
         clips.reply(m.chat, teks, m)
      }
   },
   error: false,
   group: true
}