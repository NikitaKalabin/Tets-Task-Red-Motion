import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from 'electron';

export type IpcCallback = (event: IpcRendererEvent, ...args: any[]) => void;

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private _ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron's IPC was not loaded");
    }
  }

  public on(channel: string, listener: IpcCallback): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args: any[]): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }

  public async invoke<T = any>(channel: string, ...args: any[]): Promise<T> {
    if (!this._ipc) {
      return Promise.reject(new Error('Electron IPC not available'));
    }
    return this._ipc.invoke(channel, ...args);
  }
}