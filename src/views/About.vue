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
      <div class="profile-section">
        <div class="avatar-wrapper">
          <img :src="siteConfig.avatar" :alt="siteConfig.author" class="avatar" />
        </div>
        <h2 class="author-name">{{ siteConfig.author }}</h2>
        <p class="author-desc">{{ siteConfig.description }}</p>
      </div>

      <section class="contact-section">
        <h3>联系方式</h3>
        <div class="contact-links">
          <a v-if="siteConfig.socialLinks?.github" :href="siteConfig.socialLinks.github" target="_blank" class="contact-link">
            <span class="link-icon">🐙</span>
            GitHub
          </a>
          <a v-if="siteConfig.socialLinks?.email" :href="`mailto:${siteConfig.socialLinks.email}`" class="contact-link">
            <span class="link-icon">✉️</span>
            Email
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.profile-section {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  box-shadow: 0 8px 32px var(--shadow-color);
}

.avatar-wrapper {
  display: inline-block;
  margin-bottom: 1.5rem;
  position: relative;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-color);
  box-shadow: 0 8px 24px var(--shadow-color);
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
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
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
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
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

.link-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .profile-section {
    padding: 2rem 1.5rem;
  }

  .avatar {
    width: 120px;
    height: 120px;
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
}
</style>