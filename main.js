const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const { shortEdge, longEdge } = require('pdf-book')
const path = require('path')
const url = require('url')
const fs = require('fs')


function handleSetTitle (event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog
    .showOpenDialog({ filters: ['.pdf'], properties: ['openFile', 'multiSelections'] })

  if (canceled) {
    return
  } else {
    const booklets = createPDF(filePaths)

    return booklets
  }
}

const createPDF = async (filePaths, binding) => {
  const booklets = []
    for (let filePath of filePaths) {
      const { dir, name, base, ext } = path.parse(filePath)
      const bookletName = `${name}-hefte${ext}`
      const file = fs.readFileSync(filePath)
      if (binding === 'short-edge') {
        const { saved } = await shortEdge(file)
        fs.writeFileSync(`${dir}/${bookletName}`, saved)
      } else if (binding === 'long-edge') {
        const { saved } = await longEdge(file)
        fs.writeFileSync(`${dir}/${bookletName}`, saved)
      }
      booklets.push({old: base, new: bookletName})
    }
  return booklets
}

const handleDropFiles = async (event, payload) => {
  console.log({payload})
  const booklets = await createPDF(payload.paths, payload.binding)
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.webContents.send('complete', booklets)
}

function createWindow() {
    // Create the browser window with node integration
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/images/icons/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

  console.log({dir: __dirname})
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on('dropFiles', handleDropFiles)
  ipcMain.handle('dialog:openFile', handleFileOpen)

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
