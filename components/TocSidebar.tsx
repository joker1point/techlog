'use client'

import { useCallback, useEffect, useState } from 'react'
import TableOfContents from '@/components/TableOfContents'
import type { TocItem } from '@/components/TableOfContents'

const STORAGE_KEY = 'techlog:toc-collapsed'

/**
 * 文章页左侧大纲栏（2026-10-05 改版）：
 * - 目录从正文右侧移到左栏，支持整栏收起 / 展开（仅 xl 断点以上，小屏行为与改版前一致）
 * - 收起状态存 localStorage，刷新后保持；首次加载直接落到偏好状态、不播过渡动画
 * - 收起 = 目录栏原地收成窄条（内嵌竖排「目录」按钮）。不做贴视口边缘的悬浮按钮：
 *   浏览器左侧的垂直标签栏 / 侧边栏浮出时会把它压住，按钮点不到（2026-10-05 修复）
 */
export default function TocSidebar({ toc, numbering }: { toc: TocItem[]; numbering?: boolean }) {
  const [collapsed, setCollapsed] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    let saved = false
    try {
      saved = window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      /* localStorage 不可用时忽略，默认展开 */
    }
    if (saved) setCollapsed(true)
    // 首帧绘制后才启用过渡：刷新时直接落到偏好状态，不播收起/滑入动画
    const id = window.requestAnimationFrame(() => setAnimate(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  const persist = useCallback((next: boolean) => {
    setCollapsed(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      /* 忽略写入失败 */
    }
  }, [])

  return (
    <aside
      aria-label="文章目录"
      className={`mr-12 hidden shrink-0 overflow-clip min-[1152px]:block ${
        animate ? 'transition-[width] duration-300 motion-reduce:transition-none' : ''
      } ${collapsed ? 'w-10' : 'w-52'}`}
    >
      <div className="sticky top-24 w-52 pb-4">
        <div
          className={`max-h-[calc(100vh-7rem)] overflow-x-hidden overflow-y-auto ${
            animate ? 'transition-opacity duration-200' : ''
          } ${collapsed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <TableOfContents toc={toc} numbering={numbering} onCollapse={() => persist(true)} />
        </div>
        <button
          type="button"
          onClick={() => persist(false)}
          aria-label="展开文章目录"
          title="展开目录"
          className={`absolute top-0 left-0 flex w-10 items-center justify-center rounded-lg border border-gray-200 py-3 text-gray-400 hover:border-gray-300 hover:text-gray-900 dark:border-gray-700/80 dark:text-gray-500 dark:hover:text-gray-100 ${
            animate ? 'transition-all motion-reduce:transition-none' : ''
          } ${collapsed ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <span className="text-[11px] tracking-[0.18em]" style={{ writingMode: 'vertical-rl' }}>
            目录
          </span>
          <svg
            className="ml-0.5 h-3 w-3 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 0 1 0-1.414L12.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </aside>
  )
}
