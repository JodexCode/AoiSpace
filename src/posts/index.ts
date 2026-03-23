import type { PostMeta } from '../config/types'

const modules = import.meta.glob('./local/*.md', { eager: true }) as Record<string, { attributes?: Partial<PostMeta>; default?: string }>

function calculateReadingTime(content: string): number {
  const text = content.replace(/[#*`\[\]()]/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

export const posts: PostMeta[] = Object.entries(modules)
  .map(([path, module]) => {
    const id = path.replace(/^\.\/local\//, '').replace(/\.md$/, '')
    const content = module.default || ''
    return {
      id,
      title: module.attributes?.title || id,
      date: module.attributes?.date || '',
      updated: module.attributes?.updated,
      tags: module.attributes?.tags || [],
      description: module.attributes?.description || '',
      cover: module.attributes?.cover,
      readingTime: module.attributes?.readingTime || calculateReadingTime(content)
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(id: string) {
  return modules[`./local/${id}.md`]
}

export function getPostCount() {
  return posts.length
}
