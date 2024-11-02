exports.run = {
   async: async (m, {
      clips,
      users,
      body,
      setting
   }) => {
      try {
         let levelAwal = Func.level(users.point, env.multiplier)[0]
         if (users && body) users.point += Func.randomInt(1, 100)
         let levelAkhir = Func.level(users.point, env.multiplier)[0]
         const point = global.db.users.sort((a, b) => b.point - a.point).map(v => v.jid)
         let str = `⼷  *{ SlrmyApi } 🔐 Tahniah Kepada Anda!*\n\n`
         str += `Selamat ${m.pushName}, Kamu naik level\n\n`
         str += `From : [ *${levelAwal}* ] ➠ [ *${levelAkhir}* ] – [ *${Func.rolex(Func.level(users.point, env.multiplier)[0])}* ]\n`
         str += `• Level Sebelumnya : ${levelAwal}\n• Level Baru : ${levelAkhir}\n`
         str += `• Pada Jam : ${new Date().toLocaleString("id-ID")}\n\n`
         str += `*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_`.trim()
         if (levelAwal != levelAkhir && setting.levelup) clips.reply(m.chat, str, m)
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}