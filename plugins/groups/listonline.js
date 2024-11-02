exports.run = {
   noxious: ['listonline'],
   hidden: ['here'],
   category: 'about',
   async: async (m, {
      clips,
      store
   }) => {
      let online = [...Object.keys(store.presences[m.chat])]
      let pp = await Func.fetchBuffer(await clips.profilePictureUrl(m.chat, 'image'))
      let txt = '⼷  *L i s t - O n l i n e*\n\n'
      txt += online.map(v => '◎  @' + v.replace(/@.+/, '')).join('\n') + '\n\n'
      txt += global.footer
      clips.sendMessageModify(m.chat,  txt, m, {
          largeThumb: true,
          thumbnail: pp,
          url: global.db.setting.link
      })
   },
   owner: true, 
   error: false,
   group: true
}