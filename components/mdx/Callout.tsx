import type { ReactNode } from 'react'

type Tone = 'key' | 'warn' | 'note'

const TONES: Record<Tone, { label: string; rule: string; tag: string; surface: string }> = {
  key: {
    label: '要点',
    rule: 'border-primary-500',
    tag: 'text-primary-600 dark:text-primary-400',
    surface: 'bg-primary-50/50 dark:bg-primary-500/5',
  },
  warn: {
    label: '注意',
    rule: 'border-amber-500',
    tag: 'text-amber-700 dark:text-amber-400',
    surface: 'bg-amber-50/60 dark:bg-amber-500/5',
  },
  note: {
    label: '备注',
    rule: 'border-gray-300 dark:border-gray-600',
    tag: 'text-gray-500 dark:text-gray-400',
    surface: '',
  },
}

/**
 * 正文提示块：左侧一条竖线 + mono 小标签，与文章的引用块/导语共用同一套视觉语言。
 * 用法（MDX）：<Callout type="key" title="选型结论">正文…</Callout>
 */
export default function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: Tone
  title?: string
  children: ReactNode
}) {
  const tone = TONES[type] ?? TONES.note

  return (
    <div className={`my-7 border-l-[3px] py-1 pl-5 ${tone.rule} ${tone.surface}`}>
      <div className={`font-mono text-[11px] tracking-[0.18em] uppercase ${tone.tag}`} role="note">
        {title || tone.label}
      </div>
      <div className="mt-2 text-[15.5px] leading-7 text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  )
}
