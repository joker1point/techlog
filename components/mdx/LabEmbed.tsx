/**
 * 交互式实验室内嵌：iframe + 顶部说明栏（标题 / 新标签打开）。
 * 用法（MDX）：<LabEmbed src="/static/lab/vdb-news-retrieval-lab-plain.html" title="检索实验·通俗版" height={860} />
 *
 * 注意：src 传「不带 basePath」的站内路径（如 /static/lab/xxx.html），
 * 组件拼上 NEXT_PUBLIC_BASE_PATH（由 next.config.js 从 BASE_PATH 暴露，
 * GitHub Pages 项目页前缀）——原生 iframe 不会像 next/link、next/image 那样自动加前缀。
 */
export default function LabEmbed({
  src,
  title,
  height = 840,
  hint,
}: {
  src: string
  title: string
  height?: number
  hint?: string
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const url = `${basePath}${src}`

  return (
    <div className="my-8">
      <div className="flex items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800/60">
        <span className="font-mono text-[11px] tracking-[0.14em] text-gray-500 uppercase dark:text-gray-400">
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 shrink-0 text-[12px] font-medium hover:underline"
        >
          新标签打开 ↗
        </a>
      </div>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        className="block w-full rounded-b-xl border border-gray-200 dark:border-gray-700"
        style={{ height }}
      />
      {hint ? (
        <div className="mt-2 text-[12.5px] text-gray-400 dark:text-gray-500">{hint}</div>
      ) : null}
    </div>
  )
}
