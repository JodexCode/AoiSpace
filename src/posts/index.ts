import type { PostMeta } from '../config/types'

const modules = import.meta.glob('./*.md', { eager: true }) as Record<string, { attributes?: Partial<PostMeta>; default?: string }>
const localModules = import.meta.glob('./local/*.md', { eager: true }) as Record<string, { attributes?: Partial<PostMeta>; default?: string }>

function parseModules(modules: Record<string, { attributes?: Partial<PostMeta>; default?: string }>) {
  return Object.entries(modules).map(([path, module]) => {
    const id = path.replace(/^\.\//, '').replace(/\.md$/, '')
    return {
      id,
      title: module.attributes?.title || id,
      date: module.attributes?.date || '',
      tags: module.attributes?.tags || [],
      description: module.attributes?.description || '',
      default: module.default
    }
  })
}

export const posts: PostMeta[] = [
  ...parseModules(localModules),
  ...parseModules(modules)
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(id: string) {
  return modules[`./${id}.md`] || localModules[`./local/${id}.md`]
}

export function getPostCount() {
  return posts.length
}
