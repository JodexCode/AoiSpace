<script setup lang="ts">
import { onMounted } from 'vue'
import { siteConfig } from '../config'
import { getPostCount } from '../posts'
import { projects } from '../config'

onMounted(() => {
  document.title = `${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})

const postCount = getPostCount()
const projectCount = projects.length

const introModules = import.meta.glob('../intro/*.md', { eager: true }) as Record<string, { default?: unknown }>
const intro = introModules['../intro/intro.md']?.default
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="title">欢迎来到 {{ siteConfig.title }}</h1>
        <p class="subtitle">{{ siteConfig.description }}</p>
        <div class="hero-badges">
          <span class="badge">
            <span class="badge-icon">✨</span>
            二次元
          </span>
          <span class="badge">
            <span class="badge-icon">🚀</span>
            技术
          </span>
          <span class="badge">
            <span class="badge-icon">💖</span>
            热爱
          </span>
        </div>
      </div>
      <div class="hero-decoration">
        <span class="deco deco-1">✦</span>
        <span class="deco deco-2">✧</span>
        <span class="deco deco-3">✦</span>
      </div>
    </section>

    <section class="stats">
      <RouterLink to="/articles" class="stat-card">
        <span class="stat-icon">📝</span>
        <span class="stat-number">{{ postCount }}</span>
        <span class="stat-label">文章</span>
      </RouterLink>
      <RouterLink to="/projects" class="stat-card">
        <span class="stat-icon">🎨</span>
        <span class="stat-number">{{ projectCount }}</span>
        <span class="stat-label">作品</span>
      </RouterLink>
      <RouterLink to="/about" class="stat-card">
        <span class="stat-icon">👤</span>
        <span class="stat-number">?</span>
        <span class="stat-label">关于</span>
      </RouterLink>
    </section>

    <section class="about-section">
      <h2 class="section-title">
        <span class="title-icon">💫</span>
        关于我
      </h2>
      <div v-if="intro" class="about-card">
        <component :is="intro" />
      </div>
      <div v-else class="about-card empty">
        <p>暂无介绍</p>
        <RouterLink to="/about" class="add-link">添加介绍 →</RouterLink>
      </div>
    </section>

    <section class="quick-links">
      <h2 class="section-title">
        <span class="title-icon">🧭</span>
        快速导航
      </h2>
      <div class="links-grid">
        <RouterLink to="/articles" class="link-card">
          <span class="link-icon">📚</span>
          <div class="link-info">
            <h3>浏览文章</h3>
            <p>探索技术文章和教程</p>
          </div>
          <span class="link-arrow">→</span>
        </RouterLink>
        <RouterLink to="/projects" class="link-card">
          <span class="link-icon">🎯</span>
          <div class="link-info">
            <h3>看看作品</h3>
            <p>了解我的开源项目</p>
          </div>
          <span class="link-arrow">→</span>
        </RouterLink>
        <RouterLink to="/about" class="link-card">
          <span class="link-icon">🤝</span>
          <div class="link-info">
            <h3>联系我</h3>
            <p>获取联系方式</p>
          </div>
          <span class="link-arrow">→</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  animation: fadeIn 0.6s ease-out;
  max-width: 900px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  position: relative;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco {
  position: absolute;
  color: var(--accent-color);
  opacity: 0.2;
  animation: float 6s ease-in-out infinite;
}

.deco-1 { top: 10%; left: 10%; font-size: 2rem; }
.deco-2 { top: 20%; right: 15%; font-size: 1.5rem; animation-delay: 1s; }
.deco-3 { bottom: 15%; right: 10%; font-size: 1.8rem; animation-delay: 2s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary), #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.badge-icon {
  font-size: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px var(--shadow-color);
}

.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.title-icon {
  font-size: 1.2rem;
}

.about-section {
  margin-bottom: 1.5rem;
}

.about-card {
  padding: 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--shadow-color);
}

.about-card :deep(h2) {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.about-card :deep(p) {
  color: var(--text-secondary);
  line-height: 1.8;
}

.about-card.empty {
  text-align: center;
  padding: 2rem;
}

.about-card.empty p {
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.add-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
}

.add-link:hover {
  text-decoration: underline;
}

.quick-links {
  margin-bottom: 1.5rem;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: translateX(8px);
  border-color: var(--accent-color);
  box-shadow: 0 4px 16px var(--shadow-color);
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
}

.link-icon {
  font-size: 1.8rem;
}

.link-info {
  flex: 1;
}

.link-info h3 {
  font-size: 1.05rem;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
}

.link-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

.link-arrow {
  font-size: 1.2rem;
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.6rem;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .stat-card {
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
  }

  .stat-icon {
    margin-bottom: 0;
    font-size: 1.4rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .link-card {
    padding: 1rem;
  }

  .link-icon {
    font-size: 1.4rem;
  }

  .link-info h3 {
    font-size: 0.95rem;
  }
}

@media (min-width: 1440px) {
  .home {
    max-width: 1100px;
  }

  .hero {
    padding: 4rem 3rem;
    border-radius: 28px;
  }

  .title {
    font-size: 2.6rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .badge {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }

  .stats {
    gap: 1.5rem;
  }

  .stat-card {
    padding: 2rem;
  }

  .stat-icon {
    font-size: 2.2rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .about-card {
    padding: 2rem;
    border-radius: 24px;
  }

  .link-card {
    padding: 1.5rem 2rem;
    border-radius: 20px;
  }

  .link-icon {
    font-size: 2.2rem;
  }

  .link-info h3 {
    font-size: 1.2rem;
  }

  .link-info p {
    font-size: 0.95rem;
  }
}

@media (min-width: 1920px) {
  .home {
    max-width: 1300px;
  }

  .hero {
    padding: 5rem 4rem;
    border-radius: 32px;
  }

  .title {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.3rem;
  }

  .deco {
    font-size: 2.5rem;
  }

  .stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .stat-card {
    padding: 2.5rem;
    border-radius: 24px;
  }

  .stat-icon {
    font-size: 2.8rem;
  }

  .stat-number {
    font-size: 3rem;
  }

  .stat-label {
    font-size: 1.1rem;
  }

  .about-card {
    padding: 2.5rem;
    border-radius: 28px;
  }

  .about-card :deep(h2) {
    font-size: 1.5rem;
  }

  .about-card :deep(p) {
    font-size: 1.05rem;
  }

  .link-card {
    padding: 2rem 2.5rem;
    border-radius: 24px;
  }

  .link-icon {
    font-size: 2.8rem;
  }

  .link-info h3 {
    font-size: 1.4rem;
  }

  .link-info p {
    font-size: 1rem;
  }
}
</style>
