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

const introModules = import.meta.glob('../intro/*.md', {
  eager: true
}) as Record<string, { default?: unknown }>
const intro = introModules['../intro/intro.md']?.default
</script>

<template>
  <div class="home">
    <section class="hero glass-card">
      <div class="hero-decoration">
        <span class="deco deco-1"></span>
        <span class="deco deco-2"></span>
        <span class="deco deco-3"></span>
      </div>
      <div class="hero-content">
        <h1 class="title">欢迎来到 {{ siteConfig.title }}</h1>
        <p class="subtitle">{{ siteConfig.description }}</p>
        <div class="hero-badges">
          <span class="badge">✨ 二次元</span>
          <span class="badge">🚀 技术</span>
          <span class="badge">💖 热爱</span>
        </div>
      </div>
    </section>

    <section class="stats">
      <RouterLink to="/articles" class="stat-card glass-card">
        <span class="stat-icon">📝</span>
        <span class="stat-number">{{ postCount }}</span>
        <span class="stat-label">文章</span>
        <div class="stat-glow"></div>
      </RouterLink>
      <RouterLink to="/projects" class="stat-card glass-card">
        <span class="stat-icon">🎨</span>
        <span class="stat-number">{{ projectCount }}</span>
        <span class="stat-label">作品</span>
        <div class="stat-glow"></div>
      </RouterLink>
      <RouterLink to="/about" class="stat-card glass-card">
        <span class="stat-icon">👤</span>
        <span class="stat-number">?</span>
        <span class="stat-label">关于</span>
        <div class="stat-glow"></div>
      </RouterLink>
    </section>

    <section class="about-section">
      <h2 class="section-title">
        <span class="title-icon">💫</span>
        关于我
      </h2>
      <div v-if="intro" class="about-card glass-card">
        <component :is="intro" />
      </div>
      <div v-else class="about-card glass-card empty">
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
        <RouterLink to="/articles" class="link-card glass-card">
          <span class="link-icon">📚</span>
          <div class="link-info">
            <h3>浏览文章</h3>
            <p>探索技术文章和教程</p>
          </div>
          <span class="link-arrow">→</span>
          <div class="card-glow"></div>
        </RouterLink>
        <RouterLink to="/projects" class="link-card glass-card">
          <span class="link-icon">🎯</span>
          <div class="link-info">
            <h3>看看作品</h3>
            <p>了解我的开源项目</p>
          </div>
          <span class="link-arrow">→</span>
          <div class="card-glow"></div>
        </RouterLink>
        <RouterLink to="/about" class="link-card glass-card">
          <span class="link-icon">🤝</span>
          <div class="link-info">
            <h3>联系我</h3>
            <p>获取联系方式</p>
          </div>
          <span class="link-arrow">→</span>
          <div class="card-glow"></div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  box-shadow: 0 8px 32px var(--shadow-color);
}

.hero {
  position: relative;
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 24px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco {
  position: absolute;
  border-radius: 50%;
  background: var(--accent-gradient);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.deco-1 {
  width: 200px;
  height: 200px;
  top: -80px;
  left: -60px;
  animation-delay: 0s;
}
.deco-2 {
  width: 150px;
  height: 150px;
  top: 20%;
  right: -40px;
  animation-delay: 1s;
}
.deco-3 {
  width: 120px;
  height: 120px;
  bottom: -40px;
  left: 40%;
  animation-delay: 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 1.5rem;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1.25rem;
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--text-primary);
  box-shadow: 2px 2px 8px var(--shadow-color);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.badge:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    4px 4px 20px var(--shadow-color),
    0 0 30px var(--glow-color);
  border-color: var(--accent-color);
}

.badge:hover::before {
  transform: translateX(100%);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-color);
  box-shadow: 0 16px 48px var(--shadow-color);
}

.stat-card:hover .stat-icon {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 0 10px var(--accent-color));
}

.stat-glow {
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.stat-card:hover .stat-glow {
  opacity: 0.08;
}

.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-number {
  filter: brightness(1.2);
  text-shadow: 0 0 30px var(--glow-color);
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
  border-radius: 20px;
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.link-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--accent-gradient);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: translateX(8px);
  border-color: var(--accent-color);
  box-shadow: 0 8px 32px var(--shadow-color);
}

.link-card:hover::before {
  transform: scaleY(1);
}

.link-card:hover .link-arrow {
  transform: translateX(8px) scale(1.2);
  color: var(--accent-color);
}

.link-card:hover .card-glow {
  opacity: 0.05;
}

.link-card:hover .link-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px var(--accent-color));
}

.card-glow {
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.link-icon {
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.link-info {
  flex: 1;
}

.link-info h3 {
  font-size: 1.05rem;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
  transition: color 0.3s ease;
}

.link-card:hover .link-info h3 {
  color: var(--accent-color);
}

.link-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

.link-arrow {
  font-size: 1.2rem;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .title {
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .hero {
    padding: 2rem 1.25rem;
  }

  .hero-decoration {
    display: none;
  }

  .badge {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-card {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
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
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }

  .stats {
    gap: 1.5rem;
  }

  .stat-card {
    padding: 2rem;
    border-radius: 24px;
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
</style>
