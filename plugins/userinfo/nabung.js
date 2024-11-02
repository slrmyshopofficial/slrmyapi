const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   noxious: ['nabung', 'tarik', 'riwayattarik', 'riwayatnabung', 'tabungan'],
   category: 'user info',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'nabung') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.point == 0) return clips.reply(m.chat, Func.texted('bold', `Anda tidak memiliki point.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.texted('bold', `Masukan nominal harus berupa angka.`), m)
            if (args[0] < 10000) return clips.reply(m.chat, Func.texted('bold', `Minimal 10K poin untuk di tabung.`), m)
            if (args[0] > user.point) return clips.reply(m.chat, Func.texted('bold', `Point yang Anda miliki tidak cukup untuk di tabung.`), m)
            user.point -= parseInt(args[0])
            user.saving += parseInt(args[0])
            user.saving_history.push({
               sn: Func.makeId(5),
               nominal: parseInt(args[0]),
               type: 'NABUNG',
               date: new Date * 1
            })
            let teks = `⼷  *N A B U N G*\n\n`
            teks += `Berhasil menyimpan point menjadi tabungan dengan jumlah ${Func.formatNumber(args[0])}\n\n`
            teks += `➾ *Total* : ${Func.formatNumber(global.db.users.find(v => v.jid == m.sender).point)}\n`
            teks += `➾ *SN* : ${Func.makeId(5)}`
          clips.sendMessageModify(m.chat, teks, m, {
              largeThumb: true,
              thumbnail: 'https://telegra.ph/file/e109aef08a7b3dbe832a2.jpg'
           })
         } else if (command == 'tarik') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.saving == 0) return clips.reply(m.chat, Func.texted('bold', `Anda tidak punya tabungan.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.texted('bold', `Masukan nominal harus berupa angka.`), m)
            if (args[0] < 10000) return clips.reply(m.chat, Func.texted('bold', `Minimal point 10K untuk ditarik.`), m)
            if (args[0] > user.saving) return clips.reply(m.chat, Func.texted('bold', `Point melebihi jumlah tabungan Anda saat ini.`), m)
            user.point += parseInt(args[0])
            user.saving -= parseInt(args[0])
            user.saving_history.push({
               sn: Func.makeId(5),
               nominal: parseInt(args[0]),
               type: 'TARIK',
               date: new Date * 1
            })
            let teks = `⼷  *T A R I K*\n\n`
            teks += `Berhasil menarik point dengan jumlah ${Func.formatNumber(args[0])}\n\n`
            teks += `➾ *Total* : ${Func.formatNumber(global.db.users.find(v => v.jid == m.sender).saving)}\n`
            teks += `➾ *SN* : ${Func.makeId(5)}`
            clips.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/43c1a8522858629a7f72c.jpg'})
         } else if (command == 'riwayatnabung' || command == 'hnb') {
            let data = global.db.users.find(v => v.jid == m.sender)
            if (data.saving == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong!`), m)
            let SV_P = data.saving_history.filter(v => v.type == 'NABUNG')
            if (SV_P.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong!`), m)
            SV_P.sort((a, b) => b.date - a.date)
            let teks = `⼷  *R I W A Y A T - N A B U N G*\n\n`
            teks += SV_P.slice(0, 20).map((v, i) => (i + 1) + '. Nabung Point di _' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '_\n	◎  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◎  *SN* :  ' + v.sn).join`\n\n`
            teks +=`\n\n${global.footer}       ` 
            clips.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/d60c43626a08da30a1163.jpg'})
         } else if (command == 'riwayattarik' || command == 'htr') {
            let data = global.db.users.find(v => v.jid == m.sender)
            if (data.saving == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong!`), m)
            let WD_P = data.saving_history.filter(v => v.type == 'TARIK')
            if (WD_P.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong!`), m)
            WD_P.sort((a, b) => b.date - a.date)
            let teks = `⼷  *R I W A Y A T - T A R I K*\n\n`
            teks += WD_P.slice(0, 20).map((v, i) => (i + 1) + '. Tarik Point _' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '_\n	◎  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◎  *SN* :  ' + v.sn).join`\n\n`
            teks += `\n\n${global.footer}       `
            clips.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/d60c43626a08da30a1163.jpg'})
         } else if (command == 'tabungan') {
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.saving < 1) return clips.reply(m.chat, Func.texted('bold', `Anda tidak punya tabungan.`), m)
            clips.sendMessageModify(m.chat, Func.texted('bold', `Anda memiliki tabungan ${Func.h2k(user.saving)} (${Func.formatNumber(user.saving)}).`), m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/e796bfdb250510d793659.jpg'
          })
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}