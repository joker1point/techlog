interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  isPlaceholder?: boolean
}

const projectsData: Project[] = [
  {
    title: 'TechLog',
    description:
      '基于 Next.js 15 + Tailwind CSS v4 构建的现代技术博客。集成 Contentlayer MDX、kbar 搜索、暗色模式、Giscus 评论系统。',
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/joker1point/techlog',
  },
  {
    title: 'VDB-News',
    description:
      '向量数据库新闻 RAG 应用。FastAPI + SQLite + ChromaDB + 智谱 GLM-4-Flash + Tavily 搜索，Nginx + SSL 部署，支持智能检索与新闻聚合。',
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://agentking91.site',
  },
  {
    title: 'CosmicExplosion',
    description:
      'WebGL 粒子动画项目。宇宙大爆炸主题的交互式粒子特效，支持音频可视化联动，纯前端 Canvas / WebGL 实现。',
    imgSrc: '/static/images/time-machine.jpg',
  },
  {
    title: '更多项目正在路上',
    description:
      '二次曲面可视化、Remotion 技术科普视频、browser-use 自动化工具……新项目陆续整理中，敬请期待。',
    imgSrc: '/static/images/time-machine.jpg',
    isPlaceholder: true,
  },
]

export default projectsData
