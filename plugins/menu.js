exports.run = {
   noxious: ['menu'],
   async: async (m, {
      clips,
      command, 
      isPrefix
   }) => {
      try {
         const buttons = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'SlrmyBot Products',
               sections: [{
                  title: 'slrmyapi - github.com',
                  rows: [{
                     title: '🎮 Games',
                     description: `Item Service`,
                     id: `${isPrefix}games`
                  }],
                  highlight_label: '@slrmyshopofficial'
               }, {
                  title: 'Menu Profile',
                  rows: [{
                     title: '👤 My Profile',
                     description: `View Your Profile`,
                     id: `${isPrefix}me`
                  }],
               }, {
                  rows: [{
                     title: '💰 Add Funds',
                     description: `Add Funds Credit`,
                     id: `${isPrefix}deposit`
                  }],
               }, {
                  rows: [{
                     title: '🛒 About Buying',
                     description: `See Your Transaction Product`,
                     id: `${isPrefix}riwayat`
                  }],
               }, {
                  rows: [{
                     title: 'ℹ️ Check Your ID (Transaction)',
                     description: `Transaction Search`,
                     id: `${isPrefix}cektrx`
                  }],
               }, {
                  rows: [{
                     title: '👑 Leaderboard',
                     description: `View Your Ranking`,
                     id: `${isPrefix}leaderboard`
                  }],
               }]
            })
         }];

      const quoo = {
        key: {
          remoteJid: '601170209771@s.whatsapp.net',
          fromMe: false,
          id: 'slrmybot',
          participant: '601170209771@s.whatsapp.net'
        },
        message: {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000: 999999999,
            requestFrom: '601170209771@s.whatsapp.net',
            noteMessage: {
              extendedTextMessage: {
                text: 'slrmybot'
              }
            },
            expiryTimestamp: 999999999,
            amount: {
              value: 91929291929,
              offset: 1000,
              currencyCode: "USD"
            }
          }
        }
      }


            clips.sendIAMessages(m.chat, buttons, quoo, {
               header: `Dear User, \n *${m.pushName}*\n`,
               content: `Terima kasih kerana menggunakan perkhidmatan kami\n`,
               footer: global.footer,
               image: global.db.setting.cover
            })
      } catch (e) {
         return console.log(e)
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   location: __filename
}
