'use client'

import { useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const mountedRef = useRef(false)

  // @ts-expect-error - giscusConfig is valid when provider is 'giscus'
  const giscusConfig = siteMetadata.comments.giscusConfig

  return (
    <div id="comments-container">
      <GiscusWidget config={giscusConfig} slug={slug} />
    </div>
  )
}

function GiscusWidget({ config, slug }: { config: Record<string, string>; slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', config.repo)
    script.setAttribute('data-repo-id', config.repositoryId)
    script.setAttribute('data-category', config.category)
    script.setAttribute('data-category-id', config.categoryId)
    script.setAttribute('data-mapping', config.mapping || 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', config.reactions || '1')
    script.setAttribute('data-emit-metadata', config.metadata || '0')
    script.setAttribute('data-input-position', config.inputPosition || 'top')
    script.setAttribute('data-theme', config.theme || 'preferred_color_scheme')
    script.setAttribute('data-lang', config.lang || 'zh-CN')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const container = containerRef.current
    if (container) {
      container.appendChild(script)
    }
  }, [config, slug])

  return <div ref={containerRef} className="giscus" />
}
