'use client'

import { useCallback, useEffect, useState } from 'react'
import TableOfContents from '@/components/TableOfContents'
import type { TocItem } from '@/components/TableOfContents'

const STORAGE_KEY = 'techlog:toc-collapsed'

/**
 * 文章页左侧大纲栏（2026-10-05 改版）：
 * - 目录从正文右侧移到左栏，支持整栏收起 / 展开（仅 xl 断点以上，小屏行为与改版前一致）
 * - 收起状态存 localStorage，刷新后保持；首次加载直接落到偏好状态、不播过渡动画
 * - 收起后左边缘留一个竖排「目录」标签用于重新展开
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
    <>
      <aside
        aria-label="文章目录"
        className={`hidden shrink-0 overflow-clip xl:block ${
          animate ? 'transition-[width,margin] duration-300 motion-reduce:transition-none' : ''
        } ${collapsed ? 'mr-0 w-0' : 'mr-12 w-52'}`}
      >
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] w-52 overflow-x-hidden overflow-y-auto pb-4">
          <TableOfContents toc={toc} numbering={numbering} onCollapse={() => persist(true)} />
        </div>
      </aside>

      <button
        type="button"
        onClick={() => persist(false)}
        aria-label="展开文章目录"
        title="展开目录"
        className={`fixed top-1/3 left-0 z-40 hidden -translate-y-1/2 items-center rounded-r-lg border border-l-0 border-gray-200 bg-white/95 py-3 pr-1.5 pl-1 text-gray-400 shadow-sm backdrop-blur xl:flex dark:border-gray-700/80 dark:bg-gray-900/95 dark:text-gray-500 ${
          animate ? 'transition-all duration-300 motion-reduce:transition-none' : ''
        } ${
          collapsed
            ? 'translate-x-0 opacity-100 hover:text-gray-900 dark:hover:text-gray-100'
            : 'pointer-events-none -translate-x-full opacity-0'
        }`}
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
    </>
  )
}
