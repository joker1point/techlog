import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '项目' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            项目
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            这些都是在真实环境里跑过、并被我自己长期使用的项目：开源工具可以直接看源码，
            私有系统在博客里留有对应的决策记录与踩坑复盘。
          </p>
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            <Link
              href="https://joker1point.github.io/"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              完整作品集（含每个项目的技术细讲） &rarr;
            </Link>
            <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
            <Link
              href="https://github.com/joker1point"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              GitHub &rarr;
            </Link>
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card key={d.title} {...d} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
