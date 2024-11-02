exports.run = {
   noxious: ['globalrank'],
   category: 'user info',
   async: async (m, {
      clips,
      participants,
      users
   }) => {
      let point = global.db.users.sort((a, b) => b.point - a.point)
      let rank = point.map(v => v.jid)
      let show = Math.min(10, point.length)
      let teks = `⼷  *G L O B A L - R A N K*\n\n`
      teks += `“You are ranked *${rank.indexOf(m.sender) + 1}* out of *${global.db.users.length}* users.”\n\n`
      teks += point.slice(0, show).map((v, i) => (i + 1) + '. @' + v.jid.split`@` [0] + '\n    *Xp :  ' + Func.formatNumber(v.point) + '*\n    *Level :  ' + Func.level(v.point, env.multiplier)[0] + ' [ ' + Func.formatNumber(Func.level(v.point, env.multiplier)[3]) + ' / ' + Func.formatNumber(Func.level(v.point, env.multiplier)[1]) + ' ]*\n    *Rank :  ' + Func.rolex(Func.level(v.point, env.multiplier)[0]) + '*').join`\n`
      teks += `\n\n${global.footer}`
      await clips.sendMessageModify(m.chat, teks, m, {
          largeThumb: true,
          thumbnail: Func.rank(Func.level(users.point, global.multiplier)[0])
       })
   },
   error: false
}
