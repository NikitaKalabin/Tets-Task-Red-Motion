import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';

let db: sqlite3.Database;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false
    }
  });
  
  win.loadFile(path.join(__dirname, '../dist/test-app/browser/index.html'));

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  db = new sqlite3.Database('data.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      db.run(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        )`,
        (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
          }
        }
      );
    }
  });
  ipcMain.handle('get-items', async () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM items`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('add-item', async (event, name: string) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO items (name) VALUES (?)`;
      db.run(query, [name], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastInsertRowid: this.lastID });
        }
      });
    });
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});