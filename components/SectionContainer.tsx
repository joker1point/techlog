import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** 从 1152px 起放宽到 max-w-5xl（文章页左栏目录从 1152px 起显示，见 PostLayout）；默认仍从 1280px（xl）起 */
  wideFromToc?: boolean
}

export default function SectionContainer({ children, wideFromToc = false }: Props) {
  return (
    <section
      className={`mx-auto max-w-3xl px-4 sm:px-6 ${
        wideFromToc ? 'min-[1152px]:max-w-5xl min-[1152px]:px-0' : 'xl:max-w-5xl xl:px-0'
      }`}
    >
      {children}
    </section>
  )
}
