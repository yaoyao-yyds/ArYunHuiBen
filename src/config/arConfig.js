// AR标记配置
export const AR_MARKER_CONFIG = {
  // 标记类型: 'hiro' 黑白方块图案, 'kanji'汉字标记, 'custom' 自定义团标记（需要.patt文件）
  markerType: 'hiro',
  
  // 自定义标记配置
  customMarkers: {
    'book1': {
      patternUrl: '/markers/book1.patt',
      modelUrl: '/models/book1.glb',
      defaultAnimation: 'idle',
      videoUrl: '/videos/book1-intro.mp4',
      scale: 1.0,
      position: [0, 0, 0]
    },
    'book2': {
      patternUrl: '/markers/book2.patt',
      modelUrl: '/models/book2.glb',
      defaultAnimation: 'walk',
      videoUrl: '/videos/book1-intro.mp4',
      scale: 1.0,
      position: [0, 0, 0]
    }
  }
};

// 3D模型动画配置
export const MODEL_ANIMATIONS = {
  'book1': ['idle', 'wave', 'jump'],
  'book2': ['walk', 'run', 'dance']
};

// 视频配置
export const VIDEO_CONFIG = {
  autoplay: true,
  loop: false,
  muted: false,
  controls: false
};