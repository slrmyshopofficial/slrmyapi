exports.run = {
  noxious: ['myrtosgd','sgdtomyr'],
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
    
    if (command === 'myrtosgd') {
      const result = amount * global.env.sgd;
      let message = `*❒ { SlrmyApi } 🔐 MYR 🇲🇾 kepada SGD 🇸🇬*\n\n`
      message += `• MALAYSIA RINGGIT (MYR): ${amount.toLocaleString()}\n` 
      message += `• SINGAPURA DOLLAR (SGD): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    } else if (command === 'sgdtomyr') {
      const result = amount / global.env.sgd;
      let message = `*❒ { SlrmyApi } 🔐 SGD 🇸🇬 kepada MYR 🇲🇾*\n\n` 
      message += `• SINGAPURA DOLLAR (SGD): ${amount.toLocaleString()}\n` 
      message += `• MALAYSIA RINGGIT (MYR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    }
  },
  error: false,
  location: __filename,
};
