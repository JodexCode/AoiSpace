<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../config'
import { getPost } from '../posts'

const route = useRoute()
const id = route.params.id as string
const post = getPost(id)

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

onMounted(() => {
  const title = meta.value?.title || id
  document.title = `${title} - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
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
</template>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
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

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }

  .article-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
