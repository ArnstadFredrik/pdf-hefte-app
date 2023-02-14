// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  dropFiles: (payload) => ipcRenderer.send('dropFiles', payload),
  onFilesComplete: (callback) => ipcRenderer.on('complete', callback),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
})
