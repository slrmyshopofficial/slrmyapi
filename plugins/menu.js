const fs = require('fs')
exports.run = {
   noxious: ['menu', 'help', 'allmenu'],
   async: async (m, {
      clips,
      text,
      isPrefix,
      command,
      setting,
      users: iuser,
      plugins
   }) => {
      try {
         clips.menu = clips.menu ? clips.menu : {}
         const user = global.db.users.find(v => v.jid == m.sender);
         const id = m.chat
         const info = `ム  *{ SlrmyApi } User Info*

⋇  *Runtime* : [ ${Func.toTime(process.uptime() * 1000)} ]
⋇  *Premium* : ${(user.premium ? '✓' : '×')}
⋇  *Limit* : ${Func.formatNumber(user.limit)}
⋇  *Level* : ${Func.level(user.point, env.multiplier)[0]} (${Func.rolex(Func.level(user.point, env.multiplier)[0])})
⋇  *Rest Api* : api.slrmyshop.com.my`
         const local_size = fs.existsSync('./' + env.database + '.json') ? await Func.getSize(fs.statSync('./' + env.database + '.json').size) : ''
         let _uptime = process.uptime() * 1000
         const library = JSON.parse(require('fs').readFileSync('./package.json', 'utf-8'))
         const message = setting.msg.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('+name', iuser.name)..replace('+greeting', Func.greeting()).replace('+own', global.customer).replace('+ownbot', `@${env.owner.split`@`[0]}`).replace('+version', `${require(process.cwd() + '/package').version}`).replace('+db', (env.api_key.mongoDB ? 'Mongo' : `Local (${local_size})`)).replace('+versi', (library.dependencies.bails ? library.dependencies.bails : library.dependencies['@whiskeysockets/baileys'] ? '@whiskeysockets/baileys' : library.dependencies.baileys).replace('^', '').replace('~', ''))
          const style = setting.menuStyle
         if (style === 1) {
           if (command == 'menu') {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n乂  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map(v => `	◦  ${isPrefix + v.noxious} ${v.use}`).join('\n')
            }
            clips.sendMessageModify(m.chat, Func.Styles(print) + '\n\n' + global.footer, m, {
               largeThumb: true,
               thumbnail: setting.cover,
               url: setting.link
            })
           } else if (command === 'allmenu') {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┏  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `┗  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `┃  ֎  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
            }
               clips.sendMessageModify(m.chat, Func.Styles(print) + `\n\n${global.footer}`, m, {
                  largeThumb: true,
                  url: setting.link
               })
            }
         } else if (style === 2) {
          if (command == "menu") {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `└  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `│  ◦  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
            }
            clips.sendMessageModify(m.chat, Func.Styles(print) + '\n\n' + global.footer, m, {
               ads: false,
               largeThumb: true,
               thumbnail: setting.cover,
               url: setting.link
            })
           } else if (command === 'allmenu') {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┏  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `┗  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `┃  ֎  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
            }
            const buttons = [{
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                      display_text: 'Official API By SlrmyShop',
                      id: `${isPrefix}sc`
                  })
               }, {
                name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                      display_text: 'Owner',
                      id: `${isPrefix}owner`
                  })
               }]
               clips.sendIAMessages(m.chat, buttons, m, {
                  header: global.botname,
                  content: print,
                  footer: global.footer,
                  image: global.db.setting.cover
               })
            }
         } else if (style === 3) {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += '\n' + String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `└  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `│  ◦  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
            }
            clips.sendMessageModify(m.chat, print + '\n\n' + global.footer, m, {
               ads: false,
               largeThumb: true,
               thumbnail: setting.cover,
               url: setting.link
            })
         } else if (style === 4) {
            if (text) {
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == text.trim().toLowerCase() && !setting.hidden.includes(v.run.category.toLowerCase()))
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               let print = commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `└  ◦  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `│  ◦  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
               m.reply(print)
            } else {
               let print = message
               print += '\n' + String.fromCharCode(8206).repeat(4001) + '\n'
               let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category || setting.hidden.includes(obj.category)) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               const keys = Object.keys(category).sort()
               print += keys.sort((a, b) => a.localeCompare(b)).map((v, i) => {
                  if (i == 0) {
                     return `┌  ◦  ${isPrefix + command} ${v}`
                  } else if (i == keys.sort((a, b) => a.localeCompare(b)).length - 1) {
                     return `└  ◦  ${isPrefix + command} ${v}`
                  } else {
                     return `│  ◦  ${isPrefix + command} ${v}`
                  }
               }).join('\n')
               clips.sendMessageModify(m.chat, print + '\n\n' + global.footer, m, {
                  ads: false,
                  largeThumb: true,
                  thumbnail: setting.cover,
                  url: setting.link
               })
            }
         } else if (style === 5) {
            if (command === 'menu') {
            if (text) {
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == text.trim().toLowerCase() && !setting.hidden.includes(v.run.category.toLowerCase()))
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               let print = info + '\n\n'
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┏  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `┗  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `┃  ֎  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
              return clips.sendMessageFooter(m.chat, print + '\n\n' + global.footer, m, {
                    footer: global.powered
               })
            } else {
               let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
               let cmd = Object.fromEntries(filter)
               let category = []
               for (let name in cmd) {
                  let obj = cmd[name].run
                  if (!cmd) continue
                  if (!obj.category || global.db.setting.hidden.includes(obj.category)) continue
                  if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
                  else {
                     category[obj.category] = []
                     category[obj.category].push(obj)
                  }
               }
               const keys = Object.keys(category).sort()
               let sections = []
               const label = {
                  highlight_label: 'Many Used'
               }
               keys.sort((a, b) => a.localeCompare(b)).map((v, i) => sections.push({
                  ...(/download|conver|util/.test(v) ? label : {}),
                  rows: [{
                     title: Func.ucword(v),
                     description: `There are ${Func.arrayJoin(Object.entries(plugins).filter(([_, x]) => x.run.noxious && x.run.category == v.trim().toLowerCase() && !setting.hidden.includes(x.run.category.toLowerCase())).map(([_, x]) => x.run.noxious)).length} commands`,
                     id: `${isPrefix + command} ${v}`
                  }]
               }))
               const buttons = [{
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                      display_text: 'All Menu',
                      id: `${isPrefix}allmenu`
                  })
               }, {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                     title: 'Tap Here!',
                     sections
                  })
               }]
               clips.sendIAMessages(m.chat, buttons, m, {
                  header: global.powered,
                  content: message,
                  footer: global.footer,
                  image: global.db.setting.cover
               })  
              } 
            } else if (command === 'allmenu') {
            let filter = Object.entries(plugins).filter(([_, obj]) => obj.run.noxious)
            let cmd = Object.fromEntries(filter)
            let category = []
            for (let name in cmd) {
               let obj = cmd[name].run
               if (!cmd) continue
               if (!obj.category || setting.hidden.includes(obj.category)) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            const keys = Object.keys(category).sort()
            let print = message
            print += String.fromCharCode(8206).repeat(4001)
            for (let k of keys) {
               print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
               let cmd = Object.entries(plugins).filter(([_, v]) => v.run.noxious && v.run.category == k.toLowerCase())
               let noxious = Object.keys(Object.fromEntries(cmd))
               if (noxious.length == 0) return
               let commands = []
               cmd.map(([_, v]) => {
                  switch (v.run.noxious.constructor.name) {
                     case 'Array':
                        v.run.noxious.map(x => commands.push({
                           noxious: x,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        }))
                        break
                     case 'String':
                        commands.push({
                           noxious: v.run.noxious,
                           use: v.run.use ? Func.texted('bold', v.run.use) : ''
                        })
                  }
               })
               print += commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).map((v, i) => {
                  if (i == 0) {
                     return `┏  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else if (i == commands.sort((a, b) => a.noxious.localeCompare(b.noxious)).length - 1) {
                     return `┗  ֎  ${isPrefix + v.noxious} ${v.use}`
                  } else {
                     return `┃  ֎  ${isPrefix + v.noxious} ${v.use}`
                  }
               }).join('\n')
            }
            const buttons = [{
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                      display_text: 'Official API By SlrmyShop',
                      id: `${isPrefix}sc`
                  })
               }, {
                name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                      display_text: 'Owner',
                      id: `${isPrefix}owner`
                  })
               }]
               clips.sendIAMessages(m.chat, buttons, m, {
                  header: global.botname,
                  content: print,
                  footer: global.footer,
                  image: global.db.setting.cover
               })
             }
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
