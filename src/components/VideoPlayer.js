import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, isPlaying, onPlayStateChange }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log('Video play error:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const newPlayState = !isPlaying;
    onPlayStateChange(newPlayState);
  };

  const handleVideoEnd = () => {
    onPlayStateChange(false);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={handleVideoEnd}
        controls={false}
        loop={false}
        muted={false}
      />
      <div className="video-controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? '暂停' : '播放'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;