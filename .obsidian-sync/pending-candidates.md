# 待发布候选清单

> 扫描时间：2026-09-28 09:0x（每周一自动扫描）｜ Vault：`C:/Users/biren/Documents/Obsidian Vault`
> 状态：⏸ **等待 designer 确认，未发布**（未生成 mdx / 未构建 / 未部署 / 未 git push）
> 去重依据：`published-notes.json` 的 published(13) + skipped(19)，**按文件名去重**（vault 目录又重整了，见文末「⚠️ 新发现」）
> 正文处理原则：严格保持 designer 原文原意，AI 只补 frontmatter（title/date/tags/summary）与排版结构。

**扫描统计**：vault 共 320 篇 md → 关键词/路径命中 Agent 相关 26 篇 → 排除已发布 13 + 已跳过 19 → 逐篇阅读评估 → **本次候选 7 篇 + 待定 1 篇**，跳过 14 篇。

> 上一轮（2026-09-14）的 7 篇候选已于 2026-09-15 全部发布并登记，本轮不重复推荐。

---

## 一、推荐发布候选（7 篇）

### 1. ⭐⭐⭐ flowwatch · 只读 Agent 的工程化
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/flowwatch/flowwatch · 项目文档.md`
- **拟定 title**：`只读 Agent 怎么落地：证据纪律四层、隐私物理分档与只读承诺的三层验证`
- **拟定 slug**：`readonly-agent-engineering-flowwatch`
- **拟定 tags**：`['agent', 'engineering', 'security', 'evaluation', 'architecture']`
- **拟定 summary**：给本机流量观测工具装一个只读 Agent 后踩到的真实问题：模型零工具调用却编出「我查过了」的结论、隐私只能靠提示词承诺。四层证据防线、聚合档/明细档的物理隔离，以及用 AST 调用图 + 运行时 audit hook + 变异测试证明「只读」不是口号。
- **推荐理由**：vault 里 Agent 工程含量最高的一篇——不是概念复述，是「09-20 真实事故 → 四层防线 → 可被第三方核对的验证」的完整闭环；「能力不可得 > 运行时拦截」和「ETW 净收益 0.0 KiB 仍照写」两条工程诚实度判断，正是博客主线缺的那一类一手材料。

### 2. ⭐⭐⭐ 先审计测量，再优化模型（RAGAS 生成层评估复盘）
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/VDB-News/VDB-News · 生成层评估与测量修正.md`
- **拟定 title**：`我的评测口径骗了我自己：RAGAS 生成层评估的一次测量修正`
- **拟定 slug**：`ragas-evaluation-measurement-audit`
- **拟定 tags**：`['rag', 'evaluation', 'ragas', 'engineering', 'llm']`
- **拟定 summary**：341 条陈述里 24.3% 被判「无依据」，逐条看完发现大部分是我自己的口径问题——裁判看到的是剥掉 `[资料N]` 头的裸文本，而模型看到的是带来源/标题/日期的上下文。修正后 Faithfulness 从 0.716 涨到 0.907，「未达标」这个前提本身就是测量假象。
- **推荐理由**：「先审计测量，再优化模型」是可迁移的方法论，踩坑极具体（ragas 0.4.3 三个坑、单题判分噪声 ±0.2~0.9、自实现指标系统性偏乐观已被证伪）；还给出了「rerank 实测 +0.047 但延迟 +44%，所以默认关闭」这类有数字支撑的取舍判断。

### 3. ⭐⭐ agent-skill-framework · 把「技能有没有用」变成可测量
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/agent-skill-framework/agent-skill-framework · 项目文档.md`
- **拟定 title**：`Skill 越加越多，怎么证明它真的有用：with/without 对照评估`
- **拟定 slug**：`agent-skill-framework-with-without-benchmark`
- **拟定 tags**：`['agent', 'skill', 'evaluation', 'context', 'engineering']`
- **拟定 summary**：Agent 的 Skill 加了不知道有没有用、删了不知道会不会变差——用真实 LLM 跑 with_skill vs without_skill 对照，把「看起来能用」变成「验证过能用」，并用假阳性/假阴性统计自动改写技能描述。
- **推荐理由**：与已发布的《我是如何保证我的 agentskill 多而不乱的？》是同一问题的两层（整体可治理 vs 个体可验证），能形成系列；「单看加了技能后通过率 80% 没有意义，必须回答不加是多少」是全文最锋利的一句。

### 4. ⭐⭐ LLM 输出的两个工程化 Guard：输出契约与编造校验
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/viral-content-analysis/viral-content-analysis · 项目文档.md`
- **拟定 title**：`LLM 输出出问题时先找根因：输出契约缺失与时间表述归一化校验`
- **拟定 slug**：`llm-output-contract-and-factuality-guard`
- **拟定 tags**：`['llm', 'prompt', 'engineering', 'testing', 'ai']`
- **拟定 summary**：90 条内容分析跑完，9 个字段只有 1 个有值——根因不是 prompt 措辞，是提示词压根没描述输出契约；修完 Top1 从 57 涨到 71.3。另一条是防编造：「老洋楼」被写成「百年老洋楼」，用时间表述归一化比对原文拦截，10 用例零误报零漏报。
- **推荐理由**：两个都是「给模型输出加断言、而不是信模型」的可复用手法，都有修复前后的量化对比；附带的「并发槽占满与配额耗尽都返回 429 但处理相反」是与已发布计费安全篇互补的新例子。

