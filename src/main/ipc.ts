import { BrowserWindow, ipcMain } from 'electron'

export const ipcRegister = (window: BrowserWindow) => {
    ipcMain.on('hideWindow', (event, arg: { [key: string]: any } = {}) => {
        console.log(`hideWindow触发`)
        console.log('event: ', event)
        console.log('arg: ', arg)
        window.hide()
    })
}
