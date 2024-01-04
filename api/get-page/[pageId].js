import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY })

export default async function (req, res) {
  const { pageId } = req.params // Asegúrate de obtener los parámetros correctamente

  try {
    const response = await notion.pages.retrieve({
      page_id: pageId
    })
    res.json(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: `Error al obtener datos de la página con ID: ${pageId}` })
  }
}
