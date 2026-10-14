import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '关于', description: 'TechLog 作者与本站定位' })

const ANDROID_APK_URL = 'https://joker1point.github.io/techlog/downloads/TechLog-1.0.apk'

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/40">
          <h2 className="text-lg leading-7 font-bold text-gray-900 dark:text-gray-100">
            Android 客户端
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
            TechLog 薄壳应用：打开即直达本站，支持网页历史返回与断网重试。
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            v1.0 · 14 KB · Android 7.0（API 24）及以上
          </p>
          <a
            href={ANDROID_APK_URL}
            className="mt-4 inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600 dark:hover:bg-primary-400"
          >
            下载 APK
          </a>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            安装时手机会提示「未知来源」，允许本次安装即可。
          </p>
        </section>
      </AuthorLayout>
    </>
  )
}
