import React, { useState } from 'react';

const ModelController = ({ model, onModelClick }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const handleScaleChange = (factor) => {
    const newScale = Math.max(0.1, Math.min(5, scale * factor));
    setScale(newScale);
  };

  const handleRotate = (axis, angle) => {
    setRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + angle
    }));
  };

  const resetTransform = () => {
    setScale(1);
    setRotation({ x: 0, y: 0, z: 0 });
  };

  return (
    <div className="model-controller">
      <div className="controller-group">
        <h3>模型控制</h3>
        <button onClick={() => handleScaleChange(1.2)}>放大</button>
        <button onClick={() => handleScaleChange(0.8)}>缩小</button>
        <button onClick={() => handleRotate('y', Math.PI / 4)}>左转</button>
        <button onClick={() => handleRotate('y', -Math.PI / 4)}>右转</button>
        <button onClick={resetTransform}>重置</button>
        <button onClick={onModelClick}>触发动画</button>
      </div>
      
      <div className="transform-info">
        <p>缩放: {scale.toFixed(2)}</p>
        <p>旋转: X:{rotation.x.toFixed(2)} Y:{rotation.y.toFixed(2)} Z:{rotation.z.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ModelController;