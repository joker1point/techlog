import type { ReactNode } from 'react'

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
}

/**
 * 数据卡网格：用 1px 间隙 + 灰色底做出细分隔线（编辑级表格感，不是通用卡片）。
 * 用法（MDX）：<StatGrid cols={3}><Stat … /><Stat … /><Stat … /></StatGrid>
 */
export default function StatGrid({
  children,
  cols = 2,
}: {
  children: ReactNode
  cols?: 2 | 3 | 4
}) {
  return (
    <div
      className={`my-8 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-700/70 dark:bg-gray-700/60 ${
        COLS[cols] ?? COLS[2]
      }`}
    >
      {children}
    </div>
  )
}
