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
    <div class="bg-layer">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="gradient-orb orb-4"></div>
      <div class="noise-overlay"></div>
    </div>

    <div class="floating-particles">
      <span
        v-for="i in 20"
        :key="i"
        class="particle"
        :style="{
          '--delay': `${i * 0.5}s`,
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`,
          '--size': `${Math.random() * 6 + 2}px`
        }"
      ></span>
    </div>

    <aside class="sidebar">
      <div class="glass-card sidebar-card">
        <div class="profile">
          <div class="avatar-container">
            <div class="avatar-glow"></div>
            <img :src="siteConfig.avatar" :alt="siteConfig.author" class="avatar" />
            <div class="avatar-sparkle"><span></span><span></span><span></span><span></span></div>
          </div>
          <h1 class="author-name">{{ siteConfig.author }}</h1>
          <p class="description">{{ siteConfig.description }}</p>
        </div>

        <nav class="nav">
          <RouterLink
            v-for="(item, index) in navConfig.items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
            :style="{ '--i': index }"
          >
            <span class="nav-icon">
              <svg
                v-if="item.path === '/'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              <svg
                v-else-if="item.path === '/articles'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <svg
                v-else-if="item.path === '/projects'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            <span class="nav-text">{{ item.text }}</span>
          </RouterLink>
        </nav>

        <div class="theme-toggle-wrapper">
          <button class="theme-toggle glass-btn" @click="toggleTheme">
            <span class="toggle-icon">{{ mode === 'light' ? '🌙' : '☀️' }}</span>
          </button>
        </div>

        <footer class="footer">
          <p v-if="siteConfig.icp" class="icp-text">{{ siteConfig.icp }}</p>
        </footer>
      </div>
    </aside>

    <main class="main-content">
      <div class="content-wrapper glass-card">
        <RouterView />
      </div>
    </main>

    <nav class="mobile-nav glass-card">
      <RouterLink
        v-for="item in navConfig.items"
        :key="item.path"
        :to="item.path"
        class="mobile-nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <span class="mobile-nav-icon">
          <svg
            v-if="item.path === '/'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          <svg
            v-else-if="item.path === '/articles'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <svg
            v-else-if="item.path === '/projects'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </span>
        <span class="mobile-nav-text">{{ item.text }}</span>
      </RouterLink>
      <button class="mobile-nav-item mobile-theme-btn" @click="toggleTheme">
        <span class="mobile-nav-icon">{{ mode === 'light' ? '🌙' : '☀️' }}</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.bg-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--bg-primary);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float-orb 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--gradient-purple) 0.4 0%, transparent 70%);
  top: -150px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--gradient-pink) 0.3 0%, transparent 70%);
  top: 30%;
  right: -100px;
  animation-delay: -5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--accent-secondary) 0.3 0%, transparent 70%);
  bottom: -100px;
  left: 30%;
  animation-delay: -10s;
}

.orb-4 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--gradient-pink) 0.25 0%, transparent 70%);
  top: 50%;
  left: 50%;
  animation-delay: -15s;
}

@keyframes float-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 30px) scale(1.02);
  }
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

.floating-particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: var(--particle-color);
  border-radius: 50%;
  animation: float-particle 15s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0.4;
  }
  90% {
    opacity: 0.6;
  }
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--card-border);
  box-shadow:
    0 8px 32px var(--shadow-color),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-btn {
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: var(--bg-glass-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.sidebar {
  width: 320px;
  min-width: 320px;
  position: fixed;
  height: 100vh;
  padding: 1.5rem;
  z-index: 10;
}

.sidebar-card {
  height: 100%;
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.profile {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.25rem;
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
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.avatar {
  width: 100px;
  height: 100px;
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

.avatar-sparkle span:nth-child(1) {
  top: 0;
  left: 50%;
  animation-delay: 0s;
}
.avatar-sparkle span:nth-child(2) {
  top: 50%;
  right: 0;
  animation-delay: 0.5s;
}
.avatar-sparkle span:nth-child(3) {
  bottom: 0;
  left: 50%;
  animation-delay: 1s;
}
.avatar-sparkle span:nth-child(4) {
  top: 50%;
  left: 0;
  animation-delay: 1.5s;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.author-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  margin-bottom: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  border-radius: 16px;
  color: var(--text-primary);
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 4px;
  height: 60%;
  background: var(--accent-gradient);
  border-radius: 0 4px 4px 0;
  transition: transform 0.3s ease;
}

.nav-item:hover {
  background: var(--bg-glass);
  border-color: var(--border-color);
  transform: translateX(4px);
}

.nav-item:hover::before {
  opacity: 0.1;
}

.nav-item:hover::after {
  transform: translateY(-50%) scaleY(1);
}

.nav-item:hover .nav-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 8px var(--accent-color));
}

.nav-item.active {
  background: var(--accent-gradient);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px var(--glow-color);
}

.nav-item.active::after {
  background: white;
  transform: translateY(-50%) scaleY(1);
}

.nav-item.active .nav-icon svg {
  stroke: white;
}

.nav-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  position: relative;
  z-index: 1;
}

.theme-toggle-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.theme-toggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border: 2px solid var(--gradient-start);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle::before {
  content: '';
  position: absolute;
  inset: -4px;
  background: var(--accent-gradient);
  border-radius: 50%;
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.theme-toggle:hover {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border-color: transparent;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px var(--glow-color);
}

.theme-toggle:hover::before {
  opacity: 0.7;
}

.toggle-icon {
  font-size: 1.3rem;
  transition: transform 0.4s ease;
}

.theme-toggle:hover .toggle-icon {
  transform: rotate(180deg);
}

.footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.icp-text {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin: 0;
}

.main-content {
  flex: 1;
  margin-left: 320px;
  min-height: 100vh;
  padding: 1.5rem;
  position: relative;
}

.content-wrapper {
  border-radius: 28px;
  min-height: calc(100vh - 3rem);
  padding: 2.5rem;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
    min-width: 280px;
    padding: 1rem;
  }

  .sidebar-card {
    padding: 1.5rem;
  }

  .main-content {
    margin-left: 280px;
    padding: 1rem;
  }

  .content-wrapper {
    border-radius: 20px;
    padding: 1.5rem;
    min-height: calc(100vh - 2rem);
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
    padding: 0.75rem;
  }

  .sidebar-card {
    flex-direction: row;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 20px;
    gap: 1rem;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0;
    flex: 1;
  }

  .avatar-container {
    margin-bottom: 0;
  }

  .avatar {
    width: 48px;
    height: 48px;
  }

  .avatar-glow,
  .avatar-sparkle {
    display: none;
  }

  .profile-text {
    flex: 1;
    min-width: 0;
  }

  .author-name {
    font-size: 1.1rem;
    margin-bottom: 0.15rem;
  }

  .description {
    font-size: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .nav {
    flex-direction: row;
    gap: 0.35rem;
    margin-bottom: 0;
    flex: unset;
  }

  .nav-item {
    padding: 0.6rem 0.9rem;
    font-size: 0;
  }

  .nav-item:hover {
    transform: none;
  }

  .nav-icon {
    width: 24px;
    height: 24px;
  }

  .nav-text {
    display: none;
  }

  .theme-toggle-wrapper {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .theme-toggle {
    width: 40px;
    height: 40px;
  }

  .footer {
    display: none;
  }

  .main-content {
    margin-left: 0;
    padding: 0.75rem;
    padding-bottom: 100px;
  }

  .content-wrapper {
    border-radius: 16px;
    padding: 1.25rem;
    min-height: calc(100vh - 200px);
  }

  .bg-layer .orb-1,
  .bg-layer .orb-2,
  .floating-particles {
    display: none;
  }
}

.mobile-nav {
  display: none;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  height: 60px;
  border-radius: 20px;
  padding: 0 0.5rem;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: flex;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
    padding: 0.75rem;
    padding-bottom: 100px;
  }

  .content-wrapper {
    border-radius: 16px;
    padding: 1rem;
    min-height: calc(100vh - 150px);
  }

  .bg-layer .gradient-orb,
  .floating-particles {
    display: none;
  }
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 60px;
}

.mobile-nav-item.active {
  color: var(--accent-color);
  background: var(--hover-bg);
}

.mobile-nav-item:hover {
  color: var(--accent-color);
}

.mobile-nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav-icon svg {
  width: 100%;
  height: 100%;
}

.mobile-nav-text {
  font-size: 0.7rem;
  font-weight: 500;
}

.mobile-theme-btn {
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 480px) {
  .mobile-nav-text {
    display: none;
  }

  .mobile-nav {
    bottom: 0.5rem;
    border-radius: 16px;
  }
}
</style>
