exports.run = {
   noxious: ['restart'],
   category: 'owner',
   async: async (m, {
      clips
   }) => {
      await clips.reply(m.chat, Func.texted('bold', '{ SlrmyApi } 🔐 restart is proccessing.........'), m).then(async () => {
         await props.save()
         process.send('reset')
      })
   },
   owner: true
} 
