import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { parseChapters } from '../../lib/parseChapters'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req, res) {
  const form = formidable({ multiples: true, uploadDir: './public/books', keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload gagal' })

    const title = fields.title[0]
    const coverPath = files.cover[0].filepath
    const bookPath = files.book[0].filepath

    const bookText = fs.readFileSync(bookPath, 'utf-8')
    const chapters = parseChapters(bookText)

    const metadata = {
      title,
      cover: `/books/${path.basename(coverPath)}`,
      file: `/books/${path.basename(bookPath)}`,
      chapters,
    }

    fs.writeFileSync(`./public/books/${title}-meta.json`, JSON.stringify(metadata))
    res.status(200).json({ message: 'Buku berhasil di-upload oleh Asep!' })
  })
}
