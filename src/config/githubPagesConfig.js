// GitHub Pages环境下的AR配置
// 处理GitHub Pages的子目录路径问题

import { AR_MARKER_CONFIG, MODEL_ANIMATIONS, VIDEO_CONFIG } from './arConfig';

/**
 * 获取GitHub Pages的基础路径
 * @returns {string} 基础路径（包含仓库名）
 */
export const getBasePath = () => {
  // GitHub Pages部署时，应用会部署在 https://username.github.io/repo-name/
  // 需要获取正确的基础路径
  const repoName = 'ArYunHuiBen'; // 你的仓库名称
  return process.env.NODE_ENV === 'production' 
    ? `/${repoName}`
    : '';
};

/**
 * 调整资源URL以适应GitHub Pages
 * @param {string} originalUrl - 原始URL
 * @returns {string} 调整后的URL
 */
export const adjustResourceUrl = (originalUrl) => {
  if (process.env.NODE_ENV === 'production') {
    const basePath = getBasePath();
    // 确保URL以/开头
    const cleanUrl = originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`;
    return `${basePath}${cleanUrl}`;
  }
  return originalUrl;
};

/**
 * 获取GitHub Pages适配的AR配置
 * @returns {Object} 适配后的配置
 */
export const getGithubPagesARConfig = () => {
  const basePath = getBasePath();
  
  // 深拷贝原始配置
  const adaptedConfig = JSON.parse(JSON.stringify(AR_MARKER_CONFIG));
  
  // 调整所有自定义标记的URL
  Object.keys(adaptedConfig.customMarkers).forEach(markerKey => {
    const marker = adaptedConfig.customMarkers[markerKey];
    marker.patternUrl = adjustResourceUrl(marker.patternUrl);
    marker.modelUrl = adjustResourceUrl(marker.modelUrl);
    marker.videoUrl = adjustResourceUrl(marker.videoUrl);
  });
  
  return {
    ...adaptedConfig,
    basePath
  };
};

// 导出调整后的配置
export const GITHUB_PAGES_MODEL_ANIMATIONS = MODEL_ANIMATIONS;
export const GITHUB_PAGES_VIDEO_CONFIG = VIDEO_CONFIG;