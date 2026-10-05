'use client'

import { useEffect, useMemo, useState } from 'react'
import { numberToc } from '@/lib/headingNumbering'

export type TocItem = {
  value: string
  url: string
  depth: number
}

const MIN_ITEMS = 3

/**
 * 文章页 sticky 目录：只取 h2/h3，滚动高亮当前章节。
 * 条目太少（< MIN_ITEMS）时不渲染。
 * numbering=true 时给条目加编号（与正文的 CSS 计数器同规则，见 lib/headingNumbering.ts）。
 * 传入 onCollapse 时，「目录」标题行右侧渲染收起按钮（由外层 TocSidebar 控制收起）。
 */
export default function TableOfContents({
  toc,
  numbering = false,
  onCollapse,
}: {
  toc: TocItem[]
  numbering?: boolean
  onCollapse?: () => void
}) {
  const items = useMemo(() => (toc || []).filter((t) => t.depth === 2 || t.depth === 3), [toc])
  const numbers = useMemo(() => (numbering ? numberToc(items) : null), [numbering, items])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (items.length < MIN_ITEMS) return
    const headings = items
      .map((item) => document.getElementById(decodeURIComponent(item.url.replace(/^#/, ''))))
      .filter((el): el is HTMLElement => Boolean(el))
    if (headings.length === 0) return

    let ticking = false

    const update = () => {
      ticking = false
      const offset = 100 // 顶部留白 + 进度条余量
      let current = headings[0].id
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= offset) current = h.id
        else break
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  if (items.length < MIN_ITEMS) return null

  return (
    <nav aria-label="文章目录">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          目录
        </div>
        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="收起目录"
            title="收起目录"
            className="-mr-1 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1 0 1.414Zm-6 0a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L5.414 10l4.293 4.293a1 1 0 0 1 0 1.414Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <ul className="mt-3 space-y-px border-l border-gray-200 dark:border-gray-700/80">
        {items.map((item) => {
          const id = decodeURIComponent(item.url.replace(/^#/, ''))
          const active = activeId === id
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className={`-ml-px block border-l-2 py-1.5 pr-2 text-[13px] leading-5 transition-colors ${
                  item.depth === 3 ? 'pl-6' : 'pl-3.5'
                } ${
                  active
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200'
                }`}
              >
                {numbers?.get(item.url) && (
                  <span className="mr-1.5 font-mono text-[11.5px] text-gray-400 tabular-nums dark:text-gray-500">
                    {numbers.get(item.url)}
                  </span>
                )}
                {item.value}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
