'use client'

import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostEntry from '@/components/PostEntry'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'

/** 页面构造的分页信息（当前页 / 总页数） */
interface PaginationProps {
  totalPages: number
  currentPage: number
}
/** Pagination 组件的 props：分页信息 + 列表根路径 */
interface PaginationRenderProps extends PaginationProps {
  /** 分页链接的站内根路径（不含 basePath 前缀与 .html），如 `/blog`、`/tags/engineering` */
  basePath: string
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  /** 全站文章总数（侧栏「全部文章」显示用；tag 页的 posts 是过滤后的，不能拿来当总数） */
  totalPosts?: number
  /** 当前列表的站内根路径，由页面显式传入。不要用 usePathname() 推导：静态导出（basePath + .html）
   *  下它在客户端会返回带前缀与后缀的真实 URL（如 /techlog/blog.html），
   *  推出来的分页链接会变成 `<list>.html/page/N.html` → 404（2026-10-03 修复） */
  basePath: string
  /** 当前激活的标签 slug（tag 页传入）；不传表示「全部文章」视图 */
  activeTag?: string
}

function Pagination({ totalPages, currentPage, basePath }: PaginationRenderProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  // 第 1 页不能写成 `/blog/`——全站 trailingSlash:false，带尾斜杠会 404
  const pageHref = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`)

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
  basePath,
  activeTag,
}: ListLayoutProps) {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const allPostsActive = !activeTag

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const tagList = (
    <ul className="space-y-px border-l border-gray-200 dark:border-gray-700/80">
      <li>
        <Link
          href="/blog"
          className={`-ml-px block border-l-2 py-1.5 pl-3 text-[13px] leading-5 transition-colors ${
            allPostsActive
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
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              basePath={basePath}
            />
          )}
        </div>
      </div>
    </>
  )
}
