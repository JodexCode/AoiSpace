<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const content = ref('')
const meta = ref({ title: '', date: '', tags: [] as string[] })

const md = new MarkdownIt()

onMounted(async () => {
  const id = route.params.id as string
  
  document.title = `${id} - 每天睡25小时的个人博客 - 由 AoiSpace / 碧蓝空间驱动`
  
  try {
    const response = await fetch(`/posts/${id}.md`)
    if (!response.ok) {
      content.value = '<p>Article not found</p>'
      return
    }
    
    const text = await response.text()
    const parts = text.split('---')
    
    if (parts.length >= 3) {
      const frontmatter = parts[1]
      content.value = md.render(parts.slice(2).join('---'))
      
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        const value = valueParts.join(':').trim()
        if (key === 'title') meta.value.title = value
        if (key === 'date') meta.value.date = value
        if (key === 'tags') meta.value.tags = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim())
      })
    } else {
      content.value = md.render(text)
      meta.value.title = id
    }
  } catch (e) {
    content.value = '<p>Article not found</p>'
  }
})
</script>

<template>
  <article class="article-detail">
    <header class="article-header">
      <h1 class="article-title">{{ meta.title }}</h1>
      <div class="article-meta">
        <span class="date">{{ meta.date }}</span>
        <span v-for="tag in meta.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </header>
    <div class="article-content markdown-body" v-html="content"></div>
  </article>
</template>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.article-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: var(--code-bg);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--accent-color);
}

.article-content {
  line-height: 1.8;
  color: var(--text-primary);
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(code) {
  padding: 0.2rem 0.4rem;
  background: var(--code-bg);
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  padding: 1rem;
  background: var(--code-bg);
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.article-content :deep(pre code) {
  padding: 0;
  background: none;
}

.article-content :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}

.article-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid var(--accent-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
}
</style>