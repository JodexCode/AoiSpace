<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { siteConfig, navConfig } from '../config'
import { useTheme } from '../composables/useTheme'

const { mode, toggleTheme } = useTheme()
const route = useRoute()

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="layout">
    <div class="floating-decorations">
      <span class="dot dot-1"></span>
      <span class="dot dot-2"></span>
      <span class="dot dot-3"></span>
      <span class="dot dot-4"></span>
      <span class="shape shape-1"></span>
      <span class="shape shape-2"></span>
    </div>

    <aside class="sidebar">
      <div class="sidebar-bg"></div>
      <div class="sidebar-content">
        <div class="profile">
          <div class="avatar-wrapper">
            <img
              :src="siteConfig.avatar"
              :alt="siteConfig.author"
              class="avatar"
            />
            <div class="avatar-ring"></div>
          </div>
          <h1 class="author-name">{{ siteConfig.author }}</h1>
          <p class="description">{{ siteConfig.description }}</p>
        </div>

        <nav class="nav">
          <RouterLink
            v-for="item in navConfig.items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <span class="nav-text">{{ item.text }}</span>
          </RouterLink>
        </nav>

        <div class="theme-toggle-wrapper">
          <button class="theme-toggle" @click="toggleTheme">
            <span class="toggle-icon">{{
              mode === 'light' ? '🌙' : '☀️'
            }}</span>
          </button>
        </div>

        <footer class="footer">
          <p v-if="siteConfig.icp">{{ siteConfig.icp }}</p>
        </footer>
      </div>
    </aside>

    <main class="main-content">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.floating-decorations {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background: var(--accent-color);
  opacity: 0.15;
  animation: float 8s ease-in-out infinite;
}

.dot-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -50px;
  animation-delay: 0s;
}
.dot-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -50px;
  animation-delay: 2s;
}
.dot-3 {
  width: 150px;
  height: 150px;
  bottom: -50px;
  left: 30%;
  animation-delay: 4s;
}
.dot-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  left: 50%;
  animation-delay: 1s;
}

.shape {
  position: absolute;
  background: var(--accent-secondary);
  opacity: 0.1;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: 10%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  animation: rotate 20s linear infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 5%;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  animation: rotate 15s linear infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sidebar {
  width: 32%;
  min-width: 340px;
  position: fixed;
  height: 100vh;
  z-index: 10;
}

.sidebar-bg {
  position: absolute;
  inset: 20px;
  background: var(--bg-secondary);
  backdrop-filter: blur(24px);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow:
    0 8px 32px var(--shadow-color),
    inset 0 0 80px rgba(59, 130, 246, 0.03);
}

.sidebar-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.5rem;
  overflow-y: auto;
}

.profile {
  text-align: center;
  margin-bottom: 2.5rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.25rem;
}

.avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-color);
  box-shadow: 0 8px 24px var(--shadow-color);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px dashed var(--accent-color);
  opacity: 0.4;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.author-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  letter-spacing: 0.5px;
}

.description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  margin-bottom: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  color: var(--text-primary);
  text-decoration: none;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.nav-item:hover {
  background: var(--hover-bg);
  border-color: var(--accent-color);
  transform: translateX(8px);
  box-shadow: 0 4px 16px var(--shadow-color);
}

.nav-item.active {
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.35);
}

.theme-toggle-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  border-color: var(--accent-color);
  box-shadow: 0 4px 16px var(--shadow-color);
  transform: translateY(-2px);
}

.toggle-icon {
  font-size: 1.3rem;
}

.footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.footer p {
  margin: 0.25rem 0;
}

.main-content {
  flex: 1;
  margin-left: 32%;
  min-height: 100vh;
  position: relative;
  background: var(--bg-primary);
}

.content-wrapper {
  width: 100%;
  margin: 0 auto;
  padding: 3rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: calc(100% - 4rem);
  }
}

@media (min-width: 1200px) {
  .content-wrapper {
    max-width: 1000px;
    padding: 4rem;
  }
}

@media (min-width: 1440px) {
  .sidebar {
    width: 360px;
    min-width: 360px;
  }

  .main-content {
    margin-left: 360px;
  }

  .content-wrapper {
    max-width: 1100px;
    padding: 4.5rem;
  }

  .avatar {
    width: 150px;
    height: 150px;
  }

  .author-name {
    font-size: 1.8rem;
  }

  .nav-item {
    padding: 1.1rem 1.4rem;
    font-size: 1.05rem;
  }
}

@media (min-width: 1920px) {
  .sidebar {
    width: 420px;
    min-width: 420px;
  }

  .main-content {
    margin-left: 420px;
  }

  .content-wrapper {
    max-width: 1200px;
    padding: 5rem;
  }

  .floating-decorations .dot-1 {
    width: 400px;
    height: 400px;
  }

  .floating-decorations .dot-2 {
    width: 280px;
    height: 280px;
  }

  .floating-decorations .shape-1 {
    width: 280px;
    height: 280px;
  }

  .floating-decorations .shape-2 {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
    min-width: unset;
  }

  .sidebar-bg {
    inset: 10px;
    border-radius: 20px;
  }

  .sidebar-content {
    padding: 1.25rem;
  }

  .floating-decorations {
    display: none;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  .avatar-wrapper {
    margin-bottom: 0;
  }

  .avatar {
    width: 55px;
    height: 55px;
    border-width: 2px;
  }

  .avatar-ring {
    display: none;
  }

  .author-name {
    font-size: 1.2rem;
    margin: 0;
  }

  .description {
    display: none;
  }

  .nav {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 10px;
  }

  .nav-item:hover {
    transform: translateY(-2px);
  }

  .theme-toggle-wrapper {
    margin-bottom: 0.75rem;
  }

  .theme-toggle {
    width: 40px;
    height: 40px;
  }

  .toggle-icon {
    font-size: 1.1rem;
  }

  .main-content {
    margin-left: 0;
  }

  .content-wrapper {
    padding: 1.5rem;
  }
}
</style>
