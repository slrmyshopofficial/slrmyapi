exports.run = {
  noxious: ['myrtousd','usdtomyr'],
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
    
    if (command === 'myrtousd') {
      const result = amount * global.env.usd;
      let message = `*❒ { SlrmyApi } 🔐 MYR 🇲🇾 kepada USD 🇺🇸*\n\n`
      message += `• MALAYSIA RINGGIT (MYR): ${amount.toLocaleString()}\n` 
      message += `• UNITED STATES DOLLAR (USD): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    } else if (command === 'bndtomyr') {
      const result = amount / global.env.usd;
      let message = `*❒ { SlrmyApi } 🔐 USD 🇺🇸 kepada MYR 🇲🇾*\n\n` 
      message += `• UNITED STATES DOLLAR (USD): ${amount.toLocaleString()}\n` 
      message += `• MALAYSIA RINGGIT (MYR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    }
  },
  error: false,
  location: __filename,
};
