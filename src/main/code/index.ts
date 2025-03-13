import { app, BrowserWindow } from 'electron'
import * as windowApi from './window'
import { ipcRegister } from './ipc'
import { globalShotcutRegister } from './globalShotcut'

app.whenReady().then(() => {
  const codeWindow = windowApi.createWindow()

  /**
   * 监听应用的activate事件 - 这个事件在macOS系统上当用户点击Dock栏中的应用图标时触发
    当触发时，检查当前是否有打开的窗口（BrowserWindow.getAllWindows().length === 0）
    如果没有打开的窗口，则调用windowApi.createWindow()方法创建一个新窗口
    这是macOS平台上的一个常见设计模式。在macOS上，关闭所有窗口通常不会完全退出应用程序，应用仍然在后台运行。当用户再次点击Dock图标时，应该重新打开一个窗口而不是什么都不做。
   */
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) windowApi.createWindow()
  })

  ipcRegister(codeWindow)

  globalShotcutRegister(codeWindow, app)
})

export default { windowApi }
