import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * 全站宽度容器。
 * 2026-10-05：放宽断点从 xl(1280) 提前到 1152px——文章页左栏目录在此断点显示，
 * 而页面内容嵌套在本容器内（子级断点放宽会被本容器的 768px 包含块卡死，导致正文列被压窄），
 * 因此容器必须与目录断点同步提前。
 */
export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 min-[1152px]:max-w-5xl min-[1152px]:px-0 sm:px-6">
      {children}
    </section>
  )
}
