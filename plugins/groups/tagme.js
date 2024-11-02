exports.run = {
   noxious: ['tagme'],
   category: 'group',
   async: async (m, {
      clips,
      text
   }) => {
    let tag = `@${m.sender.replace(/@.+/, '')}`
     clips.reply(m.chat, tag, m, { 
          contextInfo: { 
              mentionedJid: [m.sender] 
          }
     })
 },
error: false,
group: true
}