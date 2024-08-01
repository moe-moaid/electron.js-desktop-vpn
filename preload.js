const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => {
    let validChannels = [
      "connect-vpn",
      "disconnect-vpn",
      "set-popup-shown",
      "request-popup-state",
      "send-servers",
      "connection-status",
      "toggle-notification",
      "set-launch-at-startup"
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = [
      "fromMain",
      "response-popup-state",
      "connection-status",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  removeListener: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  }
});
