exports.run = {
   async: async (m, {
      clips,
      body,
      chats,
      users,
      setting,
      isOwner
   }) => {
      try {
         if (body && env.evaluate_chars.some(v => body.startsWith(v)) || body && Func.socmed(body)) return
         global.db.chatroom = global.db.chatroom ? global.db.chatroom : []
         const room = global.db.chatroom.find(v => v.jid == m.sender)
         if (m.isGroup) {
            for (let jid of [...new Set([...(m.mentionedJid || [])])]) {
               if (jid != clips.decodeJid(clips.user.id)) continue
               if (!m.fromMe) return m.reply('Do you want to chat with me? send *nexon-assistent* to create a chat session.')
            }
            if (body && body.toLowerCase() == 'nexon-assistent' && !room) {
               return m.reply('✅ Chat session created successfully.\nSend any text then bot will response, to remove chat session send *stop*.').then(() => global.db.chatroom.push({
                  jid: m.sender,
                  created_at: new Date * 1
               }))
            } else if (body && body.toLowerCase() == 'nxr' && room) return m.reply('You have been in a chat session.')
            if (body && body.toLowerCase() == 'stop' && room) return m.reply('✅ Chat session deleted successfully.').then(() => Func.removeItem(global.db.chatroom, room))
            if (room && /conversation|extended/.test(m.mtype)) {
               var json = await Scrape.simsimi(body)
               if (!json.status) {
                  var json = await Scrape.simsimiV2(body)
                  if (!json.status) {
                     var json = await Scrape.chatAI(env.api_key.brain.id, env.api_key.brain.key, body)
                  }
               }
               if (json.status) return clips.reply(m.chat, json.msg, m).then(() => room.created_at = new Date * 1)
            }
         } else {
            if (!setting.chatbot || isOwner || !/conversation|extended/.test(m.mtype)) return
            var json = await Scrape.simsimi(body)
            if (!json.status) {
               var json = await Scrape.simsimiV2(body)
               if (!json.status) {
                  var json = await Scrape.chatAI(env.api_key.brain.id, env.api_key.brain.key, body)
               }
            }
            if (json.status) return clips.reply(m.chat, json.msg, m)
         }
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}