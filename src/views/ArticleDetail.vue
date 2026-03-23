<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../config'
import { getPost } from '../posts'

const route = useRoute()
const id = route.params.id as string
const post = getPost(id)

const tocVisible = ref(true)
const activeHeading = ref('')
const toc = ref<{ id: string; text: string; level: number }[]>([])

const searchQuery = computed(() => route.query.q as string || '')
const searchHeading = computed(() => route.query.heading ? parseInt(route.query.heading as string) : undefined)

const meta = computed(() => {
  if (!post) return {}
  return {
    title: (post as any).title || id,
    date: (post as any).date || '',
    updated: (post as any).updated,
    tags: (post as any).tags || [],
    description: (post as any).description || '',
    cover: (post as any).cover,
    readingTime: (post as any).readingTime
  }
})

function extractToc() {
  if (!post?.default) {
    toc.value = []
    return
  }
  
  nextTick(() => {
    const contentEl = document.querySelector('.article-content')
    if (!contentEl) {
      toc.value = []
      return
    }
    
    const headings: { id: string; text: string; level: number }[] = []
    const headingElements = contentEl.querySelectorAll('h1, h2, h3')
    
    headingElements.forEach((el, index) => {
      const text = el.textContent?.trim() || ''
      const level = parseInt(el.tagName[1])
      const headingId = `heading-${index}`
      el.id = headingId
      headings.push({ id: headingId, text, level })
    })
    
    toc.value = headings
    scrollToSearchMatch()
  })
}

function scrollToSearchMatch() {
  const headingIndex = searchHeading.value
  if (headingIndex === undefined || !searchQuery.value || toc.value.length === 0) return
  
  const targetHeading = toc.value[headingIndex]
  if (targetHeading) {
    setTimeout(() => {
      const el = document.getElementById(targetHeading.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        activeHeading.value = targetHeading.id
      }
    }, 300)
  }
}

function scrollToHeading(targetId: string) {
  const el = document.getElementById(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeHeading.value = targetId
  }
}

function toggleToc() {
  tocVisible.value = !tocVisible.value
}

