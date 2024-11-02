const { Function, Scraper, SlrmyApi } = new (require('@slrmy/prime'));
const fs = require('fs');
const chalk = require('chalk');
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

global.powered = `SlrmyApi v${require('package.json').version}`
// Timezone (Default : Asia/Kuala_Lumpur)
global.timezone = 'Asia/Kuala_Lumpur'
// Bot name
global.botname = `*SlrmyBot*`
// Footer text
global.footer = '*Official SlrmyBot API By SlrmyShop*'
// Function Scraper
global.Scrape = Scraper
// Function
global.Func = Function
// Global status
global.status = Object.freeze({
   wait: Func.texted('bold', '{ SlrmyApi } ⏲️  Process'),
   invalid: Func.texted('bold', '{ SlrmyApi } 🔐 URL is Invalid!'),
   wrong: Func.texted('bold', '{ SlrmyApi } 🔐 Wrong format!'),
   getdata: Func.texted('bold', '{ SlrmyApi } Scraping metadata . . .'),
   fail: Func.texted('bold', '{ SlrmyApi } 🔐 Can\'t get metadata!'),
   error: Func.texted('bold', '{ SlrmyApi } 🔐 Error occurred!'),
   errorF: Func.texted('bold', '{ SlrmyApi } 🔐 Sorry this feature is in error.'),
   auth: Func.texted('bold', '{ SlrmyApi } 🔐 You do not have permission to use this feature, ask the owner first.'),
   premium: Func.texted('bold', '{ SlrmyApi } 🔐 This feature only for premium user.'),
   owner: Func.texted('bold', '{ SlrmyApi } 🔐 This command only for owner.'),
   mods: Func.texted('bold', '{ SlrmyApi } 🔐 This command only for Master'),
   group: Func.texted('bold', '{ SlrmyApi } 🔐 This command will only work in groups.'),
   botAdmin: Func.texted('bold', '{ SlrmyApi } 🔐 This command will work when I become an admin.'),
   admin: Func.texted('bold', '{ SlrmyApi } 🔐 This command only for group admin.'),
   private: Func.texted('bold', '{ SlrmyApi } 🔐 Use this command in private chat.'),
   gameSystem: Func.texted('bold', '{ SlrmyApi } 🔐 Game features have been disabled.'),
   nsfwInGroup: Func.texted('bold', '{ SlrmyApi } 🔐 The nsfw feature has not been activated.'),
   gameInGroup: Func.texted('bold', '{ SlrmyApi } 🔐 Game features have not been activated for this group.'),
   gameLevel: Func.texted('bold', '{ SlrmyApi } 🔐 You cannot play the game because your level has reached the maximum limit.')
})

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`SlrmyApi Update New File Name As : ${__filename}`))
delete require.cache[file]
require(file)
})
