exports.run = {
  async: async (m, {
   clips,
   participants
   }) => {
      clips.autosholat = clips.autosholat ? clips.autosholat : {};
      if (m.isGroup) {
      let users = participants.map(u => u.id)
      let id = m.chat;
      if (id in clips.autosholat) {
        return false;
      }
      let jadwalSholat = {
        Subuh: "05:48",
        Sunrise: "06:56",
        Dzuhur: "12:57",
        Ashar: "16:19",
        Sunset: "18:58",
        Maghrib: "18:58",
        Isya: "20:09",
        Imsak: "05:38"
      };
      const date = new Date(new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kuala_Lumpur"
      }));
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
          clips.autosholat[id] = [
           clips.reply(m.chat, `{ SlrmyApi } 🔐 WAKTU SOLAT MALAYSIA\n\nPada Waktu Ini Waktu *${sholat}* telah tiba, segera ambil air wuduk dan segera solat ya!\nTimeZone : (Asia/Kuala_Lumpur)\n\nMASA : *${waktu}*\nuntuk wilayah Selangor dan yang sama dengannya.`, null, {
           mentions: users
           }),
            delete clips.autosholat[id]
          ];
        }
     }
     }
  },
  error: false
};