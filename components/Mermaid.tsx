'use client'

import { useEffect, useRef, useState } from 'react'

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, text: string) => Promise<{ svg: string }>
}

let mermaidPromise: Promise<MermaidApi> | null = null

/** 懒加载 mermaid：只有文章里真正出现流程图时才会请求这个包 */
function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => {
      const mermaid = mod.default as unknown as MermaidApi
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        // neutral 配色在浅色与深色主题下都可读
        theme: 'neutral',
        flowchart: { useMaxWidth: true, htmlLabels: true },
      })
      return mermaid
    })
  }
  return mermaidPromise
}

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadMermaid()
      .then(async (mermaid) => {
        if (!containerRef.current || cancelled) return
        const id = 'mermaid-' + Math.random().toString(36).slice(2, 10)
        const { svg } = await mermaid.render(id, chart)
        if (containerRef.current && !cancelled) {
          containerRef.current.innerHTML = svg
        }
      })
      .catch(() => {
        // 渲染失败时降级为源码展示，保证内容不丢
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [chart])

  if (failed) {
    return (
      <pre className="my-6 overflow-x-auto rounded border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <code>{chart}</code>
      </pre>
    )
  }

  return <div ref={containerRef} className="my-6 flex justify-center overflow-x-auto" />
}
