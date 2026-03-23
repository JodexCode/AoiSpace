import type { SiteConfig, ThemeConfig, NavConfig, SocialLink } from './types'
import socialLinksData from './social-links.json'

function getEnv(key: string, fallback: string): string {
  return import.meta.env[key] || fallback
}

export const siteConfig: SiteConfig = {
  title: getEnv('VITE_SITE_TITLE', '每天睡25小时的博客'),
  author: getEnv('VITE_SITE_AUTHOR', '每天睡25小时'),
  avatar: getEnv('VITE_SITE_AVATAR', '/avatar.png'),
  description: getEnv('VITE_SITE_DESCRIPTION', '记录技术探索与生活点滴的个人博客'),
  icp: getEnv('VITE_SITE_ICP', ''),
  socialLinks: socialLinksData as SocialLink[]
}

export const themeConfig: ThemeConfig = {
  primaryColor: '#7c3aed',
  codeTheme: 'github'
}

export const navConfig: NavConfig = {
  items: [
    { text: '首页', path: '/' },
    { text: '文章', path: '/articles' },
    { text: '作品', path: '/projects' },
    { text: '关于', path: '/about' }
  ]
}

export { projects } from '../projects'

export const lightTheme = {
  '--bg-primary': 'linear-gradient(135deg, rgba(168, 139, 250, 0.15) 0%, rgba(56, 189, 248, 0.1) 25%, rgba(251, 207, 232, 0.12) 50%, rgba(134, 239, 172, 0.08) 75%, rgba(96, 165, 250, 0.1) 100%)',
  '--bg-secondary': 'rgba(255, 255, 255, 0.4)',
  '--bg-glass': 'rgba(255, 255, 255, 0.25)',
  '--bg-glass-hover': 'rgba(255, 255, 255, 0.4)',
  '--text-primary': '#1e1b4b',
  '--text-secondary': '#6b7280',
  '--border-color': 'rgba(255, 255, 255, 0.5)',
  '--accent-color': '#8b5cf6',
  '--accent-secondary': '#06b6d4',
  '--accent-gradient': 'linear-gradient(135deg, #a78bfa, #ec4899, #f472b6)',
  '--code-bg': 'rgba(139, 92, 246, 0.08)',
  '--hover-bg': 'rgba(139, 92, 246, 0.08)',
  '--shadow-color': 'rgba(139, 92, 246, 0.15)',
  '--card-bg': 'rgba(255, 255, 255, 0.35)',
  '--card-border': 'rgba(255, 255, 255, 0.6)',
  '--glass-blur': 'blur(16px)',
  '--particle-color': 'rgba(139, 92, 246, 0.3)',
  '--glow-color': 'rgba(236, 72, 153, 0.2)'
}

export const darkTheme = {
  '--bg-primary': 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.6) 25%, rgba(30, 41, 59, 0.5) 50%, rgba(59, 130, 246, 0.15) 75%, rgba(236, 72, 153, 0.1) 100%)',
  '--bg-secondary': 'rgba(30, 41, 59, 0.5)',
  '--bg-glass': 'rgba(30, 41, 59, 0.4)',
  '--bg-glass-hover': 'rgba(50, 61, 80, 0.5)',
  '--text-primary': '#f1f5f9',
  '--text-secondary': '#94a3b8',
  '--border-color': 'rgba(255, 255, 255, 0.1)',
  '--accent-color': '#a78bfa',
  '--accent-secondary': '#38bdf8',
  '--accent-gradient': 'linear-gradient(135deg, #a78bfa, #ec4899, #f472b6)',
  '--code-bg': 'rgba(139, 92, 246, 0.15)',
  '--hover-bg': 'rgba(139, 92, 246, 0.12)',
  '--shadow-color': 'rgba(0, 0, 0, 0.4)',
  '--card-bg': 'rgba(30, 41, 59, 0.45)',
  '--card-border': 'rgba(255, 255, 255, 0.08)',
  '--glass-blur': 'blur(20px)',
  '--particle-color': 'rgba(167, 139, 250, 0.4)',
  '--glow-color': 'rgba(236, 72, 153, 0.3)'
}
