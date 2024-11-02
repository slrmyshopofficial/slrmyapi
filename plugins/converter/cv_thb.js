exports.run = {
  noxious: ['myrtothb','thbtomyr'],
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
    
    if (command === 'myrtothb') {
      const result = amount * global.env.thb;
      let message = `*❒ { SlrmyApi } 🔐 MYR 🇲🇾 kepada THB 🇹🇭*\n\n`
      message += `• MALAYSIA RINGGIT (MYR): ${amount.toLocaleString()}\n` 
      message += `• THAILAND BATH (THB): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    } else if (command === 'thbtomyr') {
      const result = amount / global.env.thb;
      let message = `*❒ { SlrmyApi } 🔐 THB 🇹🇭 kepada MYR 🇲🇾*\n\n` 
      message += `• THAILAND BATH (THB): ${amount.toLocaleString()}\n` 
      message += `• MALAYSIA RINGGIT (MYR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    }
  },
  error: false,
  location: __filename,
};