### 5. ⭐⭐ Agent 的记忆与个性化：为什么兴趣分只重排不改写 query
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/VDB-News/VDB-News · 记忆与个性化.md`
- **拟定 title**：`Agent 记忆三层与兴趣画像：显式可淘汰，隐式只加分`
- **拟定 slug**：`agent-memory-and-personalization-design`
- **拟定 tags**：`['agent', 'memory', 'rag', 'architecture', 'engineering']`
- **拟定 summary**：L1 对话记忆 / L3 向量记忆 / L4 兴趣画像的真实实现与参数，以及一条关键约束：兴趣分只参与重排（约 0.8 权重、可被语义翻盘），不改写检索 query——避免「越用越窄」的回声室。文末附诚实清单（L2 只有文案没有代码）。
- **推荐理由**：记忆是博客主线里还没覆盖的一块；「显式可淘汰、隐式只加分」的权重设计原则可迁移，而主动承认「landing 上写的四层记忆有一层没实现」这种口径诚实，是这篇最值得发的部分。

### 6. ⭐ TechLog 自建博客的四个坑
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/TechLog/TechLog · 项目文档.md`
- **拟定 title**：`自建 Next.js 静态博客踩的四个坑：clean URL、Mermaid、Pages CI 与构建环境`
- **拟定 slug**：`nextjs-static-blog-four-pitfalls`
- **拟定 tags**：`['nextjs', 'engineering', 'deploy', 'blog']`
- **拟定 summary**：静态托管不做 `/about → about.html` 补全导致路由 404、Mermaid 渲染成一堆代码文本（含 rehype-prism-plus 把源码拆成 span 的坑）、GitHub Pages CI 一直失败的根因是仓库压根没启用 Pages、以及 IDE 注入的 NODE_OPTIONS 让本地构建失败。
- **推荐理由**：四个坑都是「现象 → 根因 → 解法」，属于可直接复用的一手经验；元内容（讲这个博客本身怎么建的）与站点调性相符。

