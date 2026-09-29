'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostEntry from '@/components/PostEntry'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  /** 全站文章总数（侧栏「全部文章」显示用；tag 页的 posts 是过滤后的，不能拿来当总数） */
  totalPosts?: number
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  // 第 1 页不能写成 `/blog/`——全站 trailingSlash:false，带尾斜杠会 404
  const pageHref = (n: number) => (n === 1 ? `/${basePath}` : `/${basePath}/page/${n}`)

  return (
    <nav className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 font-mono text-[12.5px] dark:border-gray-700/80">
      {prevPage ? (
        <Link
          href={pageHref(currentPage - 1)}
          rel="prev"
          className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          ← 上一页
        </Link>
      ) : (
        <span className="text-gray-300 dark:text-gray-600">← 上一页</span>
      )}
      <span className="text-gray-400 tabular-nums dark:text-gray-500">
        第 {currentPage} / {totalPages} 页
      </span>
      {nextPage ? (
        <Link
          href={pageHref(currentPage + 1)}
          rel="next"
          className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          下一页 →
        </Link>
      ) : (
        <span className="text-gray-300 dark:text-gray-600">下一页 →</span>
      )}
    </nav>
  )
}

/**
 * 带标签导航的列表页（2026-09-29 改版）：
 * 侧栏改为与文章目录同一套语言（mono 标签 + 左细线 + 当前项主色），
 * 去掉此前的灰底阴影卡片；移动端补一行可横向滚动的标签。
 */
export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  totalPosts,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = decodeURI(pathname.split('/tags/')[1] ?? '')

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const tagList = (
    <ul className="space-y-px border-l border-gray-200 dark:border-gray-700/80">
      <li>
        <Link
          href="/blog"
          className={`-ml-px block border-l-2 py-1.5 pl-3 text-[13px] leading-5 transition-colors ${
            pathname.startsWith('/blog')
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
              : 'hover:border-primary-300 border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
          }`}
        >
          全部文章
          {totalPosts !== undefined && (
            <span className="ml-1.5 text-gray-400 tabular-nums dark:text-gray-500">
              {totalPosts}
            </span>
          )}
        </Link>
      </li>
      {sortedTags.map((t) => (
        <li key={t}>
          <Link
            href={`/tags/${slug(t)}`}
            className={`-ml-px block border-l-2 py-1.5 pl-3 text-[13px] leading-5 transition-colors ${
              activeTag === slug(t)
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                : 'hover:border-primary-300 border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            {t}
            <span className="ml-1.5 text-gray-400 tabular-nums dark:text-gray-500">
              {tagCounts[t]}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <header className="border-b border-gray-200 pb-7 dark:border-gray-700/80">
        <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          共 {posts.length} 篇
        </div>
        <h1 className="mt-3 text-[1.75rem] leading-[1.25] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.125rem] dark:text-gray-50">
          {title}
        </h1>
      </header>

      <div className="mt-8 flex flex-col gap-10 sm:flex-row sm:gap-14">
        <aside className="hidden w-[190px] shrink-0 sm:block">
          <div className="font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
            标签
          </div>
          <div className="mt-3">{tagList}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="no-scrollbar -mx-4 mb-2 flex gap-2 overflow-x-auto px-4 pb-1 sm:hidden">
            {sortedTags.slice(0, 12).map((t) => (
              <Tag key={t} text={t} count={tagCounts[t]} />
            ))}
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700/80">
            {displayPosts.length === 0 && (
              <li className="py-16 text-center text-[15px] text-gray-500 dark:text-gray-400">
                暂无文章。
              </li>
            )}
            {displayPosts.map((post) => (
              <li key={post.path} className="py-8">
                <PostEntry post={post} compact />
              </li>
            ))}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
