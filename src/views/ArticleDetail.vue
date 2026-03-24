<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../config'
import { getPost } from '../posts'

const route = useRoute()
const id = route.params.id as string
const post = getPost(id)

const tocVisible = ref(true)
const activeHeading = ref('')
const toc = ref<{ id: string; text: string; level: number }[]>([])
const tocTop = ref(6)

const meta = computed(() => {
  if (!post) return {}
  return {
    title: (post as any).title || id,
    date: (post as any).date || '',
    updated: (post as any).updated,
    tags: (post as any).tags || [],
    description: (post as any).description || '',
    cover: (post as any).cover,
    readingTime: (post as any).readingTime,
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
  })
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

function addCopyButtons() {
  nextTick(() => {
    const wrappers = document.querySelectorAll('.code-block-wrapper')
    wrappers.forEach(wrapper => {
      if (wrapper.querySelector('.mac-window-buttons')) return

      const macButtons = document.createElement('div')
      macButtons.className = 'mac-window-buttons'
      macButtons.innerHTML = `
        <span class="mac-btn red"></span>
        <span class="mac-btn yellow"></span>
        <span class="mac-btn green"></span>
      `
      wrapper.appendChild(macButtons)

      const codeEl = wrapper.querySelector('pre code')
      if (!codeEl) return

      const codeText = codeEl.textContent || ''

      const btn = document.createElement('button')
      btn.className = 'code-copy-btn'
      btn.innerHTML = '📋'
      btn.title = '复制代码'

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          btn.innerHTML = '✓'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.innerHTML = '📋'
            btn.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('复制失败:', err)
        }
      })

      wrapper.appendChild(btn)
    })
  })
}

function handleScroll() {
  if (!tocVisible.value || toc.value.length === 0) return

  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  const tocElement = document.querySelector('.toc-wrapper') as HTMLElement
  if (!tocElement) return

  const tocHeight = tocElement.offsetHeight || 450
  const initialTopPx = 96
  const maxTop = windowHeight - tocHeight - 32
  const scrollableHeight = documentHeight - windowHeight

  if (maxTop <= initialTopPx || scrollableHeight <= 0) {
    tocTop.value = Math.min(maxTop, initialTopPx) / 16
    return
  }

  const scrollProgress = scrollTop / scrollableHeight
  const scaleFactor = Math.min(scrollableHeight / windowHeight, 3)
  const movement = scrollProgress * (maxTop - initialTopPx) * scaleFactor
  const targetTopPx = initialTopPx + movement

  tocTop.value = Math.min(targetTopPx, maxTop) / 16
}

