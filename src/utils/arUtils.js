// AR工具函数

/**
 * 加载AR标记模式文件
 * @param {string} patternUrl - 模式文件URL
 * @returns {Promise} - 加载完成的Promise
 */
export const loadMarkerPattern = async (patternUrl) => {
  try {
    const response = await fetch(patternUrl);
    const patternData = await response.text();
    return patternData;
  } catch (error) {
    console.error('Failed to load marker pattern:', error);
    throw error;
  }
};

/**
 * 验证3D模型文件
 * @param {string} modelUrl - 模型文件URL
 * @returns {Promise<boolean>} - 验证结果
 */
export const validateModelFile = async (modelUrl) => {
  try {
    const response = await fetch(modelUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Model file validation failed:', error);
    return false;
  }
};

/**
 * 创建AR场景配置
 * @param {Object} config - AR配置对象
 * @returns {Object} - 完整的AR场景配置
 */
export const createARSceneConfig = (config) => {
  return {
    detectionMode: config.detectionMode || 'mono',
    matrixCodeType: config.matrixCodeType || '3x3',
    cameraParametersUrl: config.cameraParametersUrl || '',
    maxDetectionRate: config.maxDetectionRate || 60,
    canvasWidth: config.canvasWidth || window.innerWidth,
    canvasHeight: config.canvasHeight || window.innerHeight
  };
};

/**
 * 处理模型变换
 * @param {Object} transform - 变换参数 {scale, rotation, position}
 * @returns {Object} - Three.js兼容的变换对象
 */
export const processModelTransform = (transform) => {
  return {
    scale: transform.scale || 1,
    rotation: transform.rotation || [0, 0, 0],
    position: transform.position || [0, 0, 0]
  };
};