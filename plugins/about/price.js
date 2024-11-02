exports.run = {
   noxious: ['premium', 'sewabot'],
   hidden: ['prem', 'infopremium', 'sewa'],
   category: 'about',
   async: async (m, {
      clips
   }) => {
       clips.sendMessageModify(m.chat, info(), m, {
          largeThumb: true,
          thumbnail: '',
          url: global.db.setting.link
        })
   },
    error: false,
}
let info = () => {
   return `⼷  *{ SlrmyApi } 🔐 VIP PACKAGE*

*PriceList VIP SlrmyBot* : 
1. *RM2.00* 5 Hari
2. *RM4.00* 10 Hari
3. *RM12.00* 30 Hari (1 Bulan)
4. *RM20.00* 60 Hari (2 Bulan)

Apakah kelebihan premium SLRMYBOT? 

- .getanime (search anime)
- .toanime (mengubah gambar menjadi anime)
- .gptimg (mengubah teks menjadi gambar)
- .stablediff (mengubah teks menjadi gambar)
- .photoleap (mengubah teks menjadi gambar)
- .txt2img (mengubah teks menjadi gambar)
- Boleh Muat Turun Maksimum 250 MB (MegaBite) 
- Dapat Limit Tanpa Had Sewaktu Pakej Masih Ada
- Dapat Menggunakan SlrmyBot di PC (Personal Chat SlrmyBot)

HUBUNGI ADMIN SLRMYSHOP SETELAH MEMBUAT PEMBAYARAN 
DENGAN MENULIS : #owner
   
*KAEDAH PEMBAYARAN*

- 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝖾𝗇𝖽 𝗍𝗁𝖾 𝗋𝖾𝖼𝖾𝗂𝗉𝗍 𝖺𝖿𝗍𝖾𝗋 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝖺𝗒𝗆𝖾𝗇𝗍. 

- 𝗉𝖺𝗒𝗆𝖾𝗇𝗍 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 & 𝗋𝖾𝖿𝖾𝗋𝖾𝗇𝖼𝖾 : (𝗒𝗈𝗎𝗋 𝗇𝗎𝗆𝖻𝖾𝗋) 

- 𝗋𝖾𝖼𝗂𝗉𝗂𝖾𝗇𝗍 𝗇𝖺𝗆𝖾 : 𝖬𝖴𝖧𝖠𝖬𝖬𝖠𝖣 𝖠𝖥𝖨𝖲 𝖡𝖨𝖭 𝖨𝖲𝖬𝖠𝖨𝖫

𝐓𝐍𝐆 𝐐𝐑 𝐏𝐀𝐘
https://wa.me/p/8571652639580616/601170209771
"𝖠𝗅𝗅 𝖡𝖺𝗇𝗄 & 𝖳𝖭𝖦 𝖤𝗐𝖺𝗅𝗅𝖾𝗍 𝖢𝖺𝗇 𝖲𝖼𝖺𝗇"

𝐃𝐔𝐈𝐓𝐍𝐎𝐖 𝐈𝐃 
01136871190
"𝖥𝗋𝗈𝗆 𝖡𝖺𝗇𝗄 & 𝖤-𝗐𝖺𝗅𝗅𝖾𝗍 𝖢𝖺𝗇 𝖯𝖺𝗒"

𝐓𝐍𝐆 𝐄𝐖𝐀𝐋𝐋𝐄𝐓 𝐈𝐃 
150931407525
"𝖥𝗋𝗈𝗆 B𝖺𝗇𝗄 C𝖺𝗇 P𝖺𝗒"

𝐌𝐀𝐘𝐁𝐀𝐍𝐊 𝐍𝐔𝐌𝐁𝐄𝐑
551089374247
"𝖡𝖺𝗇𝗄 & 𝖤-𝗐𝖺𝗅𝗅𝖾𝗍 𝖢𝖺𝗇 𝖯𝖺𝗒"

𝐀𝐄𝐎𝐍-𝐁𝐀𝐍𝐊 𝐍𝐔𝐌𝐁𝐄𝐑
988627224247


𝐆𝐗-𝐁𝐀𝐍𝐊 𝐍𝐔𝐌𝐁𝐄𝐑
8888009418641
"𝖡𝖺𝗇𝗄 & 𝖤-𝗐𝖺𝗅𝗅𝖾𝗍 𝖢𝖺𝗇 𝖯𝖺𝗒"`
}
