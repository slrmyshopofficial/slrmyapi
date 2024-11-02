exports.run = {
   noxious: ['toplocal'],
   category: 'user info',
   async: async (m, {
      clips,
      participants
   }) => {
      let member = participants.map(u => u.id)
      let users = []
      for (i = 0; i < member.length; i++) {
         if (global.db.users.some(v => v.jid == member[i]) && member[i] != clips.decodeJid(clips.user.id)) {
            users.push({
               jid: member[i],
               point: global.db.users.find(v => v.jid == member[i]).point,
               level: Func.level(global.db.users.find(v => v.jid == member[i]).point),
               limit: global.db.users.find(v => v.jid == member[i]).limit
            })
         }
      }
      let point = users.sort((a, b) => b.point - a.point)
      let rank = point.map(v => v.jid)
      let show = Math.min(10, point.length)
      let teks = `〤  *T O P - L O C A L*\n\n`
      teks += `“You are ranked *${rank.indexOf(m.sender) + 1}* out of *${member.length}* ${await (await clips.groupMetadata(m.chat)).subject} group members.”\n\n`
      teks += point.slice(0, show).map((v, i) => (i + 1) + '. @' + v.jid.split`@` [0] + '\n    *Xp :  ' + Func.h2k(v.point) + ' (' + Func.formatNumber(v.point) + ')*\n    *Level :  ' + v.level[0] + ' [ ' + Func.formatNumber(v.level[3]) + ' / ' + Func.formatNumber(v.level[1]) + ' ]*').join`\n\n`
      teks += `\n\n${global.footer}            `
      await clips.sendMessageModify(m.chat, teks, m, {
          largeThumb: true,
          thumbnail: 'https://telegra.ph/file/37a8d801545c03ff0b78c.jpg'})
   },
   error: false,
   group: true
}