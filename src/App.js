import React, { useState, useRef, useEffect } from 'react';
import ARScene from './components/ARScene';
import ModelController from './components/ModelController';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

// 简化配置 - 直接在这里定义
const markerConfig = {
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
};

const MODEL_ANIMATIONS_CONFIG = {
  'book1': ['idle', 'talk', 'move'],
  'book2': ['walk', 'run', 'jump']
};

const VIDEO_CONFIG_SETTINGS = {
  autoplay: true,
  loop: false,
  volume: 1.0
};

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
      setIsVideoPlaying(VIDEO_CONFIG_SETTINGS.autoplay || true);
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