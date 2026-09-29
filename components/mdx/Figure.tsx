import Image from '@/components/Image'

/**
 * 带图注的插图：Markdown 的 `![]()` 给不了图注，需要说明来源/读法的图用这个。
 * 用法（MDX）：<Figure src="/static/images/xxx.png" alt="…" caption="图 1 · 说明" />
 */
export default function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-lg border border-gray-200/80 dark:border-gray-700/70"
      />
      {caption && (
        <figcaption className="mt-3 font-mono text-[12.5px] leading-6 text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
