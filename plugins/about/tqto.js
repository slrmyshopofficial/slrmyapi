exports.run = {
   noxious: ['tqto', 'script'],
   hidden: ['sc', 'thanks'],
   category: 'about',
   async: async (m, {
      clips,
      command
   }) => {
    let json = await Api.nexon('/ghstalk', {
                 username: 'slrmyshopofficial'
             })
    let teks = `⼷  *I N F O  -  S C R I P T*\n\n`
    teks += `    ◎  *Username* :  @slrmyshopofficial\n`
    teks += `    ◎  *Url* :  https://github.com/slrmyshopofficial/slrmyapibase\n`
    teks += `    ◎  *Description* :  Nothing to do.\n\n`
    teks += `⼷  *B I G - T H A N K S  T O*\n\n`
    teks += `    ◎  Muhammad Afis Bin Ismail\n`
    teks += `    ◎  Github Inc.\n\n`
    teks += global.footer
    clips.sendMessageModify(m.chat, teks, m, {
      largeThumb: true,
      thumbnail: '',
      url: global.db.setting.link
    })
 },
error: false
}