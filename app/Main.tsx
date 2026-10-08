import Link from '@/components/Link'
import PostEntry, { type EntryPost } from '@/components/PostEntry'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

/**
 * 首页（2026-09-29 改版）：刊头（eyebrow + 站点主张）→ VDB-News 专题分区 → 最新条目 → 查看全部。
 * 条目走 PostEntry，与列表页 / 文章页共用同一套元信息口径；
 * 专题分区按 tag=vdb-news 实时筛选（打上 tag 的新文章自动进区，见 content-map 第一条线）。
 */
export default function Home({ posts }: { posts: EntryPost[] }) {
  const total = posts.length
  const vdbPosts = [...posts]
    .filter((p) => p.tags?.includes('vdb-news'))
    .sort((a, b) => (a.date < b.date ? 1 : -1))

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

      {vdbPosts.length > 0 && (
        <section className="border-b border-gray-200 py-9 dark:border-gray-700/80">
          <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
            专题 · VDB-News
          </div>
          <h2 className="mt-4 text-xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-50">
            一个自我维护向量库的 AI 情报平台
          </h2>
          <p className="mt-3 max-w-[46rem] text-[15px] leading-7 text-gray-600 dark:text-gray-400">
            16 路信源 → 清洗去重 → 语义聚类 → 深度分析 → 质量审核 → 简报组装 → 推送分发。
            这条线记录管道每一环的工程取舍与实测复盘——从整体链路，到分块、检索、聚类的每一次迭代。
          </p>
          <ul className="mt-5 space-y-2.5">
            {vdbPosts.map((post) => (
              <li key={post.path} className="flex flex-wrap items-baseline gap-x-3">
                <time
                  dateTime={post.date}
                  className="font-mono text-[12.5px] text-gray-400 tabular-nums dark:text-gray-500"
                >
                  {formatDate(post.date, siteMetadata.locale)}
                </time>
                <Link
                  href={`/${post.path}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 text-[15px] text-gray-700 transition-colors dark:text-gray-300"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px]">
            <Link
              href="/tags/vdb-news"
              className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-500 transition-colors dark:text-gray-400"
            >
              VDB 全部文章 →
            </Link>
            <a
              href="http://111.228.0.160:8080/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-500 transition-colors dark:text-gray-400"
            >
              查看在线站点 ↗
            </a>
          </div>
        </section>
      )}

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
