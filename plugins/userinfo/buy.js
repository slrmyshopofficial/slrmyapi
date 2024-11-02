exports.run = {
   noxious: ['buy', 'buyall', 'buyguard'],
   use: 'amount',
   category: 'user info',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      users
   }) => {
         let maximum = 150,
            price = 50000
         if (command == 'buyall') {
            if (users.limit >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry, you can't buy any more limits because you have reached maximum limit.`), m)
            if (users.point < price) return clips.reply(m.chat, Func.texted('bold', `🚩 You don't have enough points to buy limit.`), m)
            let amount = (users.point / price).toFixed(0)
            if ((users.limit + parseInt(amount)) >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry, you can't buy any more limits because you have reached maximum limit.`), m)
            users.point -= price * parseInt(amount)
            users.limit += parseInt(amount)
            return clips.reply(m.chat, `✅ You have purchased *${amount}* limit with *${Func.h2k(price * parseInt(amount))}* points.`, m)
         } else if (command == 'buy') {
            if (users.limit >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry, you can't buy any more limits because you have reached maximum limit.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.example(isPrefix, command, '1'), m)
            if (args[0] < 1) return clips.reply(m.chat, Func.example(isPrefix, command, '1'), m)
            if (users.point >= price * parseInt(args[0])) {
               if ((users.limit + parseInt(args[0])) >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Limit amount you buy exceeds maximum limit.`), m)
               users.point -= price * parseInt(args[0])
               users.limit += parseInt(args[0])
               return clips.reply(m.chat, `✅ You have purchased *${args[0]}* limit with *${Func.h2k(price * args[0])}* points.`, m)
            } else {
               clips.reply(m.chat, Func.texted('bold', `🚩 You don't have enough points to buy ${Func.formatNumber(args[0])} limit.`), m)
            }
         } else if (command == 'buyguard') {
            if (users.guard >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry, you can't buy any more limits because you have reached maximum limit.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.example(isPrefix, command, '1'), m)
            if (args[0] < 1) return clips.reply(m.chat, Func.example(isPrefix, command, '1'), m)
            if (users.point >= price * parseInt(args[0])) {
               if ((users.guard + parseInt(args[0])) >= maximum) return clips.reply(m.chat, Func.texted('bold', `🚩 Guard amount you buy exceeds maximum limit.`), m)
               users.point -= price * parseInt(args[0])
               users.guard += parseInt(args[0])
               return clips.reply(m.chat, `✅ You have purchased *${args[0]}* guard with *${Func.h2k(price * args[0])}* points.`, m)
            } else {
               clips.reply(m.chat, Func.texted('bold', `🚩 You don't have enough points to buy ${Func.formatNumber(args[0])} guard`), m)
            }
         }
   },
   error: false
}