/**
 * 章节自动编号的判定（2026-09-29）。
 *
 * 背景：库里约一半文章在标题里手工写了「一、二、三」，另一半没有。
 * 若无脑给所有文章加编号，手工编号的那批会变成「一、1. 标题」。
 * 所以按文章整体判定：**只要发现人工编号就关掉自动编号**。
 *
 * 只在 h2 这一层判定（h3 通常跟着 h2 的体系走）；判定放在构建期（contentlayer
 * computed field），运行期只管渲染，避免把规则散落在组件里。
 */

/** 「一、」「二.」这类中文序号 */
const MANUAL_CN = /^[一二三四五六七八九十百]+[、.．]/
/** 「1.」「1.1」「2026 」这类阿拉伯序号（含「数字 + 空格」的保守匹配） */
const MANUAL_AR = /^(?:\d+(?:\.\d+)*[、.．]|\d+\s)/

/** 取正文里所有 h2 标题文本 */
export function extractH2Headings(raw: string): string[] {
  return [...raw.matchAll(/^##[ \t]+(.+)$/gm)].map((m) => m[1].trim())
}

export function hasManualNumbering(raw: string): boolean {
  return extractH2Headings(raw).some((t) => MANUAL_CN.test(t) || MANUAL_AR.test(t))
}

/**
 * 是否启用自动编号：章节数 ≥3（与目录显示阈值一致）且没有人工编号。
 * frontmatter 里的 `numbering: true/false` 可强制打开/关闭（见 contentlayer.config.ts）。
 */
export function shouldAutoNumber(raw: string): boolean {
  const h2 = extractH2Headings(raw)
  if (h2.length < 3) return false
  return !hasManualNumbering(raw)
}

/**
 * 给目录算出一套与正文 CSS 计数器一致的编号：
 * h2 → `1.`；h3 → `1.1`（跟着它所属的 h2）。
 */
export function numberToc<T extends { depth: number; url: string }>(toc: T[]): Map<string, string> {
  const map = new Map<string, string>()
  let h2 = 0
  let h3 = 0
  for (const item of toc) {
    if (item.depth === 2) {
      h2 += 1
      h3 = 0
      map.set(item.url, `${h2}.`)
    } else if (item.depth === 3 && h2 > 0) {
      h3 += 1
      map.set(item.url, `${h2}.${h3}`)
    }
  }
  return map
}
