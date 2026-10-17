# TechLog — 一个工程师的技术博客

**线上地址：<https://joker1point.github.io/techlog>**

这里记录我做 AI 应用 / Agent 工程 / 开源项目时**真跑过、真踩过**的东西：架构判断、评测与口径、发布与运营。
不写"综述式科普"——每篇尽量带可复现的数字与命令。

> 不知道从哪读起？站内有《TechLog 内容地图》，按系列给了阅读顺序。

> **版本口径**：本仓库 fork 自 `timlrx/tailwind-nextjs-starter-blog`，`package.json` 里的版本号与 `v2.x` 标签**跟随上游模板**（表示模板版本，不是本站内容版本）。本站内容以 commit 记录为准，因此**只保留上游标签、不另建 Release**。

## 写作范围

| 主题 | 代表文章 |
|---|---|
| Agent 工程 | 《Workflow vs Agent：用 7 维度框架定位你的项目》《Agent 怎么防止 Prompt 注入：四层纵深防御体系》《AI 记忆的抗膨胀：从"淘汰谁"到"留下谁"》 |
| RAG 与检索评测 | 《RAG 链路全解析：从文档入库到混合记忆的实战架构》《把 143 块拆到 45 块：一次 RAG 分块重构，和它揭出来的评测陷阱》《修 5 坏 2，还是修 3 坏 0——一次 55 题的多路召回实验》 |
| 工程化与前端 | 《Next.js App Router 性能优化实战》《前端工程化：从 Webpack 到 Turbopack 的迁移指南》《构建现代设计系统：从 Design Tokens 到组件库》 |
| 开源协作 | 《给 119k star 项目提 PR：8 小时从评论到合并的完整复盘》《如何给一个陌生开源项目做架构分析，并找到能合进去的贡献点》 |
| 发布与运营 | 《把产品短片做成可执行规范：封面、节奏、音效、动图四件套》《从"记得跑"到"跑不掉"：博客文章检查的 CI 门禁》 |
| 随笔与职业 | 《在 AI 时代，聚焦一线从业》《从程序员到初级架构师的思考路径》 |

（完整 37 篇见站点「博客」页；标签可按主题过滤。）

## 技术栈

| 组件 | 技术 |
|---|---|
| 框架 | Next.js 15（App Router）+ React 19 |
| 样式 | Tailwind CSS 4 |
| 内容 | MDX（`data/blog/*.mdx`）+ pliny |
| 构建 / 包管理 | Yarn 3.6（release 存档在仓库 `.yarn/releases`，无需全局 yarn） |
| 部署 | **静态导出**（`EXPORT=1`）→ GitHub Pages（`BASE_PATH=/techlog`） |

## 本地开发

```sh
yarn install
yarn dev      # http://localhost:3000
```

静态导出（与线上同形态）：

```sh
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/techlog yarn build   # 产物在 out/，可直接 npx serve out 预览
```

> 本机注意（Windows）：跑 `yarn dev` 前先清 `NODE_OPTIONS`，并用独立窗口启动——
> 某些助手注入的 node shim 带批量删除保护，会把 Next 清理 `.next` 的动作拦到卡死。

## 写一篇文章

1. 新建 `data/blog/<slug>.mdx`，frontmatter：`title` / `date` / `tags` / `draft` / `summary`；
2. **正文必须 LF 行尾**；裸尖括号（如 `<tag>`）要用反引号包住，否则会被当 JSX 打断整站构建；
3. 可用站内语义组件：`Callout / Figure / Stat / StatGrid / PullQuote / LabEmbed`（写法见 [`faq/semantic-components.md`](faq/semantic-components.md)）；
4. 交互页放 `public/static/lab/`，用 `LabEmbed` 内嵌（原生 iframe 不会自动加 basePath）；
5. 写作规范（机械五项 + 新增文的图与文密度要求）见 [`faq/writing-standards.md`](faq/writing-standards.md)。

其余模板级问题（自定义 MDX 组件 / kbar 搜索 / Docker 部署）见 `faq/` 目录。

## CI 闸门（push 自动跑）

`.github/workflows/pages.yml` 在每次 push / 手动触发时依次跑：

| 步骤 | 作用 | 可跳过吗 |
|---|---|---|
| 文章检查（`scripts/ci_check.py`） | 变更 mdx 的机械五项 + **新增文**的图与文密度；机械项对所有变更强制，密度对新增强制、对修改只出警告 | 手动触发可显式勾 `skip_checks` |
| 对外材料红线（`tools/check_public_materials.py`） | 代理软件品牌词（词表在脚本内）+ 高置信凭据泄漏；只扫 git 跟踪文件，自动跳过 vendor 与压缩产物 | **不可跳过**；确属误报就在该行加 `public-materials: ignore` 并写清理由 |
| 构建 + 部署 | `EXPORT=1 BASE_PATH=/techlog` 静态导出 → GitHub Pages | — |

## 反馈

读文章有疑问、发现错漏，欢迎直接开 [Issue](https://github.com/joker1point/techlog/issues)——比评论区更耐久、可检索。

## 许可与致谢

- **内容**：© joker1point，转载请注明出处并附原文链接。
- **代码 / 主题**：基于 [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)（MIT License，© Timothy Lin）改造，`LICENSE` 保留原始版权声明。
