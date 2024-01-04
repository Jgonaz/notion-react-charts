import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY })

export default async function (req, res) {
  const { databaseId } = req.query // Asegúrate de obtener los parámetros correctamente

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: req.query.start_cursor
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({
        error: `Error al obtener datos de la base de datos con ID: ${databaseId}`
      })
  }
}
