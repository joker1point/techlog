import Link from './Link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  /** 可选篇数（标签总览页用） */
  count?: number
}

/**
 * 标签 chip（2026-09-29 改版）：与文章页脚的标签同一套样式（mono 小字 + 细描边）。
 * 传 count 时在 chip 内追加篇数（标签总览页用），避免外挂一个计数链接导致对齐问题。
 */
const Tag = ({ text, count }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-600 dark:hover:text-primary-400 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-[12.5px] text-gray-600 transition-colors dark:border-gray-700/80 dark:bg-gray-800/60 dark:text-gray-400"
      aria-label={count === undefined ? `查看 ${text} 标签` : `查看 ${text} 标签：${count} 篇`}
    >
      {text.split(' ').join('-')}
      {count !== undefined && (
        <span className="ml-1.5 text-gray-400 tabular-nums dark:text-gray-500">{count}</span>
      )}
    </Link>
  )
}

export default Tag
