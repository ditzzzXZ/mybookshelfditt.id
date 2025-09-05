export function parseChapters(text: string) {
  const raw = text.split(/\$chap\d+/).filter(Boolean)
  return raw.map((content, i) => ({
    title: `Chapter ${i + 1}`,
    content: content.trim(),
  }))
}
