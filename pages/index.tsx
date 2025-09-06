import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/books'))
  const metas = files
    .filter((f) => f.endsWith('-meta.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join('public/books', f), 'utf-8')
      return JSON.parse(raw)
    })

  return { props: { books: metas } }
}

export default function Home({ books }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 MyBookshelf</h1>
      <div className="grid grid-cols-2 gap-4">
        {books.map((book, i) => (
          <a key={i} href={`/book/${book.title}`} className="border p-2 rounded hover:shadow">
            <img src={book.cover} alt="Sampul" className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{book.title}</h2>
          </a>
        ))}
      </div>
    </div>
  )
}
