exports.run = {
   noxious: ['profile','me','myinfo'],
   use: 'mention or reply',
   category: 'user info',
   async: async (m, {
      clips,
      text,
      isPrefix,
      blockList
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return clips.reply(m.chat, Func.texted('bold', `Mention or Reply chat target.`), m)
      if (isNaN(number)) return clips.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
      if (number.length > 15) return clips.reply(m.chat, Func.texted('bold', `Invalid format.`), m)
      let pic = await Func.fetchBuffer('./media/image/default.jpg')
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let target = global.db.users.find(v => v.jid == user)
         if (typeof target == 'undefined') return clips.reply(m.chat, Func.texted('bold', `Can't find user data.`), m)
         try {
            pic = await Func.fetchBuffer(await clips.profilePictureUrl(user, 'image'))
         } catch (e) {} finally {
            let blocked = blockList.includes(user) ? true : false
            let now = new Date() * 1
            let lastseen = (target.lastseen == 0) ? 'Never' : Func.toDate(now - target.lastseen)
            let usebot = (target.usebot == 0) ? 'Never' : Func.toDate(now - target.usebot)
            let caption = `⼷  *{ SlrmyApi } 🔐 "User Profile"*\n\n`
            caption += `	◎ *WhatsApp UserName* : ${target.names ? target.names : target.name}\n`
            caption += `	◎ *Point* : ${Func.formatNumber(target.point)}\n`
            caption += `	◎ *Guard* : ${Func.formatNumber(target.guard)}\n`
            caption += `	◎ *Limit* : ${Func.formatNumber(target.limit)}\n`
            caption += `	◎ *Level* : ${Func.level(target.point, env.multiplier)[0]} (${Func.rolex(Func.level(target.point, env.multiplier)[0])})\n`
            caption += `	◎ *Hitstat* : ${Func.formatNumber(target.hit)}\n`
            caption += `	◎ *Warning* : ${((m.isGroup) ? (typeof global.db.groups.find(v => v.jid == m.chat).member[user] != 'undefined' ? global.db.groups.find(v => v.jid == m.chat).member[user].warning : 0) + ' / 5' : target.warning + ' / 5')}\n\n`
            caption += `⼷  *{ SlrmyApi } 🔐 "User Status"*\n\n`
            caption += `	◎ *Blocked* : ${(blocked ? '√' : '×')}\n`
            caption += `	◎ *Banned* : ${(new Date - target.banTemp < env.timer) ? Func.toTime(new Date(target.banTemp + env.timer) - new Date()) + ' (' + ((env.timer / 1000) / 60) + ' min)' : target.banned ? '√' : '×'}\n`
            caption += `	◎ *Use In Private* : ${(global.db.chats.map(v => v.jid).includes(user) ? '√' : '×')}\n`
            caption += `	◎ *Premium* : ${(target.premium ? 'VIP User' : 'Not VIP User')}\n`
            caption += `	◎ *Expired* : ${target.expired == 0 ? 'Nothing About Date' : Func.timeReverse(target.expired - new Date() * 1)}\n\n`
            caption += global.footer
            clips.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic
            })
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}
