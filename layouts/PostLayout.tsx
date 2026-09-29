import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  wordCount?: number
  readingTime?: number
}

function PostLinkCard({
  post,
  direction,
}: {
  post: { path: string; title: string }
  direction: 'prev' | 'next'
}) {
  const isPrev = direction === 'prev'
  return (
    <Link
      href={`/${post.path}`}
      className={`group hover:border-primary-400 dark:hover:border-primary-500 rounded-lg border border-gray-200 p-4 transition-colors dark:border-gray-700/80 ${
        isPrev ? 'sm:text-left' : 'sm:text-right'
      }`}
    >
      <div className="font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
        {isPrev ? '← 上一篇' : '下一篇 →'}
      </div>
      <div className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-2 line-clamp-2 font-semibold text-gray-900 transition-colors dark:text-gray-100">
        {post.title}
      </div>
    </Link>
  )
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  wordCount,
  readingTime,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, summary, featured, autoNumbering } = content
  const toc = (
    (content as { toc?: { value: string; url: string; depth: number }[] }).toc || []
  ).filter((t) => t.depth === 2 || t.depth === 3)
  const showToc = toc.length >= 3
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment />
      <article className="pt-10 xl:pt-12">
        <header className="mx-auto max-w-[42rem]">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12.5px] text-gray-500 dark:text-gray-400">
            <time dateTime={date} className="tracking-wide">
              {new Date(date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {wordCount ? (
              <>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className="tabular-nums">{wordCount.toLocaleString()} 字</span>
              </>
            ) : null}
            {readingTime ? (
              <>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className="tabular-nums">阅读约 {readingTime} 分钟</span>
              </>
            ) : null}
            {featured && (
              <span className="bg-primary-500 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold text-white">
                置顶
              </span>
            )}
          </div>

          <h1 className="mt-4 text-[1.75rem] leading-[1.3] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.25rem] sm:leading-[1.22] dark:text-gray-50">
            {title}
          </h1>

          {summary && (
            <p className="border-primary-500/70 mt-5 border-l-[3px] pl-5 text-[1.0625rem] leading-8 text-gray-600 dark:text-gray-400">
              {summary}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-6 text-sm dark:border-gray-700/80">
            {authorDetails.map((author) => (
              <div key={author.name} className="flex items-center gap-x-2.5">
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    width={32}
                    height={32}
                    alt={author.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="font-medium text-gray-900 dark:text-gray-100">{author.name}</span>
                {author.occupation && (
                  <span className="hidden text-gray-500 sm:inline dark:text-gray-400">
                    {author.occupation}
                  </span>
                )}
              </div>
            ))}
            {authorDetails.find((a) => a.github)?.github && (
              <Link
                href={authorDetails.find((a) => a.github)!.github as string}
                className="ml-auto inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                <span className="font-mono text-[12.5px]">joker1point</span>
              </Link>
            )}
          </div>
        </header>

        <div className="mt-10 xl:flex xl:justify-center xl:gap-12">
          <div
            className={`prose dark:prose-invert mx-auto w-full max-w-[42rem] min-w-0 ${
              autoNumbering ? 'auto-numbered' : ''
            }`}
          >
            {children}
          </div>
          {showToc && (
            <aside className="hidden xl:block xl:w-52 xl:shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4">
                <TableOfContents toc={toc} numbering={Boolean(autoNumbering)} />
              </div>
            </aside>
          )}
        </div>

        <footer className="mx-auto mt-16 max-w-[42rem]">
          {tags && (
            <div className="border-t border-gray-200 pt-8 dark:border-gray-700/80">
              <div className="font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
                Tags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          )}

          {(prev || next) && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <PostLinkCard post={prev} direction="prev" />
              ) : (
                <div className="hidden sm:block" />
              )}
              {next ? <PostLinkCard post={next} direction="next" /> : null}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-700/80 dark:text-gray-400">
            <Link
              href={editUrl(filePath)}
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              在 GitHub 上编辑
            </Link>
            <Link
              href={`/${basePath}`}
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
              aria-label="返回博客列表"
            >
              &larr; 返回博客列表
            </Link>
          </div>

          {siteMetadata.comments && (
            <div className="pt-10" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </footer>
      </article>
    </SectionContainer>
  )
}
