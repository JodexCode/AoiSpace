<script setup lang="ts">
import { onMounted } from 'vue'
import { siteConfig } from '../config'
import { posts } from '../posts'

onMounted(() => {
  document.title = `文章 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})
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
        <h2 class="article-title">{{ post.title }}</h2>
        <div class="article-meta">
          <span class="date">{{ post.date }}</span>
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <p class="article-desc">{{ post.description }}</p>
        <span class="read-more">阅读更多 →</span>
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
  position: relative;
  padding: 2rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.article-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px var(--shadow-color);
  border-color: var(--accent-color);
}

.article-title {
  margin: 0 0 1rem;
  color: var(--text-primary);
  font-size: 1.4rem;
  font-weight: 600;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.date {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  border-radius: 50px;
  font-size: 0.75rem;
  color: white;
  font-weight: 500;
}

.article-desc {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.read-more {
  display: inline-block;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.article-item:hover .read-more {
  transform: translateX(4px);
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
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.2rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
