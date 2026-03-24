import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import hljs from 'highlight.js'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      async markdownItSetup(md) {
        md.set({
          highlight: (code: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return `<div class="code-block-wrapper" data-language="${lang}"><pre class="hljs"><code>${hljs.highlight(code, { language: lang }).value}</code></pre></div>`
              } catch {
                // ignore
              }
            }
            return `<div class="code-block-wrapper" data-language="text"><pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre></div>`
          }
        })
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
