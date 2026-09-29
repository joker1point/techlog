'use client'

import { useEffect, useState } from 'react'

/**
 * 文章页顶部阅读进度条（仅文章页挂载）。
 * 用 transform: scaleX 走 GPU 合成，滚动时不做 layout。
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? Math.min(1, Math.max(0, el.scrollTop / total)) : 0)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
      <div
        className="from-primary-500 h-full origin-left bg-linear-to-r via-indigo-400 to-cyan-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
