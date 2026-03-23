<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { siteConfig } from '../config'
import { posts } from '../posts'

onMounted(() => {
  document.title = `文章 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})

const selectedTag = ref('')
const selectedYear = ref('')

const allTags = computed(() => {
  const tags = new Set<string>()
  posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
})

const allYears = computed(() => {
  const years = new Set<string>()
  posts.forEach(post => {
    if (post.date) {
      years.add(new Date(post.date).getFullYear().toString())
    }
  })
  return Array.from(years).sort().reverse()
})

const filteredPosts = computed(() => {
  return posts.filter(post => {
    const matchTag = !selectedTag.value || post.tags?.includes(selectedTag.value)
    const matchYear = !selectedYear.value || (post.date && new Date(post.date).getFullYear().toString() === selectedYear.value)
    return matchTag && matchYear
  })
})

function clearFilters() {
  selectedTag.value = ''
  selectedYear.value = ''
}

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="articles">
    <header class="page-header">
      <h1 class="page-title">文章</h1>
      <p class="page-desc">共 {{ filteredPosts.length }} 篇文章{{ filteredPosts.length !== posts.length ? `（共 ${posts.length} 篇）` : '' }}</p>
    </header>

    <section class="filters">
      <div class="filter-group">
        <label class="filter-label">标签筛选</label>
        <select v-model="selectedTag" class="filter-select">
          <option value="">全部标签</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">时间筛选</label>
        <select v-model="selectedYear" class="filter-select">
          <option value="">全部时间</option>
          <option v-for="year in allYears" :key="year" :value="year">{{ year }} 年</option>
        </select>
      </div>
      <button v-if="selectedTag || selectedYear" class="clear-btn" @click="clearFilters">
        清除筛选
      </button>
    </section>

    <div class="article-list">
      <RouterLink
        v-for="(post, index) in filteredPosts"
        :key="post.id"
        :to="`/articles/${post.id}`"
        class="article-item"
        :style="{ animationDelay: `${index * 0.05}s` }"
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

    <div v-if="filteredPosts.length === 0" class="empty-state">
      <span class="empty-icon">🔍</span>
      <p>没有找到匹配的文章</p>
      <button class="reset-btn" @click="clearFilters">重置筛选</button>
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
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
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

.filters {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-select {
  padding: 0.6rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.9rem;
  min-width: 140px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.clear-btn, .reset-btn {
  padding: 0.6rem 1rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover, .reset-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.article-item {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.article-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--shadow-color);
  border-color: var(--accent-color);
}

.article-cover {
  flex-shrink: 0;
  width: 160px;
  height: 100px;
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
  font-size: 1.2rem;
  font-weight: 600;
}

.article-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.reading-time {
  color: var(--text-secondary);
}

.article-desc {
  margin: 0 0 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.2rem 0.55rem;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  border-radius: 50px;
  font-size: 0.7rem;
  color: white;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 18px;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
  }

  .clear-btn {
    width: 100%;
  }

  .article-item {
    flex-direction: column;
  }

  .article-cover {
    width: 100%;
    height: 140px;
  }
}
</style>
