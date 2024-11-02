const moment = require('moment-timezone')
exports.run = {
   noxious: ['botstat'],
   hidden: ['stat'],
   category: 'about',
   async: async (m, {
      clips,
      blockList,
      plugins
   }) => {
      try {
         let users = global.db.users.length
         let chats = global.db.chats.filter(v => v.jid && v.jid.endsWith('.net')).length
         let groupList = async () => Object.entries(await clips.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
         let groups = await (await groupList()).map(v => v.id).length
         let banned = global.db.users.filter(v => v.banned).length
         let premium = global.db.users.filter(v => v.premium).length
         class Hit extends Array {
            total(key) {
               return this.reduce((a, b) => a + (b[key] || 0), 0)
            }
         }
         let cmd = Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.noxious))).map(v => v.run.noxious)).concat(Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.hidden))).map(v => v.run.hidden)))
         let sum = new Hit(...Object.values(global.db.statistic))
         let hitstat = sum.total('hitstat') != 0 ? sum.total('hitstat') : 0
         const stats = {
            users,
            chats,
            groups,
            cmd: cmd.length,
            mimic: (global.db.setting.mimic).length,
            banned,
            blocked: blockList.length,
            premium,
            bots: global.db.bots,
            hitstat,
            uptime: Func.toTimeV2(process.uptime() * 1000)
         }
         const system = global.db.setting
         clips.sendMessageModify(m.chat, statistic(stats, system), m, {
            largeThumb: true
         })
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

const statistic = (stats, system) => {
   if (global.db.setting.menuStyle == 3 || global.db.setting.menuStyle == 4) {
      return ` –  *{ SlrmyApi } 🔐 SlrmyBot Dashboard*

┌  ◎  ${Func.texted('bold', Func.formatNumber(stats.groups))} Groups Joined
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.chats))} Personal Chats
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.users))} Users In Database
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.banned))} Users Banned
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.blocked))} Users Blocked
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.mimic))} Mimics Target
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.premium))} Premium Users
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.hitstat))} Commands Hit
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.bots.length))} Authenticated Bots
│  ◎  ${Func.texted('bold', Func.formatNumber(stats.bots.filter(v => v.is_connected).length))} Connected Bots
│  ◎  ${Func.texted('bold', Func.formatter(stats.cmd))} Available Commands
└  ◎  Runtime : ${Func.texted('bold', stats.uptime)}

 –  *{ SlrmyApi } 🔐 SlrmyBot System*

┌  ◎  ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  Auto Download
│  ◎  ${Func.texted('bold', system.autoreact ? '[ √ ]' : '[ × ]')}  Auto React
│  ◎  ${Func.texted('bold', system.autosticker ? '[ √ ]' : '[ × ]')}  Auto Sticker
│  ◎  ${Func.texted('bold', system.antispam ? '[ √ ]' : '[ × ]')}  Anti Spam
│  ◎  ${Func.texted('bold', system.chatbot ? '[ √ ]' : '[ × ]')}  Chat Bot
│  ◎  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Debug Mode
│  ◎  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Group Mode
│  ◎  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Always Online
│  ◎  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Self Mode
│  ◎  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  No Prefix
│  ◎  ${Func.texted('bold', system.levelup ? '[ √ ]' : '[ × ]')}  Level UP
│  ◎  ${Func.texted('bold', system.games ? '[ √ ]' : '[ × ]')}  Game Features
│  ◎  ${Func.texted('bold', system.limiter ? '[ √ ]' : '[ × ]')}  Ram Limiter
│  ◎  ${Func.texted('bold', system.verify ? '[ √ ]' : '[ × ]')}  Email Verification
│  ◎  Prefix : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
└  ◎  Reset At : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   } else {
      return `⼷  *{ SlrmyApi } 🔐 SlrmyBot Dashboard*

	◎  ${Func.texted('bold', Func.formatNumber(stats.groups))} Groups Joined
	◎  ${Func.texted('bold', Func.formatNumber(stats.chats))} Personal Chats
	◎  ${Func.texted('bold', Func.formatNumber(stats.users))} Users In Database
	◎  ${Func.texted('bold', Func.formatNumber(stats.banned))} Users Banned
	◎  ${Func.texted('bold', Func.formatNumber(stats.blocked))} Users Blocked
	◎  ${Func.texted('bold', Func.formatNumber(stats.mimic))} Mimics Target
	◎  ${Func.texted('bold', Func.formatNumber(stats.premium))} Premium Users
	◎  ${Func.texted('bold', Func.formatNumber(stats.hitstat))} Commands Hit
	◎  ${Func.texted('bold', Func.formatNumber(stats.bots.length))} Authenticated Bots
	◎  ${Func.texted('bold', Func.formatter(stats.cmd))} Available Commands
	◎  ${Func.texted('bold', Func.formatNumber(stats.bots.filter(v => v.is_connected).length))} Connected Bots
	◎  Runtime : ${Func.texted('bold', stats.uptime)}

⼷  *S Y S T E M*

	◎  ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  Auto Download
	◎  ${Func.texted('bold', system.autoreact ? '[ √ ]' : '[ × ]')}  Auto React
	◎  ${Func.texted('bold', system.autosticker ? '[ √ ]' : '[ × ]')}  Auto Sticker
	◎  ${Func.texted('bold', system.antispam ? '[ √ ]' : '[ × ]')}  Anti Spam
	◎  ${Func.texted('bold', system.chatbot ? '[ √ ]' : '[ × ]')}  Chat Bot
	◎  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Debug Mode
	◎  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Group Mode
	◎  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Always Online
	◎  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Self Mode
	◎  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  No Prefix
	◎  ${Func.texted('bold', system.levelup ? '[ √ ]' : '[ × ]')}  Level UP
	◎  ${Func.texted('bold', system.games ? '[ √ ]' : '[ × ]')}  Game Features
	◎  ${Func.texted('bold', system.limiter ? '[ √ ]' : '[ × ]')}  Ram Limiter
	◎  ${Func.texted('bold', system.verify ? '[ √ ]' : '[ × ]')}  Email Verification
	◎  Prefix : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
	◎  Reset At : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   }
}