### 7. ⭐ portwatch · 一个 4476ms → 73ms 的性能陷阱（非 Agent 主线，备选）
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/portwatch/portwatch · 项目文档.md`
- **拟定 title**：`Windows 上 psutil.ppid() 的性能陷阱：4476ms 到 73ms`
- **拟定 slug**：`psutil-ppid-windows-performance-pitfall`
- **拟定 tags**：`['python', 'performance', 'windows', 'engineering']`
- **拟定 summary**：采集器对上百个 PID 取父进程，Windows 上 `psutil.Process.ppid()` 每次调用都重建全量进程快照（约 45ms/次），110 次把整轮采集拖到 4476ms。改用 `psutil._pswindows.ppid_map()` 一次拿全表 + 保留兜底分支后降到 73ms。
- **推荐理由**：不在 Agent 主线上，但「现象 → 量化 → 根因（代价与系统进程数成正比而非查询数）→ 解法 + 兜底」是标准的五段式性能优化复盘，且是 Windows 专属坑、网上少见。放备选，看你要不要扩主线。

---

## 二、待你定夺（1 篇：与已发布内容高度重叠）

### A. MoneyPrinterTurbo 双 PR 叙事定稿 v3
- **笔记路径**：`🌐 互联网产品与商业/0简历沉淀/为 MoneyPrinterTurbo 实现 OpenAI 兼容文生图素材源（含两次 PR 合并）.md`
- **冲突**：已发布 `mpt-pr-1291-contribution-review.mdx`（《给 119k star 项目提 PR：8 小时从评论到合并的完整复盘》）覆盖了同一段经历。
- **新内容只有两处**：① **PR #1296**（200 响应 body 非图片导致任务中断）的闭环，以及维护者在你的修复上继续深化（区分远端解码失败 vs 本地写入失败）；② 由此提炼的**失败语义建模二维分类**（确认状态 → 能否重试；错误归属方 → 降级还是止损）。
- **建议**：**不要整篇重发**。要发就只写第 ② 点的独立短文（slug 建议 `paid-api-failure-semantics-two-dimensions`），把已发布那篇当背景链接。你说了算。

---

## 三、本轮判定跳过（14 篇，附理由）

| 笔记 | 判定理由 |
|---|---|
| `0简历沉淀/0agentcoding经验/1codex上下文压缩.md` | 视频字幕整理稿（开头即「已读取完整字幕 21:42 全长」），AI 生成的结构化学习笔记，无一手实践 |
| `🤖 AI与机器学习/AI基础知识/问题与解答.md` | AI 对话产物（结尾「要不要我继续帮你解释 Day1 第 5 题」），纯概念问答 |
| `0简历沉淀/2RAG/8. 什么是向量数据库？…md` | 小林coding 面试题栏目摘抄（含 cdn.xiaolincoding.com 图 + 公众号推广） |
| `0简历沉淀/2RAG/18_怎么量化你的RAG效果.md` | 同上，小林coding 摘抄；与候选 2 的一手实测重复但更浅 |
| `0简历沉淀/0agentcoding经验/作品集上的描述会诱导面试官问哪些问题？…md` | 面试备考清单（勾选框 + 口径提醒），定位私人；**但附录 C/D/E/F/H/I/J 含 VDB-News 一手实测数据**，建议后续拆条使用而非整篇发 |
| `0简历沉淀/9-17与dify后端适配度.md` | AI 对话产物 + 求职/JD 匹配分析，含私人求职策略 |
| `已确立方向pr/pr前情提要.md` | 提示词模板（含 `{REPO_URL}` 占位符），非成文内容 |
| `0简历沉淀/为什么不继续提第三个pr.md` | AI 对话产物（结尾「你倾向哪个」），仅末尾一句你的结论 |
| `0简历沉淀/插件系统 基于 registry.py…md` | AI 对话产物，讲 Python 装饰器注册机制，与项目主线无关 |
| `0简历沉淀/agent.md` | 约 170 字碎片，Function Calling 概念片段 |
| `0简历沉淀/flowwatch/flowwatch · 面试模拟题.md` | Q&A 题库（面试素材），非文章体裁；内容已并入候选 1 |
| `0简历沉淀/agent-skill-framework/agent-skill-framework · 面试模拟题.md` | 同上，已并入候选 3 |
| 各项目其余「· 面试模拟题」（VDB-News / portwatch / CharacterSeed / TechLog / MoneyPrinterTurbo-PR / viral-content-analysis） | 同上，统一作为发布素材而非候选 |
| `0简历沉淀/MoneyPrinterTurbo-PR/`、`0简历沉淀/119kAI生成短视频/` 下两份 MPT 文档 | 与已发布 `mpt-pr-1291-contribution-review` / `mpt-open-source-contribution-analysis` 重复 |

---

## ⚠️ 新发现（需要你留意）

1. **Vault 目录又重整了**：`简历沉淀/` → `0简历沉淀/`。`published-notes.json` 里 6 条 `note` 路径**再次失效**（2026-09-15 才修过一次）。本轮已改为按文件名去重，但下轮还会踩。**要不要把索引主键改成文件名？**
2. **发布索引可能不全**：`data/blog/` 有 26 篇 mdx，索引只登记 13 篇。其中 `memory-guard-last-line-of-defense`、`agent-window-period`、`focus-on-firstline-practice`、`ide-agent-vs-ai-assistant` 看着像 Obsidian 来源却没登记——若确实来自 vault，需补登记，否则会被重复推荐。
3. **安全隐患仍在**：`🔐 工具与方法/open agent/ai.md` 含明文 OpenAI API Key（sk-proj-…），永久禁发，已在 skipped 中。建议尽快轮换。

---

## 下一步（等你发话）

你说「发」之后我再执行：
生成 mdx（正文保持你原文原意，只补 frontmatter 与排版）→ PowerShell 前台构建（`EXPORT=true`、`CODEBUDDY_SAFE_DELETE_ENABLED=0`）→ sites_deploy 部署 → git push 备份 → 在 `published-notes.json` 登记防重复。

请告诉我：上面 7 篇候选里**要发哪几篇**（说编号即可），以及待定那篇要不要按建议改成短文。
