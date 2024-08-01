const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const url = require("url");
const path = require("path");
const { exec } = require("child_process");
const OpenVPNConnector = require("./connectionClass");
const Store = require("electron-store");
const fs = require("fs");
const notifier = require("node-notifier");
const { decryptData } = require("./decription.js");

let mainWindow;
const store = new Store();

function isDevelopment() {
  return !app.isPackaged;
}

let BAT_INSTALLER = path.resolve(
  // "resources",
  // "app.asar",
  "resources",
  "tapctl",
  "tapInstaller.bat"
);

BAT_INSTALLER = BAT_INSTALLER.replace("app.asar", "app.asar.unpacked");

let TAP_WINDOWS_DIR_TEST = path.resolve(
  // "resources",
  // "app.asar",
  "resources",
  "windows",
  "bin",
  "openvpn.exe"
);

TAP_WINDOWS_DIR_TEST = TAP_WINDOWS_DIR_TEST.replace(
  "app.asar",
  "app.asar.unpacked"
);
console.log("__dirname:: ", __dirname);
console.log("TAP_WINDOWS_DIR_TEST:: ", TAP_WINDOWS_DIR_TEST);
console.log("BAT_INSTALLER:: ", BAT_INSTALLER);
function installTapWindows() {
  console.log("BAT_INSTALLER path: ", BAT_INSTALLER);
  if (os.platform() !== "win32") {
    console.log("Not a Windows system, skipping TAP-Windows installation");
    return;
  }

  // Check if TAP-Windows is already installed
  exec(`${TAP_WINDOWS_DIR_TEST} --show-adapters`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return;
    }
    if (stderr) {
      console.log("this is stderr", stderr);
      return;
    }
    console.log("test result: ", stdout);
    if (!stdout.includes("tap-windows6") && !stdout.includes("tap-windows9")) {
      // Run the batch file as an administrator
      const powershellCommand = `Powershell -Command "& {Start-Process \\"${BAT_INSTALLER}\\" -Verb RunAs}"`;
      exec(powershellCommand, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          return;
        }
        if (stderr) {
          console.log("this is stderr", stderr);
          return;
        }
        console.log("installed 'TAP-Windows' successfully");
      });
    } else {
      console.log("'TAP-Windows is installed already'");
      return;
    }
  });
}
installTapWindows();

function showOnboardingNotification() {
  notifier.notify({
    title: "Welcome to Private VPN",
    message: "Thank you for installing. Let’s get started!",
    icon: path.join(__dirname, "icon.ico"),
    sound: true,
    appID: "privateVPN",
  });
}
// save Server Config file
function saveServerConfig(serverData) {
  // const directoryPath = path.join(__dirname, "./app/public/scripts");
  let directoryPath = path.resolve(
    "resources",
    "app.asar",
    "resources",
    "scripts"
  );
  directoryPath = directoryPath.replace("app.asar", "app.asar.unpacked");

  const filename = `${serverData.country_name.replace(
    /\s+/g,
    "-"
  )}-${serverData.city_name.replace(/\s+/g, "-")}.ovpn`;
  const filePath = path.join(directoryPath, filename);

  let decryptedContent = decryptData(serverData.server_content);

  if (fs.existsSync(filePath)) {
    return;
  }
  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err);
    } else {
      // fs.writeFile(filePath, serverData.server_content, (err) => {
      fs.writeFile(filePath, decryptedContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
        console.log("filre writter: ", filename);
      });
    }
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Private VPN",
    width: 1000,
    height: 800,
    resizable: false,
    minimizable: true,
    maximizable: false,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file:",
    slashes: true,
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL("http://localhost:3000");
  // mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    showOnboardingNotification();
    if (!store.get("popupShown")) {
      store.set("popupShown", true);
    }
  });

  setupIpcListeners();
}

function setupIpcListeners() {
  ipcMain.on("connect-vpn", (event, configPathFromRenderer) => {
    // event.reply("connection-status", "connecting");
    const vpn = OpenVPNConnector.getInstance(configPathFromRenderer);
    vpn.on("error", (err) => {
      // event.reply("connection-status", "error");
      event.reply("connection-status", false);
      console.log("error sent from class to main:: ", err);
    });
    try {
      vpn.connect();
      setTimeout(() => {
        // event.reply("connection-status", "connected");
        event.reply("connection-status", true);
      }, 2000); // Ensure some delay here if required
    } catch (err) {
      console.log(err.message);
      event.reply("connection-status", "error");
    }
  });

  ipcMain.on("disconnect-vpn", (event, configPathFromRenderer) => {
    const vpn = OpenVPNConnector.getInstance(configPathFromRenderer);
    if (vpn) {
      vpn.disconnect();
      // event.reply("connection-status", "disconnected");
      event.reply("connection-status", false);
    }
  });

  ipcMain.on("request-popup-state", (event) => {
    event.reply("response-popup-state", store.get("popupShown"));
  });

  ipcMain.on("set-popup-shown", () => {
    store.set("popupShown", true);
  });

  ipcMain.on("send-servers", (event, servers) => {
    console.log("send-servers running!!!");
    let serversCast = servers.servers.map((server) => {
      return server.list;
    });

    const finalServers =
      serversCast &&
      serversCast.flat().map((item) => ({
        server_content: item.server_content,
        country_name: item.country_name,
        city_name: item.city_name,
      }));
    finalServers &&
      finalServers.length > 0 &&
      finalServers.forEach((server) => {
        if (server.server_content && server.country_name && server.city_name) {
          saveServerConfig(server);
          // console.log(server.country_name);
        }
      });
  });

  ipcMain.on("set-launch-at-startup", (event, isEnabled) => {
    app.setLoginItemSettings({
      openAtLogin: isEnabled,
      path: app.getPath("exe"),
    });
  });

  ipcMain.on("toggle-notification", (event, isEnabled) => {
    store.set("notificationsEnabled", isEnabled);
    event.reply("notification-toggle-confirmed", isEnabled);
    if (isEnabled) {
      notifier.notify({
        title: "Notifications Enabled",
        message: "You will receive notifications.",
        sound: true,
        appID: "Private-VPN",
      });
    }
  });
}

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});