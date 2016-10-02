const path = require('path')
const menubar = require('menubar')
const {Menu} = require('electron')

const APP_ICON = path.join(__dirname, '/img', 'Icon')

const iconPath = () => {
  if (process.platform === 'linux') {
    return APP_ICON + 'linux.png'
  }
  if (process.platform === 'darwin') {
    return APP_ICON + '.png'
  }
  if (process.platform === 'win32') {
    return APP_ICON + '.ico'
  }
}

const mb = menubar({transparent: true,
  width: 300,
  height: 540,
  icon: iconPath()
})

const template = [{label: 'Foco',
    submenu: [{label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.reload()
        }
      }
      },
      {
        label: 'Quit App',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: () => {
          mb.window.toggleDevTools()
        }
      }
    ]
   }
]

mb.on('ready', () => {
  console.log('Foco is ready to boost your productivity')

// setting this manually otherwise it will go in left
  if (process.platform === 'linux') {
    mb.setOption('x', 946)
    mb.setOption('y', 10)
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

//right click menu for Tray
mb.on('after-create-window', function() {
    const contextMenu = Menu.buildFromTemplate ([
      {label: 'restart app', click: () => { mb.app.quit();app.relaunch(); }},
      {type: 'separator'},
      {label: 'Quit', click: () => {mb.app.quit ();}}
    ])
    mb.tray.on ('right-click', () => {
        mb.tray.popUpContextMenu (contextMenu);
    })
});