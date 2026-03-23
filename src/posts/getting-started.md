---
title: Getting Started with Vite
date: 2024-01-15
tags: [Vite, Frontend]
description: Learn how to build fast web apps with Vite
---

# Getting Started with Vite

Vite is a next-generation frontend build tool that significantly improves the development experience.

## Why Vite?

- **Fast HMR** - Hot Module Replacement that stays fast regardless of app size
- **Native ESM** - Serve source code over native ES modules
- **Build Optimization** - Smart feature splitting and pre-loading

## Quick Start

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

## Configuration

Vite can be configured through `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```