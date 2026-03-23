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

function goToArticle(id: string, headingIndex?: number) {
  const query: Record<string, string> = {}
  if (searchQuery.value.trim() && headingIndex !== undefined && headingIndex >= 0) {
    query.q = searchQuery.value.trim()
    query.heading = headingIndex.toString()
  }
  router.push({ path: `/articles/${id}`, query })
  searchQuery.value = ''
  showSearchResults.value = false
  searchInputFocused.value = false
}

function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

function getMatchContext(post: PostWithContent, query: string): { text: string; headingIndex: number } {
  const content = post.rawContent || post.description || ''
  const lowerContent = content.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerContent.indexOf(lowerQuery)
  
  if (index === -1) return { text: post.description || '', headingIndex: -1 }
  
  let headingIndex = 0
  if (post.headings && post.headings.length > 0) {
    const headingPositions: { index: number; pos: number }[] = []
    
    for (const heading of post.headings) {
      const pos = content.toLowerCase().indexOf(heading.text.toLowerCase())
      if (pos >= 0) {
        headingPositions.push({ index: heading.index, pos })
      }
    }
    
    for (let i = headingPositions.length - 1; i >= 0; i--) {
      if (headingPositions[i].pos <= index) {
        headingIndex = headingPositions[i].index
        break
      }
    }
  }
  
  const start = Math.max(0, index - 30)
  const end = Math.min(content.length, index + query.length + 50)
  let context = content.slice(start, end)
  
  if (start > 0) context = '...' + context
  if (end < content.length) context = context + '...'
  
  return { text: context, headingIndex }
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
          共 {{ filteredPosts.length }} 篇文章{{ filteredPosts.length !== posts.length ? `（共 ${posts.length} 篇）` : '' }}
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
          placeholder="搜索文章标题或内容..."
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
            @click="goToArticle(result.id, getMatchContext(result, searchQuery).headingIndex)"
          >
            <h4 class="result-title" v-html="highlightMatch(result.title, searchQuery)"></h4>
            <p class="result-context" v-html="highlightMatch(getMatchContext(result, searchQuery).text, searchQuery)"></p>
          </div>
        </div>
        <div v-if="showSearchResults && searchResults.length === 0 && searchQuery" class="search-results empty">
          <p>没有找到匹配的文章</p>
        </div>
      </div>

      <div class="custom-dropdown" :class="{ open: tagDropdownOpen }">
        <button class="dropdown-trigger" @click.stop="toggleTagDropdown">
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
        <button class="dropdown-trigger" @click.stop="toggleYearDropdown">
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

      <button v-if="selectedTag || selectedYear" class="clear-btn" @click="clearFilters">
        ✕ 清除筛选
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
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.custom-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 130px;
}

.dropdown-trigger:hover {
  border-color: var(--accent-color);
}

.custom-dropdown.open .dropdown-trigger {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.trigger-icon {
  font-size: 1rem;
}

.trigger-text {
  flex: 1;
  text-align: left;
}

.trigger-arrow {
  font-size: 0.7rem;
  transition: transform 0.2s;
}

.custom-dropdown.open .trigger-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 8px 24px var(--shadow-color);
  z-index: 1000;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  background: var(--accent-color);
  color: white;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s;
}

.search-container.focused {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.search-icon {
  font-size: 1rem;
  opacity: 0.6;
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
  opacity: 0.6;
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
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 320px;
  overflow-y: auto;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 8px 24px var(--shadow-color);
  z-index: 1000;
  animation: dropdownFadeIn 0.2s ease-out;
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
  transition: background 0.15s;
  border-bottom: 1px solid var(--border-color);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: var(--hover-bg);
}

.result-title {
  margin: 0 0 0.3rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
}

.result-context {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
}

.search-results :deep(mark) {
  background: rgba(59, 130, 246, 0.3);
  color: var(--accent-color);
  padding: 0 2px;
  border-radius: 2px;
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

.reset-btn {
  padding: 0.6rem 1.25rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    width: 100%;
    min-width: unset;
  }

  .custom-dropdown {
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;
    justify-content: center;
  }

  .dropdown-menu {
    width: 100%;
  }

  .clear-btn {
    width: 100%;
    justify-content: center;
  }

  .search-results {
    max-height: 250px;
  }

  .article-item {
    flex-direction: column;
  }

  .article-cover {
    width: 100%;
    height: 140px;
  }
}

@media (min-width: 1440px) {
  .page-title {
    font-size: 3rem;
  }

  .page-desc {
    font-size: 1.1rem;
  }

  .filters {
    padding: 1.25rem 1.5rem;
    border-radius: 20px;
    gap: 1rem;
  }

  .dropdown-trigger {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    min-width: 150px;
  }

  .clear-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }

  .article-list {
    gap: 1.5rem;
  }

  .article-item {
    padding: 1.75rem;
    border-radius: 22px;
  }

  .article-cover {
    width: 200px;
    height: 130px;
    border-radius: 14px;
  }

  .article-title {
    font-size: 1.35rem;
  }

  .article-meta {
    font-size: 0.9rem;
    gap: 1rem;
  }

  .article-desc {
    font-size: 1rem;
    -webkit-line-clamp: 3;
  }

  .tag {
    padding: 0.25rem 0.7rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 1920px) {
  .page-title {
    font-size: 3.5rem;
  }

  .page-header {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .filters {
    padding: 1.5rem 2rem;
    border-radius: 24px;
    margin-bottom: 2rem;
  }

  .dropdown-trigger {
    padding: 0.85rem 1.5rem;
    font-size: 1.05rem;
    min-width: 170px;
  }

  .dropdown-menu {
    border-radius: 16px;
  }

  .dropdown-item {
    padding: 0.85rem 1.25rem;
    font-size: 1rem;
  }

  .article-list {
    gap: 2rem;
  }

  .article-item {
    padding: 2rem;
    border-radius: 26px;
  }

  .article-cover {
    width: 240px;
    height: 160px;
    border-radius: 16px;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    font-size: 0.95rem;
    gap: 1.25rem;
  }

  .article-desc {
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
  }

  .article-tags {
    gap: 0.6rem;
  }

  .tag {
    padding: 0.3rem 0.85rem;
    font-size: 0.85rem;
  }
}
</style>
