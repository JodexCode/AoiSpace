# AoiSpace / 碧蓝空间

一个优雅的二次元风格静态博客框架，基于 Vue 3 + TypeScript + Vite 构建。

## ✨ 特性

- **二次元美学**：空气感渐变背景 + 磨砂玻璃效果 + 浮动粒子动画
- **亮暗主题**：一键切换，自动记忆偏好
- **响应式设计**：适配从手机到 4K 的各种屏幕
- **文章系统**：Markdown 写作、标签筛选、全文搜索
- **瀑布流布局**：卡片式文章列表，交错入场动画
- **手绘风格**：手绘风标签、悬停动效
- **花哨动效**：全站悬停交互动效，标题渐变扫线、按钮闪光扫过、图标弹跳旋转
- **隐私友好**：敏感配置通过 JSON 文件管理，gitignore 保护

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm / npm / bun

### 安装

```bash
# 使用 bun（推荐）
bun install

# 或使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 配置

```bash
# 复制配置模板文件
cp src/config/site-template.json src/config/site.json
cp src/config/social-links-template.json src/config/social-links.json

# 编辑配置文件
# - src/config/site.json       # 站点信息
# - src/config/nav.json        # 导航配置
# - src/config/social-links.json # 社交链接
```

详细配置说明请查看 [配置指南](src/config/README.md)。

### 开发

```bash
bun dev
```

### 构建

```bash
bun build
```

### 预览

```bash
bun preview
```

## 📁 目录结构

```
├── src/
│   ├── config/          # 配置目录
│   │   ├── *.json       # 真实配置（gitignore）
│   │   ├── *-template.json  # 配置模板
│   │   └── README.md    # 配置说明
│   ├── posts/           # 文章目录
│   │   └── local/      # 本地文章（gitignore）
│   ├── projects/        # 项目配置
│   ├── intro/           # 首页介绍（gitignore）
│   ├── composables/     # 组合式函数
│   ├── components/      # 组件
│   ├── views/          # 页面视图
│   └── router/         # 路由配置
├── public/              # 静态资源
└── README.md
```

## ⚙️ 配置

详细配置说明请查看 [配置指南](src/config/README.md)。

### 站点配置 (site.json)

```json
{
  "title": "碧蓝空间",
  "author": "每天睡25小时",
  "avatar": "/avatar.png",
  "description": "记录技术探索与生活点滴",
  "icp": "京ICP备xxxxxxxx号"
}
```

### 社交链接配置 (social-links.json)

```json
[
  {
    "name": "GitHub",
    "url": "https://github.com/xxx",
    "icon": "🐙",
    "iconType": "emoji"
  }
]
```

## 📝 文章写作

在 `src/posts/local/` 目录下创建 Markdown 文件：

```markdown
---
title: 我的第一篇文章
date: 2024-01-01
tags:
  - 教程
  - Vue
description: 这是文章的简介
cover: /posts/images/cover.jpg
---

# 正文内容

这里是文章正文...
```

Frontmatter 字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期 |
| `tags` | 否 | 标签数组 |
| `description` | 否 | 文章简介 |
| `cover` | 否 | 封面图片 |
| `readingTime` | 否 | 阅读时长（分钟） |
| `updated` | 否 | 更新日期 |

### 项目配置

编辑 `src/projects/projects.json`：

```json
[
  {
    "id": "1",
    "title": "我的项目",
    "description": "项目描述",
    "image": "/projects/cover.jpg",
    "previewUrl": "https://example.com",
    "sourceUrl": "https://github.com/xxx/repo",
    "tags": ["Vue", "TypeScript"]
  }
]
```

### 首页介绍

编辑 `src/intro/intro.md`，内容会显示在首页「关于我」区域。

## 🎨 自定义

### 主题色

编辑 `src/config/index.ts` 中的主题配置：

```typescript
export const themeConfig: ThemeConfig = {
  primaryColor: '#7c3aed',  // 主色调
  codeTheme: 'github'       // 代码高亮主题
}
```

## 🔧 技术栈

- **框架**：Vue 3 + Composition API
- **语言**：TypeScript
- **构建**：Vite
- **Markdown**：unplugin-vue-markdown
- **路由**：Vue Router
- **包管理**：pnpm / npm / bun

## 📝 License

MIT License

## 🙏 致谢

本项目受到众多开源项目的启发，特别感谢：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

如果觉得这个项目不错，欢迎 Star ⭐
