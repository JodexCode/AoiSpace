<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="title">{{ siteConfig.title }}</h1>
      <p class="subtitle">{{ siteConfig.description }}</p>
      <div class="hero-tags">
        <span class="tag">博客</span>
        <span class="tag">Vue</span>
        <span class="tag">技术</span>
      </div>
    </section>

    <section class="welcome-card">
      <h2>欢迎来到我的小窝!</h2>
      <p>这里是我的个人博客，记录着生活中的点点滴滴。喜欢探索新技术，分享有趣的内容。</p>
    </section>

    <section class="quick-links">
      <RouterLink to="/articles" class="quick-link">
        <span class="link-icon">📝</span>
        <span class="link-text">浏览文章</span>
        <span class="link-arrow">→</span>
      </RouterLink>
      <RouterLink to="/projects" class="quick-link">
        <span class="link-icon">🎨</span>
        <span class="link-text">看看作品</span>
        <span class="link-arrow">→</span>
      </RouterLink>
      <RouterLink to="/about" class="quick-link">
        <span class="link-icon">💫</span>
        <span class="link-text">关于我</span>
        <span class="link-arrow">→</span>
      </RouterLink>
    </section>

    <section class="stats">
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">可能</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">探索</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">热爱</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  text-align: center;
  padding: 2rem 0 3rem;
}

.title {
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.4rem 1rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.welcome-card {
  padding: 2rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px var(--shadow-color);
}

.welcome-card h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.welcome-card p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.quick-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-color);
  border-color: var(--accent-color);
}

.quick-link:hover .link-arrow {
  transform: translateX(4px);
}

.link-icon {
  font-size: 1.5rem;
}

.link-text {
  flex: 1;
  font-weight: 500;
}

.link-arrow {
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .stats {
    gap: 1.5rem;
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.8rem;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>