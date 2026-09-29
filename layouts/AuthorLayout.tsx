import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

/**
 * 关于页（2026-09-29 改版）：并入站内编辑级语言 ——
 * 刊头（mono eyebrow + 中文标题）与首页/列表/文章页同一套；
 * 左栏作者卡 + 右栏正文，正文沿用 .prose 的全局排版精修。
 */
export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <header className="border-b border-gray-200 pb-7 dark:border-gray-700/80">
        <div className="font-mono text-[12.5px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
          TechLog · 作者
        </div>
        <h1 className="mt-3 text-[1.75rem] leading-[1.25] font-extrabold tracking-tight text-balance text-gray-900 sm:text-[2.125rem] dark:text-gray-50">
          关于
        </h1>
      </header>

      <div className="mt-8 grid gap-10 sm:grid-cols-[minmax(0,190px)_minmax(0,1fr)] sm:gap-12">
        <div className="flex flex-col items-center sm:items-start">
          {avatar && (
            <Image
              src={avatar}
              alt={`${name} 的头像`}
              width={192}
              height={192}
              priority
              className="h-36 w-36 rounded-full border border-gray-200/80 dark:border-gray-700/70"
            />
          )}
          <h2 className="mt-4 text-xl leading-7 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {name}
          </h2>
          {occupation && (
            <div className="mt-1 text-[14px] text-gray-500 dark:text-gray-400">{occupation}</div>
          )}
          {company && <div className="text-[14px] text-gray-500 dark:text-gray-400">{company}</div>}
          <div className="mt-4 flex space-x-3">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </div>
          <div className="mt-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
              WeChat
            </p>
            <Image
              src="/static/images/wechat-qr.jpg"
              alt="微信二维码"
              width={160}
              height={160}
              className="mt-2 rounded-lg border border-gray-200/80 dark:border-gray-700/70"
            />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none pb-8">{children}</div>
      </div>
    </>
  )
}
