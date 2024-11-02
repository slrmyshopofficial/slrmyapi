exports.run = {
  noxious: ['myrtobnd','bndtomyr'],
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
    
    if (command === 'myrtobnd') {
      const result = amount * global.env.bnd;
      let message = `*❒ { SlrmyApi } 🔐 MYR 🇲🇾 kepada BND 🇧🇳*\n\n`
      message += `• MALAYSIA RINGGIT (MYR): ${amount.toLocaleString()}\n` 
      message += `• BRUNEI DOLLAR (BND): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    } else if (command === 'bndtomyr') {
      const result = amount / global.env.bnd;
      let message = `*❒ { SlrmyApi } 🔐 BND 🇧🇳 kepada MYR 🇲🇾*\n\n` 
      message += `• BRUNEI DOLLAR (BND): ${amount.toLocaleString()}\n` 
      message += `• MALAYSIA RINGGIT (MYR): ${result.toLocaleString()}\n\n{ SlrmyApi } | @slrmyshopofficial`;
      clips.reply(m.chat, message, m);
    }
  },
  error: false,
  location: __filename,
};
