<script setup lang="ts">
import { onMounted } from 'vue'
import { projects, siteConfig } from '../config'

onMounted(() => {
  document.title = `作品 - ${siteConfig.author}的${siteConfig.title} - 由 AoiSpace / 碧蓝空间驱动`
})
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
        class="project-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="project-image-wrapper">
          <img :src="project.image" :alt="project.title" class="project-image" />
        </div>
        <div class="project-info">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
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

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px var(--shadow-color);
  border-color: var(--accent-color);
}

.project-image-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: var(--code-bg);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  font-weight: 600;
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
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.75rem;
  color: var(--accent-color);
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
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
  transition: all 0.2s;
}

.preview-btn {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  color: white;
}

.preview-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.source-btn {
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.source-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.btn-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-links {
    flex-direction: column;
  }

  .link-btn {
    justify-content: center;
  }
}

@media (min-width: 1440px) {
  .page-title {
    font-size: 3rem;
  }

  .page-desc {
    font-size: 1.1rem;
  }

  .page-header {
    margin-bottom: 3.5rem;
    padding-bottom: 2.5rem;
  }

  .project-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }

  .project-card {
    border-radius: 24px;
  }

  .project-image-wrapper {
    height: 220px;
  }

  .project-info {
    padding: 1.75rem;
  }

  .project-title {
    font-size: 1.35rem;
  }

  .project-desc {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }

  .tag {
    padding: 0.3rem 0.9rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 1920px) {
  .page-title {
    font-size: 3.5rem;
  }

  .page-desc {
    font-size: 1.2rem;
  }

  .page-header {
    margin-bottom: 4rem;
    padding-bottom: 3rem;
  }

  .project-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2.5rem;
  }

  .project-card {
    border-radius: 28px;
  }

  .project-image-wrapper {
    height: 260px;
  }

  .project-info {
    padding: 2rem;
  }

  .project-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .project-desc {
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  .project-tags {
    gap: 0.75rem;
  }

  .tag {
    padding: 0.35rem 1rem;
    font-size: 0.85rem;
  }
}
</style>