const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: {
      unpackDir: "resources/**/*",
    },
    icon: "./icon",
    files: [
      {
        from: "resources/**/*",
        to: "resources",
      },
      
      {
        from: "app/public/**/*",
        to: "resources",
      },
    ],
    win32metadata: {
      "requested-execution-level": "requireAdministrator"
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "pvpn",
        authors: "9D Technologies",
        exe: "pvpn.exe",
        description:
          "This is a desktop application which enables you to connect to OpenVPN servers",
        setupIcon: "./icon.ico",
        icon: "./icon.ico",
        setupExe: "PVPN.exe",
        noMsi: true,
        oneClick: false,
        perMachine: true,
        allowElevation: true,
        runAfterFinish: true,
        executableArgs:['--run-installer']
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
