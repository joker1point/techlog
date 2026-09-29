import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import { Children, isValidElement, type ReactNode } from 'react'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Mermaid from './Mermaid'
// 语义组件（2026-09-29）：正文里可用的编辑级区块，用法见 faq/semantic-components.md
import Callout from './mdx/Callout'
import Figure from './mdx/Figure'
import PullQuote from './mdx/PullQuote'
import Stat from './mdx/Stat'
import StatGrid from './mdx/StatGrid'

type CodeLikeProps = { className?: string; children?: ReactNode }

/**
 * 递归提取纯文本。
 * 语法高亮插件（rehype-prism-plus）会把代码切分成多个 <span class="token">，
 * 直接 String(children) 只能拿到 [object Object]，必须递归取到叶子文本。
 */
function nodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement(node)) {
    return nodeText((node as unknown as { props?: { children?: ReactNode } }).props?.children)
  }
  return ''
}

/**
 * 代码块渲染：
 * - ```mermaid 代码块 → 客户端渲染成流程图（Mermaid 组件懒加载）
 * - 其余代码块维持原有 Pre 行为（复制按钮、高亮等），带语言标签的
 *   包一层外壳，把语言显示在代码块顶部条上（编辑级细节）
 */
function MdxPre(props: { children?: ReactNode }) {
  const first = Children.toArray(props.children)[0]
  if (isValidElement(first)) {
    const codeProps = (first as unknown as { props?: CodeLikeProps }).props
    const className = codeProps?.className ?? ''
    if (className.includes('language-mermaid')) {
      return <Mermaid chart={nodeText(codeProps?.children).replace(/\s+$/, '')} />
    }
    const lang = className.match(/language-([\w-]+)/)?.[1]
    if (lang) {
      return (
        <div className="code-block">
          <div className="code-block-lang">{lang}</div>
          <Pre {...(props as React.ComponentProps<typeof Pre>)} />
        </div>
      )
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
  // 语义组件：给正文提供编辑级结构（提示块 / 带图注插图 / 数据卡 / 摘句）
  Callout,
  Figure,
  Stat,
  StatGrid,
  PullQuote,
}
