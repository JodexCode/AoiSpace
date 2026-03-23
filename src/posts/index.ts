import type { PostMeta } from '../config/types'

const modules = import.meta.glob('./local/*.md', { eager: true }) as Record<string, { attributes?: Partial<PostMeta>; default?: unknown; frontmatter?: Partial<PostMeta> }>

function calculateReadingTime(content: unknown): number {
  if (typeof content !== 'string') return 0
  const text = content.replace(/[#*`\[\]()]/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

export const posts: PostMeta[] = Object.entries(modules)
  .map(([path, module]) => {
    const id = path.replace(/^\.\/local\//, '').replace(/\.md$/, '')
    const attrs = module.attributes || module.frontmatter || {}
    return {
      id,
      title: attrs.title || id,
      date: attrs.date || '',
      updated: attrs.updated,
      tags: attrs.tags || [],
      description: attrs.description || '',
      cover: attrs.cover,
      readingTime: attrs.readingTime || calculateReadingTime(module.default)
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(id: string) {
  return modules[`./local/${id}.md`]
}

export function getPostCount() {
  return posts.length
}
