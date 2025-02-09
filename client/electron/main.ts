import { app, BrowserWindow } from 'electron'
import { startServer } from 'next/dist/server/lib/start-server'
import { getPort } from 'get-port-please'
import { fork } from 'child_process'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import fs from 'fs'

// Configuração de banco
const logFilePath = is.dev
  ? join(__dirname, '../app.log')
  : join(process.resourcesPath, 'app.log')

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' })

const logToFile = (message: string) => {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`
  console.log(logMessage)
  logStream.write(logMessage)
}

const dbPath = is.dev
  ? join(__dirname, '../../server/prisma/dev.db')
  : join(process.resourcesPath, 'data/database.db')

logToFile(`caminho do banco: ${dbPath}`)
process.env.DATABASE_URL = `file:${dbPath}`
process.env.JWT_SECRET = 'secret'

// Função para criar janela
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  const loadURL = async () => {
    if (is.dev) {
      mainWindow.loadURL('http://localhost:3000')
    } else {
      try {
        const port = await startNextJSServer()
        console.log('Next.js server started on port:', port)
        mainWindow.loadURL(`http://localhost:${port}`)
      } catch (error) {
        console.error('Error starting Next.js server:', error)
      }
    }
  }

  loadURL()
  return mainWindow
}

// Inicia o servidor do Next
const startNextJSServer = async () => {
  try {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] })
    const webDir = join(app.getAppPath(), 'app')

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: 'localhost',
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    })

    return nextJSPort
  } catch (error) {
    console.error('Error starting Next.js server:', error)
    throw error
  }
}

// Inicia o backend
const startBackend = () => {
  const backendPath = is.dev
    ? join(__dirname, '../../server/dist/src/main.js')
    : join(process.resourcesPath, 'app.asar/server/dist/src/main.js')

  logToFile(`Starting backend from: ${backendPath}`)

  const backendProcess = fork(backendPath, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  })

  logToFile(`Backend PID: ${backendProcess.pid}`)

  backendProcess.on('error', (err) => {
    logToFile(`Erro ao iniciar o backend: ${err.message}`)
  })

  backendProcess.on('exit', (code) => {
    if (code !== 0) {
      logToFile(`Processo do backend finalizado com código: ${code}`)
    }
  })

  backendProcess.stdout?.on('data', (data) => {
    logToFile(`Backend output: ${data}`)
  })

  backendProcess.stderr?.on('data', (data) => {
    logToFile(`Backend error output: ${data}`)
  })

  // setInterval(() => {
  //   if (backendProcess.connected) {
  //     logToFile('Backend process is still running')
  //   } else {
  //     logToFile('Backend process has stopped')
  //   }
  // }, 5000)
}

// Chama quando o app está pronto
app.whenReady().then(() => {
  createWindow()
  startBackend()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
