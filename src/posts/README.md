# 文章目录

将你的文章（.md 文件）放在 `local/` 目录下，它们会被自动加载并显示。

## 撰写文章

1. 在 `local/` 目录创建新的 `.md` 文件
2. 文件顶部添加 frontmatter：

```yaml
---
title: 文章标题
date: 2024-01-01
updated: 2024-01-15
tags: [标签1, 标签2]
description: 文章简介
cover: /cover-image.png
readingTime: 5
---
```

3. 使用 Markdown 编写正文

**字段说明**：

- `title` - 文章标题
- `date` - 发布时间
- `updated` - 修改时间（可选）
- `tags` - 标签数组
- `description` - 简介/摘要
- `cover` - 封面图片路径（可选）
- `readingTime` - 预计阅读分钟数（可选，不填则自动计算）

**注意**：`local/` 目录已加入 gitignore，提交时会自动忽略。
