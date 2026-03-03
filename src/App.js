// GitHub Pages生产环境配置
const BASE_PATH = '/ArYunHuiBen'; // 替换为您的仓库名称

export const getGithubPagesARConfig = () => ({
  customMarkers: {
    'marker1': {
      modelUrl: `${BASE_PATH}/models/book1.glb`,
      defaultAnimation: 'idle',
      videoUrl: `${BASE_PATH}/videos/book1-intro.mp4`
    },
    'marker2': {
      modelUrl: `${BASE_PATH}/models/book2.glb`,
      defaultAnimation: 'walk',
      videoUrl: `${BASE_PATH}/videos/book2-intro.mp4`
    }
  }
});

export const GITHUB_PAGES_MODEL_ANIMATIONS = {
  'book1': ['idle', 'talk', 'move'],
  'book2': ['walk', 'run', 'jump']
};

export const GITHUB_PAGES_VIDEO_CONFIG = {
  autoplay: true,
  loop: false,
  volume: 1.0
};
// 开发环境配置
export const AR_MARKER_CONFIG = {
  customMarkers: {
    'marker1': {
      modelUrl: '/models/book1.glb',
      defaultAnimation: 'idle',
      videoUrl: '/videos/book1-intro.mp4'
    },
    'marker2': {
      modelUrl: '/models/book2.glb',
      defaultAnimation: 'walk',
      videoUrl: '/videos/book2-intro.mp4'
    }
  }
};

export const MODEL_ANIMATIONS = {
  'book1': ['idle', 'talk', 'move'],
  'book2': ['walk', 'run', 'jump']
};

export const VIDEO_CONFIG = {
  autoplay: true,
  loop: false,
  volume: 1.0
};
import React, { useState, useRef, useEffect } from 'react';
import ARScene from './components/ARScene';
import ModelController from './components/ModelController';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

// 根据环境选择配置
let markerConfig, MODEL_ANIMATIONS, VIDEO_CONFIG;

if (process.env.NODE_ENV === 'production') {
  // 生产环境（GitHub Pages）
  const {
    getGithubPagesARConfig,
    GITHUB_PAGES_MODEL_ANIMATIONS,
    GITHUB_PAGES_VIDEO_CONFIG
  } = require('./config/githubPagesConfig');
  
  const config = getGithubPagesARConfig();
  markerConfig = config.customMarkers;
  MODEL_ANIMATIONS = GITHUB_PAGES_MODEL_ANIMATIONS;
  VIDEO_CONFIG = GITHUB_PAGES_VIDEO_CONFIG;
} else {
  // 开发环境
  const { AR_MARKER_CONFIG } = require('./config/arConfig');
  markerConfig = AR_MARKER_CONFIG.customMarkers;
  MODEL_ANIMATIONS = require('./config/arConfig').MODEL_ANIMATIONS;
  VIDEO_CONFIG = require('./config/arConfig').VIDEO_CONFIG;
}

function App() {
  const [isARActive, setIsARActive] = useState(false);
  const [detectedMarker, setDetectedMarker] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleMarkerDetected = (markerId) => {
    if (markerConfig[markerId]) {
      setDetectedMarker(markerId);
      setCurrentModel(markerConfig[markerId]);
      setIsARActive(true);
      setIsVideoPlaying(VIDEO_CONFIG.autoplay || true);
    }
  };

  const handleMarkerLost = () => {
    setDetectedMarker(null);
    setCurrentModel(null);
    setIsARActive(false);
    setIsVideoPlaying(false);
  };

  const handleModelClick = () => {
    // 触发模型动画
    console.log('Model clicked, triggering animation');
  };

  return (
    <div className="App">
      {!isARActive && (
        <div className="ar-instructions">
          <h2>请将摄像头对准绘本识别图</h2>
          <p>扫描识别图后将显示3D模型和视频</p>
        </div>
      )}
      
      <ARScene 
        onMarkerDetected={handleMarkerDetected}
        onMarkerLost={handleMarkerLost}
        currentModel={currentModel}
        onModelClick={handleModelClick}
      />
      
      {isARActive && currentModel && (
        <>
          <ModelController 
            model={currentModel}
            onModelClick={handleModelClick}
          />
          <VideoPlayer 
            videoUrl={currentModel.videoUrl}
            isPlaying={isVideoPlaying}
            onPlayStateChange={setIsVideoPlaying}
          />
        </>
      )}
    </div>
  );
}

export default App;