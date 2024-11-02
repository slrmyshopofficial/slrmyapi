exports.run = {
   async: async (m, {
      clips,
      body,
      users,
      setting,
   }) => {
      try {
      let emot = Func.random(["🗿", "👍","🌝","👻", "🔥", "🙂","😎","🥳","🥺","👌","😍"])
    if (setting.autoreact && body) {
     if (body.match(/(bile?k|ban?h|cum?|knt?l|y?|mmk|p|b(a|i)?c?(o|i)?(t|d)?|wibu|p(a)?nt(e)?k|pepe?k)/gi)) return clips.sendMessage(m.chat, {
    	react: {
    		text: emot,
    		key: m.key
    	 }
      })	
    }
  } catch (e) {
   return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
