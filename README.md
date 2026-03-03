# AR绘本扫描应用

一个基于React和Three.js的AR绘本扫描应用，支持3D模型显示、动画控制、视频播放等功能。

## 功能特性

- **AR识别**: 扫描识别图后自动显示对应的3D模型
- **3D模型控制**: 支持模型的放大缩小、旋转操作
- **动画系统**: 模型默认动画 + 点击触发动画切换
- **视频播放**: 识别图区域播放指定视频
- **可扩展架构**: 模块化设计，易于添加新功能和内容

## 技术栈

- React 18
- Three.js + React Three Fiber
- AR.js (A-Frame)
- Drei (Three.js helpers)

## 项目结构

```
src/
├── components/          # React组件
│   ├── ARScene.js      # AR场景主组件
│   ├── ARModel.js      # 3D模型加载和动画
│   ├── ModelController.js # 模型控制面板
│   └── VideoPlayer.js  # 视频播放器
├── config/             # 配置文件
│   ├── arConfig.js     # AR标记和模型配置
│   └── githubPagesConfig.js # GitHub Pages适配配置
├── utils/              # 工具函数
│   └── arUtils.js      # AR相关工具函数
├── App.js              # 主应用组件
├── App.css             # 样式文件
└── index.js            # 应用入口
```

## 使用说明

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm start
```

### 3. 添加自定义内容

#### 添加新的识别图和模型
1. 在 `public/markers/` 目录下添加 `.patt` 文件
2. 在 `public/models/` 目录下添加 `.glb` 模型文件
3. 在 `public/videos/` 目录下添加视频文件
4. 更新 `src/config/arConfig.js` 中的配置

#### 配置示例
```javascript
// src/config/arConfig.js
customMarkers: {
  'your-marker-name': {
    patternUrl: '/markers/your-marker.patt',
    modelUrl: '/models/your-model.glb',
    defaultAnimation: 'idle',
    videoUrl: '/videos/your-video.mp4',
    scale: 1.0,
    position: [0, 0, 0]
  }
}
```

## GitHub Pages部署

### 准备工作
1. **创建GitHub仓库**: 确保你的项目已经推送到GitHub
2. **修改homepage**: 在 `package.json` 中更新homepage字段

```json
{
  "homepage": "https://your-username.github.io/your-repo-name"
}
```

### 部署步骤
1. **安装依赖**:
```bash
npm install --save-dev gh-pages
```

2. **构建并部署**:
```bash
npm run deploy:gh-pages
```

或者使用自动化脚本:
```bash
node scripts/deploy-github-pages.js
```

3. **访问应用**:
部署完成后，访问 `https://your-username.github.io/your-repo-name`

### 注意事项
- **HTTPS要求**: GitHub Pages自动提供HTTPS，满足AR应用的安全要求
- **路径问题**: 应用会自动处理GitHub Pages的子目录路径
- **资源加载**: 确保所有资源文件（模型、视频、标记）都放在 `public` 目录下
- **缓存问题**: 部署后可能需要强制刷新页面（Ctrl+F5）来加载最新版本

## 扩展功能

### 添加新动画
1. 确保3D模型包含所需的动画轨道
2. 在 `MODEL_ANIMATIONS` 配置中添加动画名称
3. 模型点击时会自动切换到下一个可用动画

### 自定义控制
- 修改 `ModelController.js` 添加更多控制选项
- 调整CSS样式来自定义UI外观

## 注意事项

- 确保所有3D模型为 `.glb` 格式
- 视频格式建议使用 `.mp4` 以保证兼容性
- AR标记图案需要足够的对比度和复杂度以确保准确识别
- 移动设备上需要允许摄像头权限

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)  
- Safari (iOS 13+)
- Edge (Chromium-based)

## 许可证

MIT License