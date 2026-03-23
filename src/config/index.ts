import type { SiteConfig, ThemeConfig, NavConfig } from './types'

function getEnv(key: string, fallback: string): string {
  return import.meta.env[key] || fallback
}

export const siteConfig: SiteConfig = {
  title: getEnv('VITE_SITE_TITLE', '每天睡25小时的博客'),
  author: getEnv('VITE_SITE_AUTHOR', '每天睡25小时'),
  avatar: getEnv('VITE_SITE_AVATAR', '/avatar.png'),
  description: getEnv('VITE_SITE_DESCRIPTION', '记录技术探索与生活点滴的个人博客'),
  icp: getEnv('VITE_SITE_ICP', ''),
  github: getEnv('VITE_SITE_GITHUB', ''),
  email: getEnv('VITE_SITE_EMAIL', ''),
  socialLinks: {
    github: getEnv('VITE_SITE_GITHUB', ''),
    email: getEnv('VITE_SITE_EMAIL', '')
  }
}

export const themeConfig: ThemeConfig = {
  primaryColor: '#3b82f6',
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
  '--bg-primary': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
  '--bg-secondary': 'rgba(255, 255, 255, 0.7)',
  '--bg-glass': 'rgba(255, 255, 255, 0.6)',
  '--text-primary': '#1e3a5f',
  '--text-secondary': '#5a7a9a',
  '--border-color': 'rgba(59, 130, 246, 0.25)',
  '--accent-color': '#3b82f6',
  '--accent-secondary': '#06b6d4',
  '--code-bg': 'rgba(224, 242, 254, 0.8)',
  '--hover-bg': 'rgba(59, 130, 246, 0.1)',
  '--shadow-color': 'rgba(59, 130, 246, 0.2)',
  '--card-bg': 'rgba(255, 255, 255, 0.7)'
}

export const darkTheme = {
  '--bg-primary': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  '--bg-secondary': 'rgba(30, 41, 59, 0.8)',
  '--bg-glass': 'rgba(30, 41, 59, 0.6)',
  '--text-primary': '#e2e8f0',
  '--text-secondary': '#94a3b8',
  '--border-color': 'rgba(148, 163, 184, 0.2)',
  '--accent-color': '#60a5fa',
  '--accent-secondary': '#22d3ee',
  '--code-bg': 'rgba(15, 23, 42, 0.8)',
  '--hover-bg': 'rgba(96, 165, 250, 0.15)',
  '--shadow-color': 'rgba(0, 0, 0, 0.4)',
  '--card-bg': 'rgba(30, 41, 59, 0.7)'
}