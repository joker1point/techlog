/**
 * Count words in mixed Chinese/English text.
 * - CJK characters each count as 1 word
 * - English words split by whitespace
 */
export function countWords(text: string): number {
  // Count CJK characters
  const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g
  const cjkChars = text.match(cjkRegex) || []

  // Remove CJK chars and count remaining English words
  const nonCjkText = text.replace(cjkRegex, ' ').trim()
  const englishWords = nonCjkText.split(/\s+/).filter((w) => w.length > 0 && /[a-zA-Z0-9]/.test(w))

  return cjkChars.length + englishWords.length
}

/**
 * Calculate estimated reading time in minutes.
 * Chinese: ~300 chars/min, English: ~200 words/min
 */
export function readingTime(text: string): number {
  const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g
  const cjkChars = (text.match(cjkRegex) || []).length

  const nonCjkText = text.replace(cjkRegex, ' ')
  const englishWords = nonCjkText
    .split(/\s+/)
    .filter((w) => w.length > 0 && /[a-zA-Z0-9]/.test(w)).length

  const cjkMinutes = cjkChars / 300
  const englishMinutes = englishWords / 200

  return Math.max(1, Math.ceil(cjkMinutes + englishMinutes))
}
