# 待发布候选清单

> 生成时间：2026-09-09 ｜ 来源：Obsidian vault 扫描 ｜ 状态：**等 designer 确认后再发布**
> 确认后回复「发」或指定其中几篇（如「发 1、3、5」）。

扫描统计：Agent 相关笔记 15 篇 → 已发布 6 篇 → 本次候选 6 篇（其中 1 篇待定）→ 因内容过短跳过 2 篇。

---

## ✅ 推荐发布

### 1. 为什么大批企业升级 Agent 不会产生增值
- **笔记**：`🌐 互联网产品与商业/市场/为什么大批企业升级Agent不会产生增值.md`（约 1990 字）
- **slug**：`why-agent-upgrades-no-value`
- **tags**：ai, agent, opinion, market, engineering
- **summary**：Agent 有明确适用边界，把确定流程强行 Agent 化属于技术错配。大量企业会出现「Agent Washing」泡沫，中小企业伪 Agent 岗位将消亡，中大型企业留存但岗位形态改变。
- **推荐理由**：观点非常犀利（Agent Washing、技术错配、岗位两极分化、上AI-裁员-质量下滑-重新招人的循环），有清晰分析框架，是难得的一手行业判断，不是资料堆砌。

### 2. 2026 AI 内容赛道商业化验证梯队
- **笔记**：`🌐 互联网产品与商业/市场/文泓发对agent市场调研.md`（约 3860 字）
- **slug**：`ai-content-monetization-tiers-2026`
- **tags**：ai, agent, market, monetization, research
- **summary**：不看声量只看真实付费。数字人直播、AI 短剧、AI 音乐、B 端营销素材、模型 API 五条赛道的验证强度横向对比，共同规律是——能直接对标一项可计价人工劳动或挂上 GMV 的能力才跑得通。
- **推荐理由**：数据极其详实（大量市场数据 + 来源链接），且有独立判断框架（以「是否对标可计价劳动」为判据），信息密度高，是一篇有分量的市场分析。

### 3. Agent 健壮性设计：调用失败的四步容错与优雅降级
- **笔记**：`🌐 互联网产品与商业/搭建高可用的agent系统.md`（约 2880 字）
- **slug**：`agent-failure-handling-circuit-breaker`
- **tags**：agent, architecture, reliability, engineering, fault-tolerance
- **summary**：工具/模型调用失败的通用处理主线：错误分类 → 针对性修复/重试（指数退避 + 随机抖动）→ 熔断 → 优雅降级回退。关键在区分确定性错误与瞬时错误，并识别「API 返回成功但业务结果错」的潜在失败。
- **推荐理由**：工程方法论完整（含 mermaid 流程图），覆盖高可用设计核心，与已发布的《成本治理：双重试状态机》正好形成互补，实用性强。

### 4. Agent Memory 的两种流派与 Markdown 分层记忆架构
- **笔记**：`🤖 AI与机器学习/AI基础知识/agent-memory.md`（约 1140 字）
- **slug**：`agent-memory-two-approaches`
- **tags**：ai, agent, memory, rag, architecture
- **summary**：原生大模型并无记忆，上下文拼接方案有两大缺陷。Memory 两大实现流派：数据库 RAG 式（ES + BM25 + 向量混合检索）与 Markdown 文本蒸馏式（Memory/Topics/Transcript 三层架构），各有取舍。
- **推荐理由**：系统梳理 Agent 记忆的技术流派，与已发布的 RAG 三层混合记忆文章互补，技术深度足够，不是泛泛而谈。

### 5. 我对 Agent 架构演进的理解：Skill、Restatement 与 Sub Agent 回归
- **笔记**：`🤖 AI与机器学习/AI基础知识/认识agent.md`（约 1200 字）
- **slug**：`agent-architecture-evolution-insights`
- **tags**：ai, agent, architecture, skill, opinion
- **summary**：Skill 本质仍是提示词工程，只是提示词的按需注入。架构从三层编排 → Skill 压平 → Restatement + Sub Agent 回归，每一步都在针对性解决效率、注意力分布、输出同质化问题。
- **推荐理由**：有一手洞察（subagent 本质是并发、skill 是按需注入的提示词、restatement 解决注意力问题），是你自己的实践体悟，含金量高。

---

## ⚠️ 待定（需你决定）

### 6. Vibe Coding 高级感作品集网站：四阶段实操流程
- **笔记**：`🌐 互联网产品与商业/产品发布顺序须知/简历沉淀/agentcoding经验/作品集.md`（约 3370 字）
- **slug**：`vibe-coding-portfolio-workflow`
- **tags**：ai, vibe-coding, frontend, workflow, notes
- **推荐理由**：内容完整、流程可复用（四阶段 + 工具速查表 + 提示词节点对照）。
- **⚠️ 待定原因**：来源是 **B 站视频的学习笔记**（基于视频字幕整理），属于资料摘抄而非你的一手实践。发不发你定。

---

## ❌ 已跳过（内容不足，不会重复推荐）

| 笔记 | 原因 |
|------|------|
| `agentcoding经验/前端动画skill.md` | 仅 41 字，内容过短 |
| `2026AI项目汇总/【拉】openclaw：...远程控制电脑.md` | 仅 95 字，内容过短 |
| `agentcoding经验/token追踪.md` | 仅一个 GitHub 链接（此前已登记跳过） |
