const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');
electronReload(__dirname);


const createWindow = () => {

    const win = new BrowserWindow({
      width: 1200,
      maxWidth: 1200,
      height: 800,
      maxHeight: 800,
      backgroundColor: "lighslategray"
    });

    win.loadFile('index.html');

};


app.whenReady().then(() => {
    createWindow();
});