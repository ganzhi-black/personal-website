# 个人作品集首页

这是一个模仿 `unveil.fr` 首页气质的静态作品集首页：白色背景、顶部导航、五张立体照片入口。

## 怎么打开

直接双击 `index.html`，或在浏览器里打开这个文件：

`C:\Users\gtyzw\Documents\New project 2\index.html`

## 怎么替换文字

- 顶部导航和五张照片上的栏目名：改 `index.html`
- 右侧说明文字：改 `app.js` 里的 `sectionText`
- 网页标题和搜索简介：改 `index.html` 的 `<title>` 和 `<meta name="description">`

## 怎么替换照片

打开 `styles.css`，找到这五段：

- `.plane-intro`
- `.plane-writing`
- `.plane-copywriting`
- `.plane-media`
- `.plane-film`

把里面的 `background-image: url("...");` 换成你自己的图片地址。

如果你想用本地图片，可以新建一个 `assets` 文件夹，把图片放进去，然后这样写：

```css
background-image: url("./assets/intro.jpg");
```

## 五个栏目

- 个人介绍
- 文字作品
- 文案设计
- 自媒体账号
- 影视作品
