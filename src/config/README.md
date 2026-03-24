# 配置指南

AoiSpace 的所有配置都集中在 `src/config/` 目录下，分为模板文件（纳入版本控制）和真实配置文件（gitignore）。

## 目录结构

```
src/config/
├── index.ts                    # 配置入口
├── types.ts                   # TypeScript 类型定义
├── site.json                  # 站点信息（gitignore）
├── site-template.json         # 站点信息模板
├── nav.json                   # 导航配置
├── social-links.json          # 社交链接（gitignore）
├── social-links-template.json # 社交链接模板
└── README.md                  # 本文档
```

## 配置步骤

1. **复制模板文件**

   ```bash
   cp src/config/site-template.json src/config/site.json
   cp src/config/social-links-template.json src/config/social-links.json
   ```

2. **修改真实配置文件**

   编辑 `site.json`、`social-links.json`，填入你的信息。

3. **提交时确保真实配置文件在 gitignore 中**

   以下文件已被 `.gitignore` 忽略，请勿提交：
   - `src/config/site.json`
   - `src/config/social-links.json`

---

## 配置项说明

### 站点信息 `site.json`

| 字段          | 类型   | 说明                      | 示例                     |
| ------------- | ------ | ------------------------- | ------------------------ |
| `title`       | string | 网站标题                  | `碧蓝空间`               |
| `author`      | string | 作者名称                  | `每天睡25小时`           |
| `avatar`      | string | 头像路径（public 目录下） | `/avatar.png`            |
| `description` | string | 网站描述                  | `记录技术探索与生活点滴` |
| `icp`         | string | ICP 备案号                | `京ICP备xxxxxxxx号`      |

```json
{
  "title": "碧蓝空间",
  "author": "每天睡25小时",
  "avatar": "/avatar.png",
  "description": "记录技术探索与生活点滴的个人博客",
  "icp": ""
}
```

### 导航配置 `nav.json`

| 字段    | 类型      | 说明       |
| ------- | --------- | ---------- |
| `items` | NavItem[] | 导航项数组 |

NavItem 结构：

| 字段   | 类型   | 说明     | 示例        |
| ------ | ------ | -------- | ----------- |
| `text` | string | 显示文字 | `文章`      |
| `path` | string | 路由路径 | `/articles` |

```json
{
  "items": [
    { "text": "首页", "path": "/" },
    { "text": "文章", "path": "/articles" },
    { "text": "作品", "path": "/projects" },
    { "text": "关于", "path": "/about" }
  ]
}
```

### 社交链接 `social-links.json`

| 字段       | 类型   | 说明                 | 示例                       |
| ---------- | ------ | -------------------- | -------------------------- |
| `name`     | string | 显示名称             | `GitHub`                   |
| `url`      | string | 链接地址             | `https://github.com/xxx`   |
| `icon`     | string | 图标内容             | `🐙`                       |
| `iconType` | string | 图标类型             | `emoji` / `text` / `image` |
| `color`    | string | 自定义背景色（可选） | `linear-gradient(...)`     |

**iconType 类型：**

- `emoji`（默认）：使用 emoji 作为图标
- `text`：使用文字作为图标
- `image`：使用图片 URL 作为图标

```json
[
  {
    "name": "GitHub",
    "url": "https://github.com/your-github",
    "icon": "🐙",
    "iconType": "emoji"
  },
  {
    "name": "Bilibili",
    "url": "https://bilibili.com/your-bilibili",
    "icon": "📺",
    "iconType": "emoji",
    "color": "linear-gradient(135deg, #fb7299, #ffa8c5)"
  },
  {
    "name": "邮箱",
    "url": "mailto:your@email.com",
    "icon": "✉️",
    "iconType": "emoji"
  }
]
```

---

## 其他配置

### 文章

文章放在 `src/posts/local/` 目录下，详情请参考 [README](../../README.md#文章写作)。

### 项目

项目配置在 `src/projects/projects.json`（gitignore），模板在 `template.json`。

### 首页介绍

首页「关于我」区域内容在 `src/intro/intro.md`（gitignore）。

### 主题样式

主题颜色等样式定义在 `src/config/index.ts` 的 `lightTheme` 和 `darkTheme` 对象中，可自行修改。
