const nodemailer = require('nodemailer')
const fs = require('fs')
exports.run = {
   noxious: ['mail'],
   use: 'to | subject | message',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'to | subject | message'), m)
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         clips.sendReact(m.chat, '🕒', m.key)
         let [to, subject, msg] = text.split`|`
         if (!to || !subject || !msg) return clips.reply(m.chat, Func.example(isPrefix, command, 'to | subject | message'), m)
         const transport = nodemailer.createTransport({
            service: env.gmail.provider,
            auth: {
               user: env.gmail.email,
               pass: env.gmail.app_password
            }
         })
         if (!mime) {
            const mailOptions = {
               from: {
                  name: env.gmail.name,
                  address: env.gmail.email
               },
               to: to.trim(),
               subject: subject.trim(),
               text: msg.trim()
            }
            transport.sendMail(mailOptions, function(err, data) {
               if (err) return m.reply(Func.jsonFormat(err))
               clips.reply(m.chat, `${data.response}`, m)
            })
         } else {
            let json = await Func.getFile(await q.download())
            const mailOptions = {
               from: {
                  name: env.gmail.name,
                  address: env.gmail.email
               },
               to: to.trim(),
               subject: subject.trim(),
               html: `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Hi <b>${m.pushName} 😘</b><br><br>${msg.trim()}<br><br><hr style="border:0px; border-top:1px dashed #222"><br>Regards, <b>${env.owner_name}</b></tt></div>`,
               attachments: [{
                  filename: json.filename,
                  content: fs.createReadStream(json.file)
               }]
            }
            transport.sendMail(mailOptions, function(err, data) {
               if (err) return m.reply(Func.jsonFormat(err))
               clips.reply(m.chat, `${data.response}`, m)
            })
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}