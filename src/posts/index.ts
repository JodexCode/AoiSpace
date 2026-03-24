import type { PostMeta } from '../config/types'

const modules = import.meta.glob('./local/*.md', { eager: true }) as Record<string, any>
const rawModules = import.meta.glob('./local/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function calculateReadingTime(content: unknown): number {
  if (typeof content !== 'string') return 0
  const text = content.replace(/[#*`[\]()]/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

function extractTextContent(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*`[\]()_\-~>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface HeadingPosition {
  index: number
  text: string
  charPos: number
}

export interface PostWithContent extends PostMeta {
  rawContent?: string
  headings?: HeadingPosition[]
}

function extractHeadings(markdown: string): HeadingPosition[] {
  const headings: HeadingPosition[] = []
  const lines = markdown.split('\n')
  let charCount = 0
  
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      headings.push({
        index: headings.length,
        text: match[2].trim(),
        charPos: charCount
      })
    }
    charCount += line.length + 1
  }
  
  return headings
}

export const posts: PostWithContent[] = Object.entries(modules)
  .map(([path, module]) => {
    const id = path.replace(/^\.\/local\//, '').replace(/\.md$/, '')
    const rawContent = rawModules[path] ? extractTextContent(rawModules[path]) : ''
    const headings = rawModules[path] ? extractHeadings(rawModules[path]) : []
    return {
      id,
      title: module.title || id,
      date: module.date || '',
      updated: module.updated,
      tags: module.tags || [],
      description: module.description || '',
      cover: module.cover,
      readingTime: module.readingTime || calculateReadingTime(module.default),
      rawContent,
      headings
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(id: string) {
  return modules[`./local/${id}.md`]
}

export function getPostCount() {
  return posts.length
}
