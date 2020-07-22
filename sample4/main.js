
const { app, BrowserWindow, session, Menu } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 600,
    webPreferences: {
      nodeIntegration: false
    }
  })

  // Once the window has finished loading, let's check out
  // the cookies
  mainWindow.webContents.on('did-finish-load', () => {
    // Query all cookies.
    session.defaultSession.cookies.get({}, (error, cookies) => {
      console.log(error, cookies)
    })

    // Query all cookies associated with a specific url.
    session.defaultSession.cookies.get({ url: 'https://www.vertex.com' }, (error, cookies) => {
      console.log(error, cookies)
    })

    // Set a cookie with the given cookie data;
    // may overwrite equivalent cookies if they exist.
    const cookie = { url: 'https://www.vertexinc.com', name: 'sample', value: 'samplev' }
    session.defaultSession.cookies.set(cookie, (error) => {
      if (error) console.error(error)
    })
  })

  //mainWindow.loadURL('https://vertexinc.com')
  mainWindow.loadURL('https://di.vertexsmb.com/dm-integrity-ui')

 // add the edit window
   const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'Placeholder',
      submenu: [
        {
          label: 'Logging Handler',
          click () {
            console.log('custom...')
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)



})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
