<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { siteConfig } from '../config'
import { posts, type PostWithContent } from '../posts'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  document.title = `文章 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})

const selectedTag = ref('')
const selectedYear = ref('')
const tagDropdownOpen = ref(false)
const yearDropdownOpen = ref(false)
const searchQuery = ref('')
const searchInputFocused = ref(false)

const searchResults = ref<PostWithContent[]>([])
const showSearchResults = ref(false)

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
  let result = posts

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.rawContent && post.rawContent.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query))
    )
  }

  return result.filter(post => {
    const matchTag = !selectedTag.value || post.tags?.includes(selectedTag.value)
    const matchYear = !selectedYear.value || (post.date && new Date(post.date).getFullYear().toString() === selectedYear.value)
    return matchTag && matchYear
  })
})

const selectedTagLabel = computed(() => selectedTag.value || '全部标签')
const selectedYearLabel = computed(() => selectedYear.value ? `${selectedYear.value} 年` : '全部时间')

function handleSearch() {
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    searchResults.value = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.rawContent && post.rawContent.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query))
    )
    showSearchResults.value = true
  } else {
    searchResults.value = []
    showSearchResults.value = false
  }
}

function goToArticle(id: string) {
  router.push(`/articles/${id}`)
  searchQuery.value = ''
  showSearchResults.value = false
  searchInputFocused.value = false
}

function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

function getMatchContext(post: PostWithContent, query: string): string {
  const content = post.rawContent || post.description || ''
  const lowerContent = content.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerContent.indexOf(lowerQuery)
  
  if (index === -1) return post.description || ''
  
  const start = Math.max(0, index - 30)
  const end = Math.min(content.length, index + query.length + 50)
  let context = content.slice(start, end)
  
  if (start > 0) context = '...' + context
  if (end < content.length) context = context + '...'
  
  return context
}

function toggleTagDropdown() {
  tagDropdownOpen.value = !tagDropdownOpen.value
  yearDropdownOpen.value = false
}

function toggleYearDropdown() {
  yearDropdownOpen.value = !yearDropdownOpen.value
  tagDropdownOpen.value = false
}

function selectTag(tag: string) {
  selectedTag.value = tag
  tagDropdownOpen.value = false
}

function selectYear(year: string) {
  selectedYear.value = year
  yearDropdownOpen.value = false
}

function clearFilters() {
  selectedTag.value = ''
  selectedYear.value = ''
}

function closeDropdowns(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.custom-dropdown')) {
    tagDropdownOpen.value = false
    yearDropdownOpen.value = false
  }
}

function closeSearchResults(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.search-container')) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
  document.addEventListener('click', closeSearchResults)
})

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getRandomDelay(index: number): string {
  return `${(index % 5) * 0.1}s`
}
</script>

<template>
  <div class="articles">
    <header class="page-header">
      <h1 class="page-title">文章</h1>
      <p class="page-desc">
        <template v-if="searchQuery">
          搜索到 {{ filteredPosts.length }} 篇相关文章（共 {{ posts.length }} 篇）
        </template>
        <template v-else>
          共 {{ filteredPosts.length }} 篇文章
        </template>
      </p>
    </header>

    <section class="filters">
      <div class="search-container" :class="{ focused: searchInputFocused }">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索文章..."
          @focus="searchInputFocused = true; handleSearch()"
          @input="handleSearch"
        />
        <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''; showSearchResults = false">
          ✕
        </button>
        <div v-if="showSearchResults && searchResults.length > 0" class="search-results">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="search-result-item"
            @click="goToArticle(result.id)"
          >
            <h4 class="result-title" v-html="highlightMatch(result.title, searchQuery)"></h4>
            <p class="result-context" v-html="highlightMatch(getMatchContext(result, searchQuery), searchQuery)"></p>
          </div>
        </div>
        <div v-if="showSearchResults && searchResults.length === 0 && searchQuery" class="search-results empty">
          <p>没有找到匹配的文章</p>
        </div>
      </div>

      <div class="filter-buttons">
        <div class="custom-dropdown" :class="{ open: tagDropdownOpen }">
          <button class="dropdown-trigger glass-btn" @click.stop="toggleTagDropdown">
            <span class="trigger-icon">🏷️</span>
            <span class="trigger-text">{{ selectedTagLabel }}</span>
            <span class="trigger-arrow">▼</span>
          </button>
          <div v-if="tagDropdownOpen" class="dropdown-menu">
            <button class="dropdown-item" :class="{ active: !selectedTag }" @click="selectTag('')">
              全部标签
            </button>
            <button v-for="tag in allTags" :key="tag" class="dropdown-item" :class="{ active: selectedTag === tag }" @click="selectTag(tag)">
              {{ tag }}
            </button>
          </div>
        </div>

        <div class="custom-dropdown" :class="{ open: yearDropdownOpen }">
          <button class="dropdown-trigger glass-btn" @click.stop="toggleYearDropdown">
            <span class="trigger-icon">📅</span>
            <span class="trigger-text">{{ selectedYearLabel }}</span>
            <span class="trigger-arrow">▼</span>
          </button>
          <div v-if="yearDropdownOpen" class="dropdown-menu">
            <button class="dropdown-item" :class="{ active: !selectedYear }" @click="selectYear('')">
              全部时间
            </button>
            <button v-for="year in allYears" :key="year" class="dropdown-item" :class="{ active: selectedYear === year }" @click="selectYear(year)">
              {{ year }} 年
            </button>
          </div>
        </div>

        <button v-if="selectedTag || selectedYear || searchQuery" class="clear-btn" @click="clearFilters(); searchQuery = ''">
          ✕
        </button>
      </div>
    </section>

    <div class="article-masonry">
      <RouterLink
        v-for="(post, index) in filteredPosts"
        :key="post.id"
        :to="`/articles/${post.id}`"
        class="article-card"
        :style="{ animationDelay: getRandomDelay(index) }"
      >
        <div v-if="post.cover" class="card-cover">
          <img :src="post.cover" :alt="post.title" />
          <div class="cover-overlay"></div>
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ post.title }}</h2>
          <p v-if="post.description" class="card-desc">{{ post.description }}</p>
          <div class="card-meta">
            <span class="date">📅 {{ formatDate(post.date) }}</span>
            <span v-if="post.readingTime" class="reading-time">⏱️ {{ post.readingTime }} 分钟</span>
          </div>
          <div v-if="post.tags?.length" class="card-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag hand-drawn-tag">{{ tag }}</span>
          </div>
        </div>
        <div class="card-glow"></div>
      </RouterLink>
    </div>

    <div v-if="filteredPosts.length === 0" class="empty-state">
      <span class="empty-icon">🔍</span>
      <p>没有找到匹配的文章</p>
      <button class="reset-btn" @click="clearFilters(); searchQuery = ''">重置筛选</button>
    </div>
  </div>
</template>

<style scoped>
.articles {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
}

.glass-btn {
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: var(--bg-glass-hover);
}

.search-container {
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  transition: all 0.3s ease;
}

.search-container.focused {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15), 0 0 20px rgba(139, 92, 246, 0.2);
}

.search-icon {
  font-size: 1rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.search-container.focused .search-icon {
  opacity: 1;
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px var(--accent-color));
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.1); }
  50% { transform: scale(1.2); }
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--border-color);
  border: none;
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}

.search-clear:hover {
  background: var(--accent-color);
  color: white;
  transform: rotate(90deg) scale(1.1);
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 14px;
  box-shadow: 0 8px 32px var(--shadow-color);
  z-index: 100;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.search-results.empty {
  padding: 1.5rem;
  text-align: center;
}

.search-results.empty p {
  color: var(--text-secondary);
  margin: 0;
}

.search-result-item {
  padding: 0.85rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.search-result-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: var(--accent-gradient);
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: var(--hover-bg);
  padding-left: 1.2rem;
}

.search-result-item:hover::before {
  transform: scaleY(1);
}

.result-title {
  margin: 0 0 0.3rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.search-result-item:hover .result-title {
  color: var(--accent-color);
}

.result-context {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
}

.search-results :deep(mark) {
  background: rgba(139, 92, 246, 0.3);
  color: var(--accent-color);
  padding: 0 2px;
  border-radius: 2px;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.custom-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
}

.dropdown-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--shadow-color);
}

.dropdown-trigger:hover .trigger-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 6px var(--accent-color));
}

.trigger-icon {
  font-size: 1rem;
  transition: all 0.3s ease;
}

.trigger-text {
  flex: 1;
  text-align: left;
}

.trigger-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-dropdown.open .dropdown-trigger {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15), 0 4px 16px var(--shadow-color);
}

.custom-dropdown.open .trigger-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--shadow-color);
  z-index: 100;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease-out;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.7rem 1rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.dropdown-item:hover {
  background: var(--hover-bg);
}

.dropdown-item.active {
  background: var(--accent-gradient);
  color: white;
}

.clear-btn {
  padding: 0.6rem 1rem;
  background: var(--accent-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.clear-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

.clear-btn:hover::before {
  transform: translateX(100%);
}

.article-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.article-card {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardAppear 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes cardAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px var(--shadow-color);
  border-color: var(--accent-color);
}

.article-card:nth-child(3n+1) { animation-delay: 0s; }
.article-card:nth-child(3n+2) { animation-delay: 0.1s; }
.article-card:nth-child(3n) { animation-delay: 0.2s; }

.card-glow {
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.article-card:hover .card-glow {
  opacity: 0.05;
}

.card-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.article-card:hover .card-cover img {
  transform: scale(1.1);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, var(--card-bg) 100%);
}

.card-body {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.article-card:hover .card-title {
  color: var(--accent-color);
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed var(--border-color);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.hand-drawn-tag {
  position: relative;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  font-size: 0.72rem;
  color: var(--accent-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.hand-drawn-tag:hover {
  background: var(--accent-gradient);
  color: white;
  border-color: transparent;
  transform: translate(-2px, -2px);
  box-shadow: 3px 3px 0 var(--accent-color);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  border-radius: 20px;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: var(--accent-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--shadow-color);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .filters {
    flex-direction: column;
  }

  .search-container {
    width: 100%;
    min-width: unset;
  }

  .filter-buttons {
    width: 100%;
  }

  .custom-dropdown {
    flex: 1;
  }

  .dropdown-trigger {
    width: 100%;
    justify-content: center;
  }

  .dropdown-menu {
    width: 100%;
  }

  .article-masonry {
    grid-template-columns: 1fr;
  }

  .card-cover {
    height: 180px;
  }
}

@media (min-width: 1440px) {
  .page-title {
    font-size: 3rem;
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .filters {
    padding: 1.25rem 1.5rem;
    border-radius: 24px;
    margin-bottom: 2.5rem;
  }

  .article-masonry {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }

  .article-card {
    border-radius: 24px;
  }

  .card-cover {
    height: 180px;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }

  .card-desc {
    font-size: 0.9rem;
    margin-bottom: 0.9rem;
  }

  .card-meta {
    margin-bottom: 0.9rem;
    padding-bottom: 0.9rem;
  }

  .hand-drawn-tag {
    padding: 0.25rem 0.7rem;
    font-size: 0.75rem;
  }
}
</style>
