'use client'

import { useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostEntry from '@/components/PostEntry'

/** 页面构造的分页信息（当前页 / 总页数） */
interface PaginationProps {
  totalPages: number
  currentPage: number
}
/** Pagination 组件的 props：分页信息 + 列表根路径 */
interface PaginationRenderProps extends PaginationProps {
  /** 分页链接的站内根路径（不含 basePath 前缀与 .html），如 `/blog` */
  basePath: string
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  /** 当前列表的站内根路径，由页面显式传入（勿用 usePathname 推导，静态导出下客户端值带 basePath 与 .html） */
  basePath: string
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

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  basePath,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <header className="border-b border-gray-200 pb-7 dark:border-gray-700/80">
        <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          {searchValue ? `匹配 ${displayPosts.length} 篇` : `共 ${posts.length} 篇`}
        </div>
        <h1 className="mt-3 text-[1.75rem] leading-[1.25] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.125rem] dark:text-gray-50">
          {title}
        </h1>
        <div className="relative mt-5 max-w-md">
          <label>
            <span className="sr-only">搜索文章</span>
            <input
              aria-label="搜索文章"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索标题 / 摘要 / 标签"
              className="focus:border-primary-500 block w-full border-b border-gray-300 bg-transparent pt-1 pb-2 pl-7 text-[15px] text-gray-900 transition-colors outline-none placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </label>
          <svg
            className="absolute top-1.5 left-0 h-4.5 w-4.5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700/80">
        {displayPosts.length === 0 && (
          <li className="py-16 text-center text-[15px] text-gray-500 dark:text-gray-400">
            {searchValue ? `没有匹配「${searchValue}」的文章` : '暂无文章。'}
          </li>
        )}
        {displayPosts.map((post) => (
          <li key={post.path} className="py-8">
            <PostEntry post={post} compact />
          </li>
        ))}
      </ul>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          basePath={basePath}
        />
      )}
    </>
  )
}
