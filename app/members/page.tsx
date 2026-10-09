import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { sortPostsWithFeatured } from '@/lib/sort'

export const metadata = genPageMetadata({
  title: '会员专区',
  description: '可执行的工程规范与第一手参数：比公开文章更靠前的那一层。',
})

/**
 * 会员专区（2026-10-09 新建）
 * 内容边界：公开文章讲"思路与取舍"，这里放"可直接照做"的那一层 ——
 * 完整参数、验收清单、被否掉的版本及原因。
 * 实现：按 tag=members 实时筛选（与首页 VDB-News 专题同一套范式），
 * 给文章打上 members 标签即自动进区，不需要维护独立清单。
 */
export default function MembersPage() {
  const posts = allCoreContent(sortPostsWithFeatured(allBlogs)).filter((p) =>
    p.tags?.includes('members')
  )

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-3 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            会员专区
          </h1>
          <p className="max-w-[46rem] text-lg leading-7 text-gray-500 dark:text-gray-400">
            公开文章讲<strong className="font-semibold">思路与取舍</strong>
            ，这里放<strong className="font-semibold">可直接照做</strong>的那一层：
            完整参数、验收清单、被否掉的版本和原因。都是我自己项目里正在用的规格，
            换了场景也能照搬。
          </p>
        </div>

        <ul className="py-4">
          {posts.length === 0 && (
            <li className="py-6 text-gray-500 dark:text-gray-400">专区内容整理中。</li>
          )}
          {posts.map((post) => (
            <li key={post.path} className="flex flex-wrap items-baseline gap-x-3 py-3">
              <time
                dateTime={post.date}
                className="font-mono text-[12.5px] text-gray-400 tabular-nums dark:text-gray-500"
              >
                {formatDate(post.date, siteMetadata.locale)}
              </time>
              <Link
                href={`/${post.path}`}
                className="hover:text-primary-600 dark:hover:text-primary-400 text-[15px] text-gray-700 transition-colors dark:text-gray-300"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-6">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              看全部公开文章 &rarr;
            </Link>
            <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
            <Link
              href="/projects"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              正在跑的项目 &rarr;
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
