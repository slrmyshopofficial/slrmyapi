const moment = require('moment-timezone');
moment.tz.setDefault(global.timezone);

exports.run = {
  noxious: ['listban', 'listprem', 'listblock', 'listerror', 'listid', 'listmic', 'listpc'],
  category: 'miscs',
  async: async (m, {
    clips,
    isPrefix,
    command,
    isOwner,
    blockList,
    participants
  }) => {
    if (command === 'listban') {
      const data = global.db.users.filter(v => v.banned)
      if (data.length < 1) return m.reply(Func.texted('bold', `🚩 Data empty.`))
      let text = `⼷  *L I S T B A N*\n\n`
      text += data.map((v, i) => {
        if (i == 0) {
          return `┌  ◎  @${clips.decodeJid(v.jid).replace(/@.+/, '')}`
        } else if (i == data.length - 1) {
          return `└  ◎  @${clips.decodeJid(v.jid).replace(/@.+/, '')}`
        } else {
          return `│  ◎  @${clips.decodeJid(v.jid).replace(/@.+/, '')}`
        }
      }).join('\n')
      m.reply(text + '\n\n' + global.footer)
    } else if (command === 'listprem') {
      //if (!isOwner) return m.reply(global.status.owner)
      const data = global.db.users.filter(v => v.premium)
      if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong.`), m)
      let teks = `⼷  *P R E M L I S T*\n\n`
      teks += data.map(v => '	◎  @' + v.jid.replace(/@.+/, '') + '\n	 *Limit* : ' + Func.formatNumber(v.limit) + '\n	 *Expired* : ' + Func.timeReverse(v.expired - new Date() * 1)).join('\n') + '\n\n'
      teks += global.footer
      clips.sendMessageModify(m.chat, teks, m, {
               largeThumb: true,
               thumbnail: 'https://telegra.ph/file/5bfa0614794fe97b0d1e3.jpg'
            })
    } else if (command === 'listblock') {
      if (blockList.length < 1) return m.reply(Func.texted('bold', `🚩 Data empty.`))
      let text = `⼷  *L I S T B L O C K*\n\n`
      text += blockList.map((v, i) => {
        if (i == 0) {
          return `┌  ◎  @${clips.decodeJid(v).replace(/@.+/, '')}`
        } else if (i == data.length - 1) {
          return `└  ◎  @${clips.decodeJid(v).replace(/@.+/, '')}`
        } else {
          return `│  ◎  @${clips.decodeJid(v).replace(/@.+/, '')}`
        }
      }).join('\n')
      m.reply(text + '\n\n' + global.footer)
    } else if (command === 'listerror') {
      if (!isOwner) return m.reply(global.status.owner)
      const data = global.db.setting.error
      if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong.`), m)
      let teks = `⼷  *E R R L I S T*\n\n`
      teks += data.map(cmd => '	◎ ' + isPrefix + cmd).join('\n') + '\n\n'
      teks += global.footer
      clips.sendMessageModify(m.chat, teks, m, {
          largeThumb: true,
          thumbnail: 'https://telegra.ph/file/9bcf6753a6f5e51458a03.jpg'
         })
    } else if (command === 'listid') {
      if (!isOwner) return m.reply(global.status.owner)
      let getGroups = await clips.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
      let anu = groups.map((v) => v.id)
      let teks = `⼷  *L I S T - G R O U P - I D*\n\nTotal Group : ${anu.length} Group\n\n`
      for (let x of anu) {
      let metadata2 = await clips.groupMetadata(x)
      teks += `   ◎ *Nama :* ${metadata2.subject}\n   ◎ *ID :* ${metadata2.id}\n   ◎ *Member :* ${metadata2.participants.length}\n\n`
    //  m.reply(teks)
     }
     teks += global.footer
     clips.sendMessageModify(m.chat, teks, m, {
         largeThumb: true,
         thumbnail: 'https://telegra.ph/file/67fd5537a76b00963afc9.jpg'
         })
    } else if (command === 'listmic') {
      if (!isOwner) return m.reply(global.status.owner)
      const data = global.db.setting.mimic
      if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong.`), m)
      let teks = `⼷  *M I C L I S T*\n\n`
      teks += data.map(jid => '	◎  @' + jid.replace(/@.+/, '')).join('\n') + '\n\n'
      teks += global.footer
      clips.sendMessageModify(m.chat, teks, m, {
           largeThumb: true,
           thumbnail: 'https://telegra.ph/file/932bada0533cb4670b756.jpg'
         })
    } else if (command === 'listpc') {
    if (!isOwner) return m.reply(global.status.owner)
    const data = global.db.chats.filter(v => v.jid.endsWith('.net'))
    if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `Data kosong.`), m)
    let teks = `⼷  *C H A T L I S T*\n\n`
    teks += data.sort((a, b) => b.lastseen - a.lastseen).map(v => '	◎  @' + v.jid.replace(/@.+/, '') + '\n	     *Chat* : ' + Func.formatNumber(v.chat) + '\n	     *Lastchat* : ' + moment(v.lastseen).format('DD/MM/YY HH:mm:ss')).join('\n') + '\n\n'
    teks += global.footer
    clips.sendMessageModify(m.chat, teks, m, {
          largeThumb: true,
          thumbnail: 'https://telegra.ph/file/01dc0a3ad9afbbc4f96f4.jpg'
        })
    }
  },
  error: false,
  cache: true,
  location: __filename
}
