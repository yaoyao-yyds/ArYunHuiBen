import React, { useState, useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const ARModel = ({ modelUrl, defaultAnimation, onClick }) => {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(modelUrl);
  const { actions, names } = useAnimations(animations, groupRef);
  
  const [currentAnimation, setCurrentAnimation] = useState(defaultAnimation);
  const [isPlaying, setIsPlaying] = useState(true);

  // 播放默认动画
  useEffect(() => {
    if (actions && names.includes(defaultAnimation)) {
      actions[defaultAnimation].play();
      setCurrentAnimation(defaultAnimation);
      setIsPlaying(true);
    }
  }, [actions, defaultAnimation, names]);

  const handleModelClick = () => {
    if (onClick) {
      onClick();
    }
    
    // 切换到下一个动画或触发特定动画
    if (names.length > 0) {
      const nextAnim = names.find(name => name !== currentAnimation) || names[0];
      if (actions[nextAnim]) {
        actions[currentAnimation]?.stop();
        actions[nextAnim].play();
        setCurrentAnimation(nextAnim);
      }
    }
  };

  return (
    <group ref={groupRef} onClick={handleModelClick}>
      <primitive object={scene} />
    </group>
  );
};

export default ARModel;