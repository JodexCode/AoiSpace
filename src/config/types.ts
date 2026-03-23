export interface SiteConfig {
  title: string
  author: string
  avatar: string
  description?: string
  icp?: string
  github?: string
  email?: string
  socialLinks?: {
    github?: string
    email?: string
    twitter?: string
  }
}

export interface ThemeConfig {
  primaryColor: string
  codeTheme: 'github' | 'monokai' | 'dracula'
}

export interface PostMeta {
  id: string
  title: string
  date: string
  tags?: string[]
  description?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  tags?: string[]
}

export interface NavItem {
  text: string
  path: string
  icon?: string
}

export interface NavConfig {
  items: NavItem[]
}