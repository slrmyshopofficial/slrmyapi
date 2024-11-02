const axios = require('axios')
exports.run = {
   noxious: ['qc'],
   use: 'text',
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'Hai SlrmyBot'), m)
         if (text.length > 50) return clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi }  Maksimum 50 huruf sahaja.`), m)
         clips.sendReact(m.chat, '', m.key)
         var quotebyslrmy = Func.random(['#000000','#00FF00','#0000FF'])
         const exif = global.db.setting
         try {
            pic = await clips.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, 'image') 
         } catch {
            pic = 'https://i.ibb.co/nsDv3ZJ/image.jpg'
         }
         const obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": `${quotebyslrmy}`,
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
               "entities": [],
               "avatar": true,
               "from": {
                  "id": 1,
                  "name": m.quoted ? global.db.users.find(v => v.jid == m.quoted.sender).name : m.pushName,
                  "photo": {
                     "url": pic
                  }
               },
               "text": text,
               "replyMessage": {}
            }]
         }
         const json = await axios.post('https://quotly.netorare.codes/generate', obj, {
            headers: {
               'Content-Type': 'application/json'
            }
         })
         const buffer = Buffer.from(json.data.result.image, 'base64')
         clips.sendSticker(m.chat, buffer, m, {
            packname: exif.sk_pack,
            author: exif.sk_author
         })
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi }  Contact Admin For Report Problem : \n#owner`), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}