const {app, shell} = require('electron');
const forge = require('electron-forge');

const installer = forge.createInstaller({
  files: ['tap-windows-installer.exe'],

  isntall: () => {
    shell.execute('tap-windows-installer.exe');
  }
});


installer.make().then(() => {
  console.log('Installer package generated successfully');
}).catch((error) => {
  console.error("Error generating installer package: ", error);
})
