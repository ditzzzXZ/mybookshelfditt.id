import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function BookViewer() {
  const { query } = useRouter()
  const [book, setBook] = useState(null)

  useEffect(() => {
    if (query.id) {
      fetch(`/books/${query.id}-meta.json`)
        .then((res) => res.json())
        .then(setBook)
    }
  }, [query.id])

  if (!book) return <p className="p-4">📖 Loading buku...</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src={book.cover} alt="Sampul" className="w-full mb-4 rounded" />
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      {book.chapters.map((chap, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{chap.title}</h2>
          <p className="whitespace-pre-line">{chap.content}</p>
        </div>
      ))}
    </div>
  )
}
