const EventEmitter = require("events");
const { exec, execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
// const {ipcMain} = require('electron');

let instance = null;

let openvpnBinary;

class OpenVPNConnector extends EventEmitter {
  constructor(configFile) {
    super();
    if (instance) {
      return instance;
    }
    this.configFile = configFile;
    this.openvpnProcess;
    instance = this;
    // this.openvpnBinary = null;
  }

  connect() {
    // ipcMain.emit('connection-status', 'connecting');
    switch (process.platform) {
      case "win32":
        let openvpnBinary = path.resolve(
          "resources",
          "windows",
          "bin",
          "openvpn.exe"
        );
        // For build only
        // let openvpnBinary = path.join(
        //   // __dirname,
        //   "resources",
        //   "app.asar.unpacked",
        //   "resources",
        //   "windows",
        //   "bin",
        //   "openvpn.exe"
        // );

        // For build only
        // let openvpnBinary = path.resolve(
        //   // __dirname,
        //   // "app.asar.unpacked",
        //   "resources",
        //   "app.asar.unpacked",
        //   "resources",
        //   "windows",
        //   "bin",
        //   "openvpn.exe"
        // );
        // For build only
        let currentFile = path.resolve(
          // __dirname,
          "resources",
          "app.asar.unpacked",
          "resources",
          "scripts"
        );
        if (!fs.existsSync(openvpnBinary)) {
          console.error(
            `Error finding openvpn file exuctable, file was not found! ${openvpnBinary}`
          );
          return;
        }
        // Actually connect to the Chosen server
        this.openvpnProcess = execFile(
          openvpnBinary,
          // ["--config", `${__dirname}\\app\\public\\scripts\\${this.configFile}`],
          // For build only
          ["--config", `${currentFile}\\${this.configFile}`],
          {
            // cwd: path.join(__dirname, "resources", "windows", "bin"),
            cwd: path.dirname(openvpnBinary),
          },
          (error, stdout, stderr) => {
            console.log("the connection button is clicked");
            if (error || stderr) {
              this.emit(
                "error",
                new Error(
                  `Error occured while connecting: ${error.message || stderr}`
                )
              );
              console.error(`Error occured while connecting: ${error.message}`);
              // ipcMain.emit('connection-status', 'error');
              return;
            }
            console.log(`OpenVPN stdout: ${stdout}`);
          }
        );
        
        this.openvpnProcess.stdout.on("data", (data) => {
          console.log(`OpenVPN data: ${data}`);
        });

        this.openvpnProcess.stderr.on("data", (data) => {
          console.log(`OpenVPN data: ${data}`);
        });

        this.openvpnProcess.on("close", (code) => {
          console.log(`OpenVPN process exited with code ${code}`);
          this.openvpnProcess = null;
        });

        this.openvpnProcess.on("error", (err) => {
          console.error(`OpenVPN process error: ${err}`);
        });
    }
  }

  disconnect() {
    if (this.openvpnProcess) {
      console.log("disconnection happened");
      exec(`taskkill /IM openvpn.exe /F`, (error, stdout, stderr) => {
        if (error || stderr) {
          console.error(`Error killing the process: ${error}`);
          return;
        }
        console.log("The process was killed successfully");
      });
    } else {
      console.log("OpenVPN process is not running.");
    }
  }

  static getInstance(configFile) {
    if (!instance) {
      instance = new OpenVPNConnector(configFile);
    } else {
      instance.configFile = configFile;
    }
    return instance;
  }
}

module.exports = OpenVPNConnector;
