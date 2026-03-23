<script setup lang="ts">
import { onMounted } from 'vue'
import { siteConfig } from '../config'

onMounted(() => {
  document.title = `关于 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})
</script>

<template>
  <div class="about">
    <header class="page-header">
      <h1 class="page-title">关于</h1>
      <p class="page-desc">了解更多关于我的信息</p>
    </header>

    <div class="about-content">
      <div class="profile-section glass-card">
        <div class="avatar-container">
          <div class="avatar-glow"></div>
          <img :src="siteConfig.avatar" :alt="siteConfig.author" class="avatar" />
          <div class="avatar-sparkle">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <h2 class="author-name">{{ siteConfig.author }}</h2>
        <p class="author-desc">{{ siteConfig.description }}</p>
      </div>

      <section class="contact-section glass-card">
        <h3>联系方式</h3>
        <div class="contact-links">
          <a v-if="siteConfig.socialLinks?.github" :href="siteConfig.socialLinks.github" target="_blank" class="contact-link">
            <span class="link-icon">🐙</span>
            GitHub
          </a>
          <a v-if="siteConfig.socialLinks?.bilibili" :href="siteConfig.socialLinks.bilibili" target="_blank" class="contact-link bilibili">
            <span class="link-icon">📺</span>
            Bilibili
          </a>
          <a v-if="siteConfig.socialLinks?.email" :href="`mailto:${siteConfig.socialLinks.email}`" class="contact-link">
            <span class="link-icon">✉️</span>
            Email
          </a>
        </div>
      </section>

      <section class="project-section glass-card">
        <h3>关于本站</h3>
        <p class="project-desc">
          本站点由 <strong>AoiSpace / 碧蓝空间</strong> 强力驱动 —— 一个优雅的二次元风格静态博客框架，基于 Vue 3 + TypeScript + Vite 构建。
        </p>
        <p class="project-desc">
          特性包括：磨砂玻璃美学、响应式设计、亮暗主题切换、文章搜索与筛选、瀑布流布局等。
        </p>
        <div class="project-links">
          <a href="https://github.com/JodexCode/AoiSpace" target="_blank" class="project-link">
            <span class="link-icon">🐙</span>
            访问项目
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  box-shadow: 0 8px 32px var(--shadow-color);
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.profile-section {
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 24px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.avatar-glow {
  position: absolute;
  inset: -15px;
  background: var(--accent-gradient);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.4;
  z-index: 0;
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar:hover {
  transform: scale(1.08) rotate(3deg);
}

.avatar-sparkle {
  position: absolute;
  inset: -10px;
  z-index: 2;
  pointer-events: none;
}

.avatar-sparkle span {
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: sparkle 2s ease-in-out infinite;
}

.avatar-sparkle span:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
.avatar-sparkle span:nth-child(2) { top: 50%; right: 0; animation-delay: 0.5s; }
.avatar-sparkle span:nth-child(3) { bottom: 0; left: 50%; animation-delay: 1s; }
.avatar-sparkle span:nth-child(4) { top: 50%; left: 0; animation-delay: 1.5s; }

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

.author-name {
  font-size: 1.6rem;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
  font-weight: 700;
}

.author-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
  line-height: 1.7;
}

.contact-section {
  padding: 2rem;
  border-radius: 20px;
}

.contact-section h3 {
  margin: 0 0 1.25rem;
  color: var(--text-primary);
  font-size: 1.2rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--accent-gradient);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px var(--shadow-color);
}

.contact-link.bilibili {
  background: linear-gradient(135deg, #fb7299, #ffa8c5);
}

.contact-link.bilibili:hover {
  box-shadow: 0 8px 24px rgba(251, 114, 153, 0.4);
}

.link-icon {
  font-size: 1.1rem;
}

.project-section {
  padding: 2rem;
  border-radius: 20px;
}

.project-section h3 {
  margin: 0 0 1.25rem;
  color: var(--text-primary);
  font-size: 1.2rem;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 1rem;
}

.project-desc:last-of-type {
  margin-bottom: 1.5rem;
}

.project-desc strong {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-link:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--shadow-color);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .profile-section {
    padding: 2rem 1.5rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .author-name {
    font-size: 1.4rem;
  }

  .contact-links {
    flex-direction: column;
  }

  .contact-link {
    justify-content: center;
  }

  .project-links {
    flex-direction: column;
  }

  .project-link {
    justify-content: center;
  }
}

@media (min-width: 1440px) {
  .page-title {
    font-size: 3rem;
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .about-content {
    max-width: 700px;
    gap: 2rem;
  }

  .profile-section {
    padding: 3.5rem 3rem;
    border-radius: 28px;
  }

  .avatar {
    width: 140px;
    height: 140px;
  }

  .author-name {
    font-size: 1.9rem;
  }

  .author-desc {
    font-size: 1.1rem;
  }

  .contact-section {
    padding: 2.5rem;
    border-radius: 24px;
  }

  .contact-section h3 {
    font-size: 1.35rem;
    margin-bottom: 1.5rem;
  }

  .contact-link {
    padding: 0.9rem 1.75rem;
    font-size: 1.05rem;
  }

  .project-section {
    padding: 2.5rem;
    border-radius: 24px;
  }

  .project-section h3 {
    font-size: 1.35rem;
    margin-bottom: 1.5rem;
  }

  .project-desc {
    font-size: 1rem;
  }

  .project-link {
    padding: 0.9rem 1.75rem;
    font-size: 1.05rem;
  }
}
</style>
