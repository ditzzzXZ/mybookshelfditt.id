import { useState } from 'react'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState<File | null>(null)
  const [bookFile, setBookFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!title || !cover || !bookFile) return alert('Isi semua dulu woy!')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('cover', cover)
    formData.append('book', bookFile)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    alert(result.message)
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Buku</h1>
      <input type="text" placeholder="Judul Buku" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] || null)} className="mb-2" />
      <input type="file" accept=".txt" onChange={(e) => setBookFile(e.target.files?.[0] || null)} className="mb-4" />
      <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
    </div>
  )
          }
