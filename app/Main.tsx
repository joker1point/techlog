import Link from '@/components/Link'
import PostEntry, { type EntryPost } from '@/components/PostEntry'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

/**
 * 首页（2026-09-29 改版）：刊头（eyebrow + 站点主张）→ 最新条目 → 查看全部。
 * 条目走 PostEntry，与列表页 / 文章页共用同一套元信息口径。
 */
export default function Home({ posts }: { posts: EntryPost[] }) {
  const total = posts.length

  return (
    <>
      <header className="border-b border-gray-200 pb-9 dark:border-gray-700/80">
        <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          {siteMetadata.title} · 共 {total} 篇
        </div>
        <h1 className="mt-4 text-[1.875rem] leading-[1.28] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.25rem] dark:text-gray-50">
          {siteMetadata.description.replace(/。$/, '')}
        </h1>
      </header>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700/80">
        {total === 0 && <li className="py-12 text-gray-500 dark:text-gray-400">暂无文章。</li>}
        {posts.slice(0, MAX_DISPLAY).map((post) => (
          <li key={post.path} className="py-9">
            <PostEntry post={post} />
          </li>
        ))}
      </ul>

      {total > MAX_DISPLAY && (
        <div className="mt-8 flex justify-end">
          <Link
            href="/blog"
            className="hover:text-primary-600 dark:hover:text-primary-400 font-mono text-[13px] text-gray-500 transition-colors dark:text-gray-400"
            aria-label="查看全部文章"
          >
            查看全部 {total} 篇 →
          </Link>
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
