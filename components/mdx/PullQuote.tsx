import type { ReactNode } from 'react'

/**
 * 摘句：上下两条细线夹一段加重的引文 —— 与普通引用块（左侧竖线）区分开，
 * 用于把一句话单独拎出来强调。
 * 用法（MDX）：<PullQuote source="2026-09 复盘">原话…</PullQuote>
 */
export default function PullQuote({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <figure className="my-9 border-t border-b border-gray-200 py-6 dark:border-gray-700/80">
      <blockquote className="text-[1.1875rem] leading-9 font-medium text-balance text-gray-900 dark:text-gray-100">
        {children}
      </blockquote>
      {source && (
        <figcaption className="mt-3 font-mono text-[12.5px] text-gray-500 dark:text-gray-400">
          — {source}
        </figcaption>
      )}
    </figure>
  )
}
