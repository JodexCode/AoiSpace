export interface SocialLink {
  name: string
  url: string
  icon: string
  iconType?: 'emoji' | 'text' | 'image'
  color?: string
}

export interface SiteConfig {
  title: string
  author: string
  avatar: string
  description?: string
  icp?: string
  socialLinks?: SocialLink[]
}

export interface ThemeConfig {
  primaryColor: string
  codeTheme: 'github' | 'monokai' | 'dracula'
}

export interface PostMeta {
  id: string
  title: string
  date: string
  updated?: string
  tags?: string[]
  description?: string
  cover?: string
  readingTime?: number
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  previewUrl?: string
  sourceUrl?: string
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