onMounted(() => {
  const title = meta.value?.title || id
  document.title = `${title} - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
  setTimeout(extractToc, 200)
})

watch(() => route.params.id, () => {
  setTimeout(extractToc, 200)
})

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="article-layout">
    <article class="article-detail">
      <div v-if="meta.cover" class="article-cover">
        <img :src="meta.cover" :alt="meta.title" />
      </div>

      <header class="article-header">
        <h1 class="article-title">{{ meta.title || id }}</h1>
        <div class="article-info">
          <span class="info-item">
            <span class="info-icon">📅</span>
            发布于 {{ formatDate(meta.date || '') }}
          </span>
          <span v-if="meta.updated" class="info-item">
            <span class="info-icon">🔄</span>
            更新于 {{ formatDate(meta.updated) }}
          </span>
          <span v-if="meta.readingTime" class="info-item">
            <span class="info-icon">⏱️</span>
            预计阅读 {{ meta.readingTime }} 分钟
          </span>
        </div>
        <div class="article-tags">
          <span v-for="tag in meta.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <p v-if="meta.description" class="article-description">
        {{ meta.description }}
      </p>

      <div class="article-content markdown-body">
        <component :is="post?.default" />
      </div>
    </article>

    <aside
      v-if="toc.length > 0"
      class="article-toc"
      :class="{ collapsed: !tocVisible }"
    >
      <button
        class="toc-toggle"
        @click="toggleToc"
        :title="tocVisible ? '隐藏目录' : '显示目录'"
      >
        <span class="toggle-icon">{{ tocVisible ? '▶' : '◀' }}</span>
      </button>
      <div v-show="tocVisible" class="toc-content">
        <h3 class="toc-title">目录</h3>
        <nav class="toc-nav">
          <a
            v-for="heading in toc"
            :key="heading.id"
            :href="`#${heading.id}`"
            class="toc-item"
            :class="[
              `level-${heading.level}`,
              { active: activeHeading === heading.id },
            ]"
            @click.prevent="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </a>
        </nav>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.article-layout {
  display: flex;
  gap: 2rem;
  position: relative;
}

.article-detail {
  flex: 1;
  min-width: 0;
}

.article-cover {
  margin-bottom: 2rem;
  border-radius: 16px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
}

.article-header {
  margin-bottom: 1.5rem;
}

.article-title {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin: 0 0 1rem;
  line-height: 1.3;
}

.article-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.info-icon {
  font-size: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  border-radius: 50px;
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
}

.article-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  padding: 1rem 1.25rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border-left: 4px solid var(--accent-color);
  margin-bottom: 2rem;
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

.article-content :deep(h1) {
  font-size: 1.8rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.article-content :deep(h2) {
  font-size: 1.4rem;
}

.article-content :deep(h3) {
  font-size: 1.15rem;
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

.article-toc {
  position: sticky;
  top: 2rem;
  width: 220px;
  flex-shrink: 0;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  transition: width 0.3s ease;
}

.article-toc.collapsed {
  width: 28px;
}

.toc-toggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.toc-toggle:hover {
  background: var(--hover-bg);
  border-color: var(--accent-color);
}

.toggle-icon {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.toc-content {
  margin-left: 36px;
  padding: 1rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.toc-title {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
  font-weight: 600;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.toc-item {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.3rem 0;
  transition: color 0.2s;
  line-height: 1.4;
}

.toc-item:hover {
  color: var(--accent-color);
}

.toc-item.active {
  color: var(--accent-color);
  font-weight: 500;
}

.toc-item.level-1 {
  padding-left: 0;
  font-weight: 500;
  color: var(--text-primary);
}

.toc-item.level-2 {
  padding-left: 0.5rem;
}

.toc-item.level-3 {
  padding-left: 1rem;
  font-size: 0.8rem;
}

@media (max-width: 1024px) {
  .article-layout {
    flex-direction: column;
  }

  .article-toc {
    position: relative;
    top: 0;
    width: 100%;
    max-height: none;
    margin-bottom: 1.5rem;
  }

  .article-toc.collapsed {
    width: 100%;
    height: 36px;
    overflow: hidden;
  }

  .toc-content {
    margin-left: 0;
  }

  .toc-toggle {
    display: none;
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }

  .article-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (min-width: 1440px) {
  .article-title {
    font-size: 3rem;
  }

  .article-info {
    font-size: 1rem;
    gap: 1.5rem;
  }

  .tag {
    padding: 0.35rem 1rem;
    font-size: 0.9rem;
  }

  .article-description {
    font-size: 1.2rem;
    padding: 1.25rem 1.5rem;
    border-radius: 14px;
  }

  .article-content {
    font-size: 1.05rem;
  }

  .article-content :deep(h1) {
    font-size: 2.2rem;
  }

  .article-content :deep(h2) {
    font-size: 1.7rem;
  }

  .article-content :deep(h3) {
    font-size: 1.35rem;
  }

  .article-content :deep(p) {
    margin-bottom: 1.25rem;
  }

  .article-content :deep(pre) {
    padding: 1.25rem;
    border-radius: 12px;
  }

  .article-toc {
    width: 260px;
  }

  .toc-content {
    padding: 1.25rem;
    border-radius: 14px;
  }

  .toc-title {
    font-size: 1rem;
  }

  .toc-item {
    font-size: 0.95rem;
    padding: 0.4rem 0;
  }
}

@media (min-width: 1920px) {
  .article-cover {
    margin-bottom: 2.5rem;
    border-radius: 20px;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .article-title {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }

  .article-info {
    font-size: 1.05rem;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .info-icon {
    font-size: 1.1rem;
  }

  .article-tags {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    padding: 0.4rem 1.1rem;
    font-size: 0.95rem;
  }

  .article-description {
    font-size: 1.25rem;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    margin-bottom: 2.5rem;
  }

  .article-content {
    font-size: 1.1rem;
    line-height: 2;
  }

  .article-content :deep(h1) {
    font-size: 2.5rem;
    padding-top: 1.5rem;
  }

  .article-content :deep(h2) {
    font-size: 1.9rem;
    margin-top: 2.5rem;
  }

  .article-content :deep(h3) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  .article-content :deep(p) {
    margin-bottom: 1.5rem;
  }

  .article-content :deep(pre) {
    padding: 1.5rem;
    border-radius: 14px;
    margin-bottom: 1.5rem;
  }

  .article-content :deep(blockquote) {
    padding: 0.75rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 12px;
  }

  .article-content :deep(img) {
    border-radius: 12px;
    margin: 1.5rem 0;
  }

  .article-toc {
    width: 300px;
  }

  .toc-content {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .toc-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .toc-nav {
    gap: 0.5rem;
  }

  .toc-item {
    font-size: 1rem;
    padding: 0.5rem 0;
  }

  .toc-item.level-3 {
    padding-left: 1.25rem;
    font-size: 0.9rem;
  }
}
</style>
