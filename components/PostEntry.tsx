import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

export type EntryPost = {
  path: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  featured?: boolean
  wordCount?: number
  readingTime?: { text?: string; minutes?: number }
}

/**
 * 首页 / 列表页共用的文章条目（2026-09-29 改版）。
 * 与文章页头部同一套编辑级语言：mono 元信息行 → 标题 → 导语 → 标签。
 * 元信息行刻意与文章页用同样的「/」分隔与 tabular-nums，保证列表与详情页读数一致。
 */
export default function PostEntry({
  post,
  compact = false,
}: {
  post: EntryPost
  compact?: boolean
}) {
  const { path, date, title, summary, tags, featured, wordCount, readingTime } = post
  const href = `/${path}`

  return (
    <article className="group max-w-[46rem]">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12.5px] text-gray-500 dark:text-gray-400">
        <time dateTime={date} className="tracking-wide">
          {formatDate(date, siteMetadata.locale)}
        </time>
        {wordCount ? (
          <>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="tabular-nums">{wordCount.toLocaleString()} 字</span>
          </>
        ) : null}
        {readingTime?.text ? (
          <>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="tabular-nums">{readingTime.text}</span>
          </>
        ) : null}
        {featured && (
          <span className="bg-primary-500 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold text-white">
            置顶
          </span>
        )}
      </div>

      <h2
        className={`mt-3 font-bold tracking-tight text-balance text-gray-900 dark:text-gray-50 ${
          compact ? 'text-xl leading-8' : 'text-[1.375rem] leading-8 sm:text-2xl sm:leading-9'
        }`}
      >
        <Link
          href={href}
          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
        >
          {title}
        </Link>
      </h2>

      {summary && (
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-gray-600 dark:text-gray-400">
          {summary}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tags?.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
        <Link
          href={href}
          className="ml-auto font-mono text-[12.5px] text-gray-400 transition-colors group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-100"
          aria-label={`阅读全文：${title}`}
        >
          阅读全文 →
        </Link>
      </div>
    </article>
  )
}
