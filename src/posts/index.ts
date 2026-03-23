import type { PostMeta } from '../config/types'

const modules = import.meta.glob('./local/*.md', { eager: true }) as Record<string, any>

function calculateReadingTime(content: unknown): number {
  if (typeof content !== 'string') return 0
  const text = content.replace(/[#*`\[\]()]/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

export const posts: PostMeta[] = Object.entries(modules)
  .map(([path, module]) => {
    const id = path.replace(/^\.\/local\//, '').replace(/\.md$/, '')
    return {
      id,
      title: module.title || id,
      date: module.date || '',
      updated: module.updated,
      tags: module.tags || [],
      description: module.description || '',
      cover: module.cover,
      readingTime: module.readingTime || calculateReadingTime(module.default)
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(id: string) {
  return modules[`./local/${id}.md`]
}

export function getPostCount() {
  return posts.length
}
