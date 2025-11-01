// Adicionando o recarregamento automático.
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

// Importando pacotes necessários para criar a janela da minha aplicação e controlar o ciclo de vida da aplicação.
const { app, BrowserWindow } = require('electron');

// Criando minha função para criar a jenela e definindo algumas caracteristicas de como eu quero ela.
const createWindow = () => {
    
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#f4f4f4',
    });

    // Carregando arquivo html. 
    win.loadFile('index.html');
};

// Só inicia a aplicação após todo o electron for carregado.
app.whenReady().then(() => {
createWindow();
});