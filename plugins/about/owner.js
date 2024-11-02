const fs = require('fs');

exports.run = {
   noxious: ['owner'],
   category: 'about',
   async: async (m, {
      clips,
      text,
      args,
      isPrefix,
      command
   }) => {
   try {  
      clips.sendContact(m.chat, [{
         name: env.name_owner,
         number: env.owner,
         about: 'Developer'
      }], m, {
         org: 'SKY LEGACY RESOURCES',
         website: 'https://slrmyshop.com.my',
         email: 'bot@slrmyshop.com.my'
      })
     } catch (e) {
    return clips.reply(m.chat, Func.jsonFormat(e))
    }
},
error: false
}
