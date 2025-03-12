import { BrowserWindow, ipcMain } from 'electron'

ipcMain.on('hideWindow', (event, arg: { [key: string]: any } = {}) => {
    console.log(`hideWindow触发, event: ${event}, arg: ${arg}`)
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        win.hide()
    }
})