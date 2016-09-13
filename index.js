var menubar = require('menubar')
var Menu = require('menu');

var mb = menubar({transparent: true, width: 340, height:600, icon: __dirname + '/img/Icon.png'})

var template = [
  {
    label: 'Mojibar',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.reload() }
      },
      {
        label: 'Quit App',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function () { mb.window.toggleDevTools() }
      }
    ]
  }
]

mb.on('ready', function ready () {
  console.log('app is ready');
  // Build default menu for text editing and devtools. (gone since electron 0.25.2)
  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
