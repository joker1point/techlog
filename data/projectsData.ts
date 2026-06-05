interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'TechLog',
    description:
      '基于 Next.js 15 + Tailwind CSS v4 构建的现代技术博客。集成 Contentlayer MDX、kbar 搜索、暗色模式，Lighthouse 评分 98+。',
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/joker1point/techlog',
  },
  {
    title: 'Design System CLI',
    description:
      '从 Figma Design Tokens 自动生成 CSS 变量和 Tailwind 配置的 CLI 工具。支持多主题、暗色模式一键切换，减少 80% 的手动 token 同步工作。',
    imgSrc: '/static/images/google.png',
    href: 'https://github.com/joker1point/design-system-cli',
  },
  {
    title: 'React Component Library',
    description:
      '基于 Radix UI + Tailwind CSS 的企业级 React 组件库。20+ 组件、完整 Storybook 文档、WCAG AA 可访问性认证、Tree-shaking 支持。',
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/joker1point/ui-library',
  },
]

export default projectsData
