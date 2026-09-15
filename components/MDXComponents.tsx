import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import { Children, isValidElement, type ReactNode } from 'react'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Mermaid from './Mermaid'

type CodeLikeProps = { className?: string; children?: ReactNode }

/**
 * 代码块渲染：
 * - ```mermaid 代码块 → 客户端渲染成流程图（Mermaid 组件懒加载）
 * - 其余代码块维持原有 Pre 行为（复制按钮、高亮等）
 */
function MdxPre(props: { children?: ReactNode }) {
  const first = Children.toArray(props.children)[0]
  if (isValidElement(first)) {
    const codeProps = (first as unknown as { props?: CodeLikeProps }).props
    const className = codeProps?.className ?? ''
    if (className.includes('language-mermaid')) {
      return <Mermaid chart={String(codeProps?.children ?? '').replace(/\n$/, '')} />
    }
  }
  return <Pre {...(props as React.ComponentProps<typeof Pre>)} />
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: MdxPre,
  table: TableWrapper,
  BlogNewsletterForm,
}
