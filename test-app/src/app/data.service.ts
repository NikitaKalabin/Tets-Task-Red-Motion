import { Injectable, WritableSignal, signal } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, DBSQLiteValues, SQLiteConnection } from '@capacitor-community/sqlite';

const DB_DIGITS = 'digitsDB';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private digits: string[] = [];
  constructor() {
  }
  async initializePlugin() {
    this.db = await this.sqlite.createConnection('digitsDB', false, 'no-encryption', 1, false);
    await this.db.open();
    const schema = `
      CREATE TABLE IF NOT EXISTS digits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL
      );
    `;
    await this.db.execute(schema);
    
    this.loadDigits();
    return true;
  }


  async saveDigit(digit: string){
      const result = await this.db.query(`INSERT INTO digits (value) VALUES (?);`, [digit]);
      this.loadDigits();
      return result;
  }

  async loadDigits() {
      const result: DBSQLiteValues = await this.db.query('SELECT value FROM digits;');
      console.log('Digits loaded:', JSON.stringify(result.values));
      this.digits = result.values ? result.values.map(row => String(row.value)) : [];
  }

  async getDigits(): Promise<string[]> {
    await this.loadDigits();
    return this.digits;
  }
}