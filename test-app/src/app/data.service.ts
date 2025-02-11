import { Injectable } from '@angular/core';
import { Database } from 'sqlite3';

@Injectable({
  providedIn: 'root'  
})
export class DataService {
  private db: Database;

  constructor() {
    this.db = new Database('data.db');
    this.db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )`);
  }

  getItems(callback: (err: Error, rows: any[]) => void) {
    this.db.all(`SELECT * FROM items`, callback);
  }

  addItem(name: string, callback: (err: Error) => void) {
    this.db.run(`INSERT INTO items (name) VALUES (?)`, [name], callback); 
  }
}