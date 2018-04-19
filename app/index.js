const path = require("path");
const menubar = require("menubar");
const { Menu } = require("electron");

const APP_ICON = path.join(__dirname, "resources/icons", "icon");

const iconPath = () => {
  return APP_ICON + (process.platform === "win32" ? ".ico" : ".png");
};

const mb = menubar({
  transparent: true,
  width: 305,
  height: 500,
  icon: iconPath(),
  resizable: false
});

const template = [
  {
    label: "Foco",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: "Quit App",
        accelerator: "CmdOrCtrl+Q",
        role: "quit"
      },
      {
        label: "Toggle DevTools",
        accelerator: "Alt+Command+I",
        click: () => {
          mb.window.toggleDevTools();
        }
      }
    ]
  }
];

mb.on("ready", () => {
  console.log("Foco is ready to boost your productivity");

  // setting this manually otherwise it will go in left
  if (process.platform === "linux") {
    mb.setOption("x", 946);
    mb.setOption("y", 10);
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

//right click menu for Tray
mb.on("after-create-window", function() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "restart app",
      click: () => {
        mb.app.quit();
        mb.app.relaunch();
      }
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        mb.app.quit();
      }
    }
  ]);
  mb.tray.on("right-click", () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});
