<script setup lang="ts">
import { onMounted } from 'vue'
import { projects, siteConfig } from '../config'

onMounted(() => {
  document.title = `作品 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})

function getRandomDelay(index: number): string {
  return `${(index % 5) * 0.1}s`
}
</script>

<template>
  <div class="projects">
    <header class="page-header">
      <h1 class="page-title">作品</h1>
      <p class="page-desc">一些有趣的项目</p>
    </header>

    <div class="project-grid">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card glass-card"
        :style="{ animationDelay: getRandomDelay(index) }"
      >
        <div class="card-cover">
          <img :src="project.image" :alt="project.title" />
          <div class="cover-overlay"></div>
        </div>
        <div class="card-body">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag hand-drawn-tag">{{ tag }}</span>
          </div>
          <div class="project-links">
            <a
              v-if="project.previewUrl"
              :href="project.previewUrl"
              target="_blank"
              class="link-btn preview-btn"
            >
              <span class="btn-icon">🚀</span>
              预览
            </a>
            <a
              v-if="project.sourceUrl"
              :href="project.sourceUrl"
              target="_blank"
              class="link-btn source-btn"
            >
              <span class="btn-icon">📂</span>
              源码
            </a>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
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

.glass-card {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  box-shadow: 0 8px 32px var(--shadow-color);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
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

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px var(--shadow-color);
  border-color: var(--accent-color);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.project-card:hover .card-glow {
  opacity: 0.05;
}

.card-cover {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .card-cover img {
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

.project-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  transition: all 0.3s ease;
}

.project-card:hover .project-title {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: brightness(1.1);
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.hand-drawn-tag {
  position: relative;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border: 1px solid var(--gradient-start);
  border-radius: 50px;
  font-size: 0.75rem;
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

.project-links {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.preview-btn {
  background: var(--accent-gradient);
  color: white;
  flex: 1;
  justify-content: center;
}

.preview-btn::before {
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

.preview-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 24px var(--glow-color);
}

.preview-btn:hover::before {
  transform: translateX(100%);
}

.preview-btn:hover .btn-icon {
  animation: bounce 0.6s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.source-btn {
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.source-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.source-btn:hover {
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--glow-color);
}

.source-btn:hover::before {
  opacity: 1;
}

.source-btn:hover .btn-icon {
  animation: rotate 0.6s ease;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.btn-icon {
  font-size: 1rem;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.link-btn span:last-child {
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease;
}

.source-btn:hover span:last-child {
  opacity: 1 !important;
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-desc {
    font-size: 0.9rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .project-card {
    border-radius: 16px;
  }

  .card-cover {
    height: 160px;
  }

  .card-body {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.05rem;
  }

  .project-desc {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .project-tags {
    margin-bottom: 0.75rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.75rem;
  }

  .link-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 1440px) {
  .page-title {
    font-size: 3rem;
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .project-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }

  .project-card {
    border-radius: 24px;
  }

  .card-cover {
    height: 220px;
  }

  .card-body {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.25rem;
  }

  .project-desc {
    font-size: 0.95rem;
  }
}
</style>
