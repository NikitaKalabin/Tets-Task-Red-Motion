import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private ipc: IpcService) {}

  getItems(): Promise<any[]> {
    return this.ipc.invoke<any[]>('get-items');
  }

  addItem(name: string): Promise<any> {
    return this.ipc.invoke('add-item', name);
  }
}