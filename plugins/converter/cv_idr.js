exports.run = {
  noxious: ['myrtoidr','idrtomyr'],
  use: 'input currency',
  category: 'currency rate',
  async: async (m, {
    clips,
    text, 
    command, 
    isPrefix 
  }) => {
    if (!text || isNaN(text)) {
      return clips.reply(m.chat, `{ SlrmyApi } 🔐 Masukkan jumlah yang ingin ditukarkan.
• *Ikuti Contoh :* ${isPrefix + command} 100`, m);
    }

    const amount = parseFloat(text);
    
    if (command === 'myrtoidr') {
      const result = amount * global.env.idr;
      let message = `*❒ { SlrmyApi } 🔐 MYR 🇲🇾 kepada IDR 🇮🇩*\n\n`
      message += `• MALAYSIA RINGGIT (MYR): ${amount.toLocaleString()}\n` 
      message += `• INDONESIA RUPIAH (IDR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    } else if (command === 'bndtomyr') {
      const result = amount / global.env.idr;
      let message = `*❒ { SlrmyApi } 🔐 IDR 🇮🇩 kepada MYR 🇲🇾*\n\n` 
      message += `• INDONESIA RUPIAH (BND): ${amount.toLocaleString()}\n` 
      message += `• MALAYSIA RINGGIT (MYR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    }
  },
  error: false,
  location: __filename,
};
