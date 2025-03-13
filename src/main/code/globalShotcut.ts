import { App, BrowserWindow, globalShortcut } from "electron"

export const globalShotcutRegister = (window: BrowserWindow, app: App) => {
  registerShowWindow(window)

  // 在应用退出时注销所有快捷键
  app.on('will-quit', () => {
    globalShortcut.unregisterAll()
  })
}



/**
 * 注册显示窗口的快捷键
 * @param window 
 */
const registerShowWindow = (window: BrowserWindow) => {
  const ret = globalShortcut.register('Shift+Space', () => {
    console.log('用户按下了Shift+Space快捷键')

    // 检查窗口当前状态
    if (window.isVisible()) {
      // 如果窗口当前可见，则隐藏窗口
      console.log('窗口当前可见，执行隐藏操作')
      // 隐藏窗口，在任务栏中不可见，若希望在任务栏中可见，则使用window.minimize()
      window.hide()
    } else {
      // 如果窗口当前不可见或最小化，则显示窗口
      console.log('窗口当前不可见，执行显示操作')
      window.show()
    }
  })

  if (!ret) {
    console.log('快捷键注册失败')
  }

  // 检查快捷键是否注册成功
  console.log('快捷键注册结果：', globalShortcut.isRegistered('Shift+Space'))
}


// /**
//  * 注册隐藏窗口的快捷键
//  * @param window 
//  */
// const registerHideWindow = (window: BrowserWindow) => {
//   const ret = globalShortcut.register('Shift+Space', () => {
//     console.log('用户按下了Shift+Space快捷键')
//   })


// }