<script setup lang="ts">
import MainLayout from './components/MainLayout.vue'
</script>

<template>
  <MainLayout />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import 'highlight.js/styles/github.css';

:root:not([data-theme='dark']) .hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
  background: #f6f8fa;
  color: #24292e;
}

:root[data-theme='dark'] .hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
  background: #0d1117;
  color: #c9d1d9;
}

:root[data-theme='dark'] .hljs-keyword,
:root[data-theme='dark'] .hljs-selector-tag,
:root[data-theme='dark'] .hljs-literal,
:root[data-theme='dark'] .hljs-section,
:root[data-theme='dark'] .hljs-link {
  color: #ff7b72;
}

:root[data-theme='dark'] .hljs-string,
:root[data-theme='dark'] .hljs-title,
:root[data-theme='dark'] .hljs-name,
:root[data-theme='dark'] .hljs-type,
:root[data-theme='dark'] .hljs-attribute,
:root[data-theme='dark'] .hljs-symbol,
:root[data-theme='dark'] .hljs-bullet,
:root[data-theme='dark'] .hljs-addition,
:root[data-theme='dark'] .hljs-variable,
:root[data-theme='dark'] .hljs-template-tag,
:root[data-theme='dark'] .hljs-template-variable {
  color: #a5d6ff;
}

:root[data-theme='dark'] .hljs-comment,
:root[data-theme='dark'] .hljs-quote,
:root[data-theme='dark'] .hljs-deletion,
:root[data-theme='dark'] .hljs-meta {
  color: #8b949e;
}

:root[data-theme='dark'] .hljs-function .hljs-title,
:root[data-theme='dark'] .hljs-title.function_ {
  color: #d2a8ff;
}

:root {
  --bg-primary: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
  --bg-secondary: rgba(255, 255, 255, 0.7);
  --bg-glass: rgba(255, 255, 255, 0.6);
  --text-primary: #1e3a5f;
  --text-secondary: #5a7a9a;
  --border-color: rgba(59, 130, 246, 0.25);
  --accent-color: #3b82f6;
  --accent-secondary: #06b6d4;
  --code-bg: rgba(224, 242, 254, 0.8);
  --hover-bg: rgba(59, 130, 246, 0.1);
  --shadow-color: rgba(59, 130, 246, 0.2);
  --card-bg: rgba(255, 255, 255, 0.7);
  --heading-h1: #7c3aed;
  --heading-h2: #3b82f6;
  --heading-h3: #06b6d4;
  --heading-h4: #64748b;
  --gradient-purple: #8b5cf6;
  --gradient-pink: #ec4899;
  --glow-color: rgba(139, 92, 246, 0.4);
  --input-bg: rgba(255, 255, 255, 0.5);
  --input-border: rgba(139, 92, 246, 0.15);
  --gradient-start: rgba(139, 92, 246, 0.12);
  --gradient-end: rgba(236, 72, 153, 0.08);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family:
    'Noto Sans SC',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.7;
  min-height: 100vh;
}

::selection {
  background: rgba(59, 130, 246, 0.25);
  color: var(--text-primary);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent-secondary);
}

button {
  font-family: inherit;
}

code {
  font-family: 'Fira Code', 'Consolas', monospace;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
