# 文章目录

将你的文章（.md 文件）放在 `local/` 目录下，它们会被自动加载并显示。

## 撰写文章

1. 在 `local/` 目录创建新的 `.md` 文件
2. 文件顶部添加 frontmatter：

```yaml
---
title: 文章标题
date: 2024-01-01
tags: [标签1, 标签2]
description: 文章简介
---
```

3. 使用 Markdown 编写正文

**注意**：`local/` 目录已加入 gitignore，提交时会自动忽略。
