// Express con Node.js
import express from 'express'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const NOTION_API_KEY = process.env.VITE_NOTION_API_KEY
const APP_URL = process.env.VITE_APP_URL

const app = express()

console.log('Iniciando servidor...')

// Configura CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_URL)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Configura el cliente de Notion
const notion = new Client({
  auth: NOTION_API_KEY
})

// Maneja la solicitud desde el cliente
app.get('/get-database/:databaseId', async (req, res) => {
  const { databaseId } = req.params

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: req.query.start_cursor
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Error al obtener datos de la base de datos con ID: ${databaseId}` })
  }
})

// Maneja la solicitud desde el cliente
app.get('/get-page/:pageId', async (req, res) => {
  const { pageId } = req.params

  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
      start_cursor: req.query.start_cursor
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Error al obtener datos de la página con ID: ${pageId}` })
  }
})

// Inicia el servidor
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
})