onMounted(() => {
  const title = meta.value?.title || id
  document.title = `${title} - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
  setTimeout(() => {
    extractToc()
    addCopyButtons()
  }, 200)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.params.id,
  () => {
    setTimeout(() => {
      extractToc()
      addCopyButtons()
    }, 200)
  },
)

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
    <article
      class="article-detail"
      :class="{ 'with-toc': tocVisible && toc.length > 0 }"
    >
      <div v-if="meta.cover" class="article-cover glass-card">
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
          <span
            v-for="tag in meta.tags"
            :key="tag"
            class="tag hand-drawn-tag"
            >{{ tag }}</span
          >
        </div>
      </header>

      <div v-if="meta.description" class="article-description glass-card">
        <p>{{ meta.description }}</p>
      </div>

      <div class="article-content markdown-body glass-card">
        <component :is="post?.default" />
      </div>
    </article>
    <Teleport to="body">
      <aside
        v-if="toc.length > 0"
        class="toc-wrapper"
        :style="{ top: `${tocTop}rem` }"
      >
        <button
          class="toc-toggle glass-card"
          @click="toggleToc"
          :title="tocVisible ? '隐藏目录' : '显示目录'"
        >
          <span class="toggle-icon">{{ tocVisible ? '◀' : '▶' }}</span>
        </button>
        <div class="article-toc glass-card" :class="{ collapsed: !tocVisible }">
          <div class="toc-content">
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
        </div>
      </aside>
    </Teleport>
  </div>
</template>

<style scoped>
.article-layout {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  box-shadow: 0 8px 32px var(--shadow-color);
}

.article-detail {
  flex: 1;
  min-width: 0;
  transition: margin-right 0.3s ease;
}

.article-detail.with-toc {
  margin-right: 260px;
}

.article-cover {
  margin-bottom: 2rem;
  border-radius: 20px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
}

.article-header {
  margin-bottom: 1.5rem;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
  line-height: 1.3;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  gap: 0.4rem;
}

.hand-drawn-tag {
  position: relative;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(
    135deg,
    var(--gradient-start),
    var(--gradient-end)
  );
  border: 1px solid var(--gradient-start);
  border-radius: 50px;
  font-size: 0.8rem;
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

.article-description {
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  border-left: 4px solid var(--accent-color);
  margin-bottom: 2rem;
}

.article-description p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.article-content {
  padding: 2rem;
  border-radius: 20px;
  line-height: 1.8;
  color: var(--text-primary);
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  position: relative;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-content :deep(h1)::before,
.article-content :deep(h2)::before,
.article-content :deep(h3)::before,
.article-content :deep(h4)::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 4px;
  height: 80%;
  background: var(--accent-gradient);
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.article-content :deep(h1):hover,
.article-content :deep(h2):hover,
.article-content :deep(h3):hover,
.article-content :deep(h4):hover {
  transform: translateX(0.5rem);
  text-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
}

.article-content :deep(h1):hover::before,
.article-content :deep(h2):hover::before,
.article-content :deep(h3):hover::before,
.article-content :deep(h4):hover::before {
  transform: translateY(-50%) scaleY(1);
}

.article-content :deep(h1)::after,
.article-content :deep(h2)::after,
.article-content :deep(h3)::after,
.article-content :deep(h4)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-gradient);
  border-radius: 1px;
  transition: width 0.4s ease;
}

.article-content :deep(h1):hover::after,
.article-content :deep(h2):hover::after,
.article-content :deep(h3):hover::after,
.article-content :deep(h4):hover::after {
  width: 100%;
}

.article-content :deep(h1) {
  font-size: 1.8rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-content :deep(h1):hover {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: brightness(1.2);
}

.article-content :deep(h2) {
  font-size: 1.4rem;
  color: var(--heading-h2);
}

.article-content :deep(h2):hover {
  color: var(--heading-h1);
}

.article-content :deep(h3) {
  font-size: 1.15rem;
  color: var(--heading-h3);
}

.article-content :deep(h3):hover {
  color: var(--heading-h2);
}

.article-content :deep(h4) {
  font-size: 1rem;
  color: var(--heading-h4);
}

.article-content :deep(h4):hover {
  color: var(--heading-h3);
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

.article-content :deep(.code-block-wrapper) {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}

.article-content :deep(.code-block-wrapper::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.15),
    rgba(236, 72, 153, 0.1)
  );
  border-bottom: 1px solid var(--card-border);
  z-index: 1;
}

.article-content :deep(.mac-window-buttons) {
  position: absolute;
  top: 12px;
  left: 14px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.article-content :deep(.mac-btn) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.article-content :deep(.mac-btn.red) {
  background: linear-gradient(135deg, #ff5f56, #ff2d2d);
  box-shadow: 0 0 8px rgba(255, 95, 86, 0.4);
}

.article-content :deep(.mac-btn.yellow) {
  background: linear-gradient(135deg, #ffbd2e, #ffb800);
  box-shadow: 0 0 8px rgba(255, 189, 46, 0.4);
}

.article-content :deep(.mac-btn.green) {
  background: linear-gradient(135deg, #27c93f, #1aab29);
  box-shadow: 0 0 8px rgba(39, 201, 63, 0.4);
}

.article-content :deep(.code-block-wrapper)::after {
  content: attr(data-language);
  position: absolute;
  top: 6px;
  right: 50px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 0.6rem;
  background: var(--accent-gradient);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.article-content :deep(.code-block-wrapper pre.hljs) {
  margin: 0;
  padding: 1rem;
  padding-top: 3rem;
  background: var(--code-bg) !important;
  overflow-x: auto;
}

.article-content :deep(.code-block-wrapper code) {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
}

.article-content :deep(.code-copy-btn) {
  position: absolute;
  top: 6px;
  right: 15px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gradient);
  border-radius: 6px;
  cursor: pointer;
  opacity: 1;
  transition: all 0.2s ease;
  z-index: 2;
  color: var(--text-secondary);
  font-size: 0.8rem;
  border: none;
}

.article-content :deep(.code-copy-btn:hover) {
  color: white;
  border-color: transparent;
  transform: scale(1.05);
}

.article-content :deep(.code-copy-btn.copied) {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-color: transparent;
}

.article-content :deep(.code-block-wrapper:hover .code-copy-btn) {
  opacity: 1;
}

.article-content :deep(.code-copy-btn:hover) {
  background: var(--accent-gradient);
  color: white;
  border-color: transparent;
  transform: scale(1.05);
}

.article-content :deep(.code-copy-btn.copied) {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-color: transparent;
}

.article-content :deep(pre) {
  border-radius: 0;
  overflow-x: auto;
  margin: 0;
}

.article-content :deep(pre code) {
  padding: 0;
  background: none;
  font-size: 0.9rem;
  line-height: 1.6;
}

.article-content :deep(.shiki) {
  background: transparent !important;
}

.article-content :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(img) {
  border-radius: 12px;
  margin: 1rem 0;
}

.toc-wrapper {
  position: fixed;
  right: 3rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: top 0.1s ease-out;
}

.toc-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  padding: 0;
}

.toc-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px var(--shadow-color);
}

.toggle-icon {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.toc-toggle:hover .toggle-icon {
  color: var(--accent-color);
}

.article-toc {
  width: 240px;
  height: fit-content;
  max-height: calc(100vh - 8rem);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 1;
}

.article-toc.collapsed {
  width: 0;
  height: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.toc-content {
  padding: 1rem;
  overflow-y: auto;
  max-height: 450px;
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
  padding: 0.4rem 0;
  transition: all 0.2s;
  line-height: 1.4;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.toc-item:hover {
  color: var(--accent-color);
  border-left-color: var(--accent-color);
}

.toc-item.active {
  color: var(--accent-color);
  font-weight: 500;
  border-left-color: var(--accent-color);
}

.toc-item.level-1 {
  font-weight: 500;
  color: var(--text-primary);
}

.toc-item.level-2 {
  padding-left: 1rem;
}

.toc-item.level-3 {
  padding-left: 1.5rem;
  font-size: 0.8rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  overflow-wrap: break-word;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.article-content :deep(li::marker) {
  color: var(--accent-color);
}

.article-content :deep(ul) {
  list-style-type: disc;
}

.article-content :deep(ol) {
  list-style-type: decimal;
}

.article-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid var(--accent-color);
  background: var(--hover-bg);
  border-radius: 0 12px 12px 0;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .article-layout {
    flex-direction: column;
  }

  .article-detail.with-toc {
    margin-right: 0;
  }

  .toc-wrapper {
    display: none;
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .article-cover {
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .article-cover img {
    max-height: 200px;
  }

  .article-info {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .info-item {
    font-size: 0.8rem;
  }

  .article-tags {
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .hand-drawn-tag {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }

  .article-description {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .article-content {
    padding: 1rem;
    border-radius: 12px;
    font-size: 0.95rem;
  }

  .article-content :deep(h1) {
    font-size: 1.4rem;
  }

  .article-content :deep(h2) {
    font-size: 1.2rem;
  }

  .article-content :deep(h3) {
    font-size: 1.05rem;
  }

  .article-content :deep(p) {
    line-height: 1.7;
  }

  .article-content :deep(pre) {
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.8rem;
  }

  .article-content :deep(code) {
    font-size: 0.85em;
  }

  .article-content :deep(.code-block-wrapper) {
    border-radius: 8px;
    margin: 1rem -0.5rem;
  }

  .article-content :deep(.code-block-wrapper::before),
  .article-content :deep(.code-block-wrapper::after) {
    display: none;
  }

  .article-content :deep(.mac-window-buttons) {
    top: 8px;
    left: 8px;
  }

  .article-content :deep(.mac-btn) {
    width: 10px;
    height: 10px;
  }

  .article-content :deep(.code-block-wrapper pre.hljs) {
    padding: 0.75rem;
    padding-top: 2rem;
    font-size: 0.8rem;
  }

  .article-content :deep(.code-copy-btn) {
    display: none;
  }

  .article-content :deep(blockquote) {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .article-content :deep(img) {
    border-radius: 8px;
    margin: 0.75rem 0;
  }

  .article-content :deep(ul),
  .article-content :deep(ol) {
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .article-content :deep(li) {
    margin-bottom: 0.35rem;
    font-size: 0.9rem;
  }
}
</style>
