const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   noxious: ['groupinfo'],
   hidden: ['gcinfo'],
   category: 'about',
   async: async (m, {
      clips,
      participants
   }) => {
      try {
         let setting = global.db.groups.find(v => v.jid == m.chat)
         let pic = await Func.fetchBuffer('./media/image/default.jpg')
         let meta = await (await clips.groupMetadata(m.chat))
         let admin = await clips.groupAdmin(m.chat)
         let member = participants.map(u => u.id)
         try {
            pic = await Func.fetchBuffer(await clips.profilePictureUrl(m.chat, 'image'))
         } catch {} finally {
            let caption = `⼷  *{ SlrmyApi } 🔐 Group Info*\n\n`
            caption += `	◎  *Name* : ${meta.subject}\n`
            caption += `	◎  *Member* : ${member.length}\n`
            caption += `	◎  *Admin* : ${admin.length}\n`
            caption += `	◎  *Created* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
            caption += `	◎  *Owner* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : ''}\n\n`
            caption += `⼷  *{ SlrmyApi } 🔐 Group Status*\n\n`
            caption += `	◎  ${Func.switcher(setting.antibot, '[ √ ]', '[ × ]')} Anti Bot\n`
            caption += `	◎  ${Func.switcher(setting.antidelete, '[ √ ]', '[ × ]')} Anti Delete\n`
            caption += `	◎  ${Func.switcher(setting.antilink, '[ √ ]', '[ × ]')} Anti Link\n`
            caption += `	◎  ${Func.switcher(setting.antiporn, '[ √ ]', '[ × ]')} Anti Porn\n`
            caption += `	◎  ${Func.switcher(setting.antivirtex, '[ √ ]', '[ × ]')} Anti Virtex\n`
            caption += `	◎  ${Func.switcher(setting.captcha, '[ √ ]', '[ × ]')} Captcha\n`
            caption += `	◎  ${Func.switcher(setting.viewonce, '[ √ ]', '[ × ]')} Viewonce\n`
            caption += `	◎  ${Func.switcher(setting.filter, '[ √ ]', '[ × ]')} Filter\n`
            caption += `	◎  ${Func.switcher(setting.game, '[ √ ]', '[ × ]')} Games\n`
            caption += `	◎  ${Func.switcher(setting.left, '[ √ ]', '[ × ]')} Left Message\n`
            caption += `	◎  ${Func.switcher(setting.localonly, '[ √ ]', '[ × ]')} Localonly\n`
            caption += `	◎  ${Func.switcher(setting.welcome, '[ √ ]', '[ × ]')} Welcome Message\n\n`
            caption += `乂  *{ SlrmyApi } 🔐 SlrmyBot Group Status*\n\n`
            caption += `	◎  *Muted* : ${Func.switcher(setting.mute, '√', '×')}\n`
            caption += `	◎  *Stay* : ${Func.switcher(setting.stay, '√', '×')}\n`
            caption += `	◎  *Expired* : ${setting.expired == 0 ? 'NOT SET' : Func.timeReverse(setting.expired - new Date * 1)}\n\n`
            caption += global.footer
            clips.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic,
            })
         }
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true,
   cache: true,
   location: __filename
}