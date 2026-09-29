# 正文语义组件（2026-09-29）

给 `.mdx` 正文用的编辑级区块，已在 `components/MDXComponents.tsx` 注册，**直接写标签即可，不用 import**。

组件放在 `components/mdx/`，每个都是默认导出（MDX 里具名导出有已知问题，别改成命名导出）。

## Callout — 提示块

左侧一条竖线 + mono 小标签，与引用块、文章导语共用同一套视觉语言。

```mdx
<Callout type="key" title="选型结论">
  双 LLM 管线在这里是**工程取舍**，不是 Agent。
</Callout>
```

| 参数 | 取值 | 说明 |
|---|---|---|
| `type` | `key` / `warn` / `note` | 主色 / 琥珀 / 中性；默认 `note` |
| `title` | 字符串 | 覆盖默认标签（要点 / 注意 / 备注） |

后续内容需要空行分隔，markdown 语法（列表、加粗、代码）照常生效。

## Figure — 带图注插图

Markdown 的 `![]()` 给不了图注；需要说明读法或来源的图用这个。

```mdx
<Figure
  src="/static/images/rag-pipeline.png"
  alt="检索链路示意"
  caption="图 2 · 分块层改造后的检索链路"
/>
```

`width` / `height` 默认 1600×900（next/image 需要），换比例时显式传。

## Stat + StatGrid — 数据卡

数据点用大号 tabular-nums 数值 + 标签 + 注脚；网格靠 1px 间隙做细分隔线（不是通用卡片）。

```mdx
<StatGrid cols={3}>
  <Stat value="45%" label="短路省下的 token" note="三方对比实测" />
  <Stat value="16" label="mock 用例" />
  <Stat value="6" label="最大工具轮次" />
</StatGrid>
```

`cols` 取 `2` / `3` / `4`，默认 2（手机上始终单列）。

## PullQuote — 摘句

上下两条细线夹一段加重的引文，与普通引用块（左侧竖线）区分开，用来单独强调一句话。

```mdx
<PullQuote source="2026-09 复盘">
  能力不可得，好过运行时拦截。
</PullQuote>
```

## 两个必须知道的 MDX 约定

1. **正文里的裸尖括号会被当 JSX**：要写「HTML 里有 `<p>` 标签」这种句子，**把尖括号包进反引号**，否则整站构建失败（报错位置与真实原因无关，很难查）。
2. `.mdx` 文件必须 **LF 行尾**；Windows 直接写文件默认 CRLF，提交前按字节确认一遍。
