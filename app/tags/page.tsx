import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '标签', description: '按标签浏览全部文章' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <header className="border-b border-gray-200 pb-7 dark:border-gray-700/80">
        <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          共 {sortedTags.length} 个标签
        </div>
        <h1 className="mt-3 text-[1.75rem] leading-[1.25] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.125rem] dark:text-gray-50">
          标签
        </h1>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {sortedTags.length === 0 && (
          <p className="text-[15px] text-gray-500 dark:text-gray-400">暂无标签。</p>
        )}
        {sortedTags.map((t) => (
          <Tag key={t} text={t} count={tagCounts[t]} />
        ))}
      </div>
    </>
  )
}
