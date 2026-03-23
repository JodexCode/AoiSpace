<script setup lang="ts">
import { projects } from '../config'
</script>

<template>
  <div class="projects">
    <header class="page-header">
      <h1 class="page-title">作品</h1>
      <p class="page-desc">一些有趣的项目</p>
    </header>

    <div class="project-grid">
      <a
        v-for="(project, index) in projects"
        :key="project.id"
        :href="project.link"
        target="_blank"
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
        </div>
      </a>
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

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>