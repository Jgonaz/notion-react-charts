// Express con Node.js
import express from 'express'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const NOTION_API_KEY = process.env.VITE_NOTION_API_KEY
const CATEGORIAS_ID = process.env.VITE_NOTION_CATEGORIAS_ID
const GASTOS_ID = process.env.VITE_NOTION_GASTOS_ID
const INGRESOS_ID = process.env.VITE_NOTION_INGRESOS_ID
const APP_URL = process.env.VITE_APP_URL

const app = express()

console.log('Iniciando servidor...')

// Configura CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_URL)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Configura el cliente de Notion
const notion = new Client({
  auth: NOTION_API_KEY
})

// Maneja la solicitud desde el cliente
app.get('/get-categorias', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: CATEGORIAS_ID
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener datos de Notion API' })
  }
})
app.get('/get-ingresos', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: INGRESOS_ID
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener datos de Notion API' })
  }
})
app.get('/get-gastos', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: GASTOS_ID
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener datos de Notion API' })
  }
})

// Inicia el servidor
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
})
