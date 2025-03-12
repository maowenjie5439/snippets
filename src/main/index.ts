import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ipcRegister } from './ipc'

function createWindow(): void {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  
  console.log('width: ', width)
  console.log('height: ', height)
  
  const mainWindow = new BrowserWindow({
    // minWidth: 400,
    // minHeight: 400,
    width: 500,
    height: 400,
    x: width - 700,
    y: 100,
    alwaysOnTop: true,
    // 将窗口设置为透明
    // transparent: true,
    // frame: false,  // 添加无边框设置，使透明效果在 Windows 上生效
    // titleBarStyle: 'hidden', // 隐藏标题栏但保留窗口控制按钮
    show: false,
    // autoHideMenuBar: true,  // 隐藏菜单栏
    movable: true,  // 确保窗口可移动
    resizable: true, // 允许通过鼠标调整窗口大小
    // useContentSize: false, // 确保尺寸包括窗口边框
    // hasShadow: true, // 添加窗口阴影，使边缘更容易看到
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  // 打开开发者工具
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  }) 

  mainWindow.on('moved', () => {
    console.log('moved')
  })

  mainWindow.on('resize', () => {
    console.log('窗口大小已调整')
    const [width, height] = mainWindow.getSize()
    console.log(`新尺寸: ${width} x ${height}`)
  })

  ipcRegister(mainWindow)


  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 处理窗口调整大小的消息
  // ipcMain.on('resize-window', (_, { width, height }) => {
  //   const mainWindow = BrowserWindow.getFocusedWindow()
  //   if (mainWindow) {
  //     mainWindow.setSize(width, height)
  //     console.log(`窗口大小已调整为: ${width} x ${height}`)
  //   }
  // })

  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
