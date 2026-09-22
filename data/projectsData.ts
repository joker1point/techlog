export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  /** 状态徽章文案，如「已开源 · v1.0.1」 */
  badge: string
  badgeTone: 'green' | 'blue' | 'amber' | 'gray'
  /** 标题下的小字：仓库 / 归属 / 定位 */
  repo: string
  description: string
  tags: string[]
  links: ProjectLink[]
  /** 没有外链时展示的一句说明 */
  note?: string
  /** 16:9 封面（真实截图，放在 /static/images/projects/） */
  imgSrc?: string
  imgAlt?: string
  /** 没有截图时的命令行封面：$ 开头为主色行，其余为注释色 */
  term?: string[]
}

const projectsData: Project[] = [
  {
    title: 'flowwatch · 本机流量实时监控与进程归因',
    badge: '已开源 · v1.0.1',
    badgeTone: 'green',
    repo: 'joker1point/flowwatch · Windows 系统工具',
    description:
      '回答任务管理器答不了的问题：哪个进程正在跟谁通信、用了多少带宽、从什么时候开始。把「说不清是谁的流量」如实分账（本机归因 / 属主受限 / 未归因 / 非 TCP-UDP），不混进总数里假装准确；域名只读明文元数据（DNS 应答 + TLS ClientHello 的 SNI），不落包体。',
    tags: [
      'Python',
      'FastAPI + SSE',
      'SQLite WAL',
      'React 19 + Vite',
      'Npcap / ctypes',
      'DNS / SNI / ETW',
    ],
    links: [
      { label: '源码', href: 'https://github.com/joker1point/flowwatch' },
      { label: 'v1.0.1 发布', href: 'https://github.com/joker1point/flowwatch/releases' },
      { label: '演示视频', href: 'https://www.bilibili.com/video/BV14ehv6REqU' },
    ],
    imgSrc: '/static/images/projects/flowwatch-dashboard.jpg',
    imgAlt: 'flowwatch 仪表盘：进程流量排行、本机总吞吐曲线与变化事件流',
  },
  {
    title: 'portwatch · 本机端口占用归因与历史留档',
    badge: '已开源',
    badgeTone: 'green',
    repo: 'joker1point/portwatch · Windows 系统工具',
    description:
      '把 netstat 的一行 IP:PORT 变成可追溯的归因链路：端口 → PID → 进程名 → exe → 启动命令行 → 工作目录 → 启动时间，并把每次占用的出现 / 消失留档成可回溯的历史。16 个 pytest 用例钉住采集 / API / 历史三层契约，GitHub Actions 四矩阵（ubuntu + windows × py3.11 / 3.13）回归。',
    tags: ['Python', 'psutil', 'FastAPI + SSE', 'SQLite WAL', 'React 19 + Vite', 'asyncio'],
    links: [{ label: '源码', href: 'https://github.com/joker1point/portwatch' }],
    imgSrc: '/static/images/projects/portwatch-attribution.jpg',
    imgAlt: 'portwatch 仪表盘：端口列表、归因链路与变化时间线',
  },
  {
    title: 'VDB-News · 情报管道与可进化报告平台',
    badge: '私有部署 · 线上运行',
    badgeTone: 'blue',
    repo: '16 路信源 → 8 步管道 → 每日主题报告',
    description:
      '不只做 RAG 问答：16 路信源自动采集，经去重 / 聚类 / 分析 / 审核 / 组装 / 分发 8 步管道产出每日主题日报。报告带「进化对比」（较上一份新增 / 延续）与信号分级，用户的显式打分与隐式画像双路反哺排序；embedding 成本压到 ≈ ¥0.0017/篇、单份报告 ≈ ¥0.014。',
    tags: ['FastAPI', 'ChromaDB / RAG', '报告引擎', 'SSE 流式', 'React 19 + TS', 'Docker / HTTPS'],
    links: [
      { label: 'RAG 链路全解析', href: '/blog/rag-pipeline-architecture' },
      { label: 'RAG 选型决策框架', href: '/blog/rag-vs-agent-retrieval-decision-framework' },
    ],
    imgSrc: '/static/images/projects/vdbnews-home.jpg',
    imgAlt: 'VDB-News 首页：从信源到情报报告的全自动数据管道',
  },
  {
    title: 'CharacterSeed · AI 数字生命',
    badge: '商业挑战赛 · 入围决赛 + 优秀奖',
    badgeTone: 'amber',
    repo: '私有项目 · 可现场演示 / 代码讲解',
    description:
      '由人格、记忆、世界驱动的 AI NPC 平台：角色会成长、会在你离线时主动找你说话。Director + Actor 双 LLM 管线把「注意力聚焦」与「行为生成」拆开，原始 JSON 可展开调试；积温引擎用连续状态模型驱动主动消息，配三层记忆、TTS 音色绑定与角色相册。',
    tags: ['FastAPI', 'SQLAlchemy / SQLite', 'SSE', 'Edge-TTS', 'React 18 + Vite', 'ffmpeg'],
    links: [],
    note: '私有仓库 · 支持现场演示与代码讲解',
    term: [
      '$ .venv\\Scripts\\python server.py',
      '# Director + Actor 双 LLM 管线 · 积温引擎 · 三层记忆',
      '# 角色主动消息 / 相册 / 音色绑定 / 剧情视频',
    ],
  },
  {
    title: 'MoneyPrinterTurbo 双 PR 贡献',
    badge: 'PR #1291 / #1296 已合并',
    badgeTone: 'blue',
    repo: '上游 harry0703/MoneyPrinterTurbo · 12 万+ star',
    description:
      '为上游新增 OpenAI 兼容文生图素材源，打通本地 ComfyUI / SD 私有化链路（+1441 / −32、25 个单测，866 个全量测试通过）。第二轮按「能否确认服务端未创建任务」重建付费 API 的失败语义：读超时不重试、429 退避、本地故障必须终止而不是继续扣费。',
    tags: ['Python', 'FastAPI', 'OpenAI 兼容协议', 'Pytest', '开源协作'],
    links: [
      { label: 'PR #1291', href: 'https://github.com/harry0703/MoneyPrinterTurbo/pull/1291' },
      { label: 'PR #1296', href: 'https://github.com/harry0703/MoneyPrinterTurbo/pull/1296' },
      { label: '合并复盘', href: '/blog/mpt-pr-1291-contribution-review' },
    ],
    imgSrc: '/static/images/projects/mpt-pr-1291.jpg',
    imgAlt: 'MoneyPrinterTurbo PR #1291：OpenAI 兼容文生图素材源已合并',
  },
  {
    title: 'agent-skill-framework · 技能评估与治理',
    badge: '已开源',
    badgeTone: 'green',
    repo: 'joker1point/agent-skill-framework',
    description:
      '可迭代验证的 Agent Skill 框架：用真实 LLM 基准（同一任务 with / without 技能对比）把「这个技能到底有没有用」从主观判断变成可量化、可回归的指标，并给出 700+ skill 的四层治理体系——排序、存储管理、分区保护、自进化。',
    tags: ['Python', 'OpenAI 兼容 API', 'JSON 驱动测试', 'HTML 报告'],
    links: [
      { label: '源码', href: 'https://github.com/joker1point/agent-skill-framework' },
      { label: '700+ Skill 治理', href: '/blog/agent-skill-governance' },
      { label: '22 篇文档蒸馏成技能', href: '/blog/dev-lessons-skill-distillation' },
    ],
    term: [
      '$ python evaluate.py --skill weather --compare',
      '# 同一任务 with / without 技能的真实 LLM 基准对比',
      '# → 交互式 HTML 报告，按迭代轮次落盘留档',
    ],
  },
  {
    title: 'viral-content-analysis · 爆款内容分析与脚本生成',
    badge: '私有项目',
    badgeTone: 'gray',
    repo: '采集 → 分析 → 评分排序 → 选题 → 可拍摄脚本',
    description:
      '输入关键词或链接，自动跑完采集 → 爆款结构分析 → IP 风格改写 → 0-100 评分排序 → 选题 → 可拍摄脚本。一次提示词根因诊断把「9 个字段只有 1 个有值」修到全部结构化：Top1 从 57 提升到 71.3 分（S 级）、聚类从 85 类碎片化收敛到 16 类；时间表述归一化校验用来挡住 LLM 编造事实。',
    tags: ['FastAPI', '原生 ES Module SPA', '异步任务队列', 'ffmpeg', 'pytest'],
    links: [],
    note: '私有项目 · 内置 90 条真实数据的只读演示可现场启动',
    term: [
      '$ python -m app.api --port 8912',
      '# 只读演示内置 90 条真实数据，不需要 API Key',
      '# 云 API 错误分类：配额耗尽立即中止 / 并发占满退避重试',
    ],
  },
  {
    title: 'TechLog · 这个博客本身',
    badge: '已上线 · 已开源',
    badgeTone: 'green',
    repo: 'Next.js 15 + Contentlayer 静态生成',
    description:
      '写作流也是工程：Obsidian 笔记 → MDX → Contentlayer 静态生成 → 一键构建部署。这里沉淀的都是第一手的踩坑复盘——Agent 架构演进、工具调用容错、上下文工程与成本治理，页面上每个项目都能在博客里找到对应的决策记录。',
    tags: ['Next.js 15', 'React 19', 'Tailwind 4', 'Contentlayer', 'MDX', '静态导出'],
    links: [
      { label: '源码', href: 'https://github.com/joker1point/techlog' },
      { label: '全部文章', href: '/blog' },
      { label: '完整作品集', href: 'https://joker1point.github.io/' },
    ],
    imgSrc: '/static/images/projects/techlog-home.jpg',
    imgAlt: 'TechLog 首页：Agent 工程化实践复盘',
  },
]

export default projectsData
