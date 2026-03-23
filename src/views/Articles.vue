<script setup lang="ts">
import { onMounted } from 'vue'
import { siteConfig } from '../config'
import { posts } from '../posts'

onMounted(() => {
  document.title = `文章 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="articles">
    <header class="page-header">
      <h1 class="page-title">文章</h1>
      <p class="page-desc">共 {{ posts.length }} 篇文章</p>
    </header>

    <div class="article-list">
      <RouterLink
        v-for="(post, index) in posts"
        :key="post.id"
        :to="`/articles/${post.id}`"
        class="article-item"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div v-if="post.cover" class="article-cover">
          <img :src="post.cover" :alt="post.title" />
        </div>
        <div class="article-content">
          <h2 class="article-title">{{ post.title }}</h2>
          <div class="article-meta">
            <span class="date">📅 {{ formatDate(post.date) }}</span>
            <span v-if="post.readingTime" class="reading-time">⏱️ {{ post.readingTime }} 分钟</span>
          </div>
          <p v-if="post.description" class="article-desc">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="article-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </RouterLink>
    </div>

    <div v-if="posts.length === 0" class="empty-state">
      <span class="empty-icon">📭</span>
      <p>暂无文章</p>
    </div>
  </div>
</template>

<style scoped>
.articles {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.page-title {
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-desc {
  color: var(--text-secondary);
  font-size: 1rem;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.article-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px var(--shadow-color);
  border-color: var(--accent-color);
}

.article-cover {
  flex-shrink: 0;
  width: 180px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  flex: 1;
  min-width: 0;
}

.article-title {
  margin: 0 0 0.5rem;
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.reading-time {
  color: var(--text-secondary);
}

.article-desc {
  margin: 0 0 0.75rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  border-radius: 50px;
  font-size: 0.75rem;
  color: white;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .article-item {
    flex-direction: column;
  }

  .article-cover {
    width: 100%;
    height: 160px;
  }

  .article-title {
    font-size: 1.15rem;
  }
}
</style>
