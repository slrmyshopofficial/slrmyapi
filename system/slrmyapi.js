module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user) {
      if (!('name' in user)) user.name = m.pushName
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('afkObj' in user)) user.afkObj = {}
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.banTemp)) user.banTemp = 0
      if (!isNumber(user.banTimes)) user.banTimes = 0
      if (!isNumber(user.balance)) user.balance = 0
      if (!isNumber(user.limit)) user.limit = env.limit
      if (!isNumber(user.saving)) user.saving = 0
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.spam)) user.spam = 0
      if (!isNumber(user.warning)) user.warning = 0
      if (!isNumber(user.attempt)) user.attempt = 0
      // role
      if (!('buyer' in user)) user.buyer = true
      if (!('reseller' in user)) user.reseller = false 
      if (!('special' in user)) user.special = false
      // saldo
      if (!isNumber(user.deposit)) user.deposit = 0
      if (!isNumber(user.total_pembelian)) user.total_pembelian = 0
      if (!isNumber(user.total_pengeluaran)) user.total_pengeluaran = 0
   } else {
      global.db.users.push({
         jid: m.sender,
         name: m.pushName,
         afkReason: '',
         afkObj: {},
         banned: false,
         banTemp: 0,
         banTimes: 0,
         balance: 0,
         limit: env.limit,
         premium: false,
         expired: 0,
         lastseen: 0,
         hit: 0,
         spam: 0,
         warning: 0,
         attempt: 0,
         // role
         buyer: true,
         reseller: false,
         special: false, 
         // saldo
         deposit: 0,
         total_pengeluaran: 0,
         total_pembelian: 0
      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid == m.chat)
      if (group) {
         if (!isNumber(group.activity)) group.activity = 0
         if (!('autoread' in group)) group.autoread = true
         if (!('antitagall' in group)) group.antitagall = false
         if (!('antilink' in group)) group.antilink = false
         if (!('filter' in group)) group.filter = false
         if (!('left' in group)) group.left = true
         if (!('localonly' in group)) group.localonly = false
         if (!('mute' in group)) group.mute = false
         if (!('member' in group)) group.member = {}
         if (!('text_left' in group)) group.text_left = ''
         if (!('text_welcome' in group)) group.text_welcome = ''
         if (!('welcome' in group)) group.welcome = false
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
      } else {
         global.db.groups.push({
            jid: m.chat,
            activity: 0,
            autoread: true,
            antidelete: false,
            antitagall: false,
            antilink: false,
            viewonce: true,
            left: false,
            localonly: false,
            mute: false,
            member: {},
            text_left: '',
            text_welcome: '',
            welcome: true,
            expired: 0,
            stay: false,
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid == m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastchat)) chat.lastchat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
      if (!isNumber(chat.command)) chat.command = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0,
         lastchat: 0,
         lastseen: 0,
         command: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
      if (!('antispam' in setting)) setting.antispam = true
  	  if (!('debug' in setting)) setting.debug = false
      if (!('error' in setting)) setting.error = []
      if (!('pluginDisable' in setting)) setting.pluginDisable = []
      if (!('pluginVerified' in setting)) setting.pluginVerified = []
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('sk_pack' in setting)) setting.sk_pack = '{ SlrmyApi }'
      if (!('sk_author' in setting)) setting.sk_author = '🔐'
      if (!('self' in setting)) setting.self = false
      if (!('mimic' in setting)) setting.mimic = []
      if (!('hidden' in setting)) setting.hidden = []
      if (!('limiter' in setting)) setting.limiter = true
      if (!('noprefix' in setting)) setting.noprefix = true
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "xnxx"]
      if (!('online' in setting)) setting.online = true
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = ['6285726319205', '628888375863', '601136871190']
      if (!isNumber(setting.lastReset)) setting.lastReset = new Date * 1
      if (!('msg' in setting)) setting.msg = 'Kepada Pengguna \n*+name* \n\n	◎  *SlrmyApiBase* : +dbuser Users\n	◎  *Library* : +db\n	◎  *Rest Api* : https://slrmyshop.com.my/\n	◎  *Source Code* : https://github.com/slrmyshopofficial/slrmyapibase\n	◎  *Developer* : +own'
      if (!isNumber(setting.menuStyle)) setting.menuStyle = 5
      if (!('cover' in setting)) setting.cover = ''
      if (!('link' in setting)) setting.link = ''
   } else {
      global.db.setting = {
         antispam: true,
         chatbot: true,
         debug: false,
         error: [],
         pluginDisable: [],
         pluginVerified: [],
         groupmode: false,
         sk_pack: '{ SlrmyApi }',
         sk_author: '🔐',
         self: false,
         mimic: [],
         hidden: [],
         limiter: true,
         noprefix: true,
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "xnxx"],
         online: true,
         onlyprefix: '+',
         owners: ['6285726319205', '628888375863','601136871190'],
         lastReset: new Date * 1,
         msg: 'Kepada Pengguna\n*+name*\n\n	◎  *SlrmyApiBase* : +dbuser Users\n	◎  *Library* : +db\n	◎  *Rest Api* : https://slrmyshop.com.my\n	◎  *Source Code* : https://github.com/slrmyshopofficial/slrmyapibase\n	◎  *Developer* : +own',
         menuStyle: 5,
         cover: '',
         link: '',
      }
   }
}