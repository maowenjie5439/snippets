import { shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'

const createWindow = () => {
    // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  
//   console.log('width: ', width)
//   console.log('height: ', height)
  
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

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

export {createWindow}