const fs = require('fs')
const { exec } = require('child_process')
exports.run = {
   noxious: ['bass', 'audio8d', 'blown', 'chipmunk', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth'],
   use: 'reply audio',
   category: 'voice changer',
   async: async (m, {
      clips,
      command
   }) => {
      try {
         if (!m.quoted) return clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi }   Reply audio to use this command.`), m)
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         let set
         if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
         if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
         if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
         if (/earrape/.test(command)) set = '-af volume=12'
         if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
         if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
         if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
         if (/reverse/.test(command)) set = '-filter_complex "areverse"'
         if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
         if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
         if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
         if (/chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
         if (/audio8d/.test(command)) set = '-af apulsator=hz=0.125'
         if (/audio/.test(mime)) {
         clips.sendReact(m.chat, '🕒', m.key)
         let media = await clips.saveMediaMessage(m.quoted)
         let ran = Func.filename('mp3')
         exec(`ffmpeg -i ${media} ${set} ${ran}`, async (err, stderr, stdout) => {
         fs.unlinkSync(media)
         if (err) return clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi }  Penukaran Gagal`), m)
         let buff = fs.readFileSync(ran)
         if (m.quoted.ptt) return clips.sendFile(m.chat, buff, 'audio.mp3', '', m, {
         ptt: true
               }).then(() => {
                  fs.unlinkSync(ran)
               })
               clips.sendFile(m.chat, buff, 'audio.mp3', '', m).then(() => {
                  fs.unlinkSync(ran)
               })
            })
         } else {
            clips.reply(m.chat, Func.texted('bold', `{ SlrmyApi }  Reply audio to use this command.`), m)
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}