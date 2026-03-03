#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置变量
const REPO_NAME = 'ArYunHuiBen'; // 你的仓库名称
const GITHUB_USERNAME = 'your-username'; // 你的GitHub用户名

// 检查必要的配置
const checkConfig = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!packageJson.homepage || packageJson.homepage === 'https://your-username.github.io/ArYunHuiBen') {
    console.log('⚠️  请先修改 package.json 中的 homepage 字段:');
    console.log(`   "homepage": "https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"`);
    return false;
  }
  
  return true;
};

// 构建应用
const buildApp = () => {
  return new Promise((resolve, reject) => {
    console.log('🏗️  正在构建应用...');
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ 构建失败:', error);
        reject(error);
        return;
      }
      console.log('✅ 构建成功!');
      resolve();
    });
  });
};

// 部署到GitHub Pages
const deployToGithubPages = () => {
  return new Promise((resolve, reject) => {
    console.log('🚀 正在部署到 GitHub Pages...');
    exec('npm run deploy:gh-pages', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ 部署失败:', error);
        reject(error);
        return;
      }
      console.log('✅ 部署成功!');
      resolve();
    });
  });
};

// 主部署函数
const main = async () => {
  console.log('🎯 GitHub Pages 部署 AR 绘本应用\n');
  
  // 检查配置
  if (!checkConfig()) {
    console.log('\n📝 请完成以下步骤后再运行部署:');
    console.log('1. 修改 package.json 中的 homepage 字段');
    console.log('2. 确保你的仓库已经推送到 GitHub');
    console.log('3. 确保仓库名称与配置一致');
    return;
  }
  
  try {
    // 构建应用
    await buildApp();
    
    // 部署到GitHub Pages
    await deployToGithubPages();
    
    // 显示成功信息
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('\n🎉 部署完成!');
    console.log(`🌐 访问地址: ${packageJson.homepage}`);
    console.log('\n📱 移动端测试提示:');
    console.log('- 在手机浏览器中打开上述URL');
    console.log('- 允许摄像头权限');
    console.log('- 扫描AR识别图进行测试');
    
  } catch (error) {
    console.error('\n💥 部署过程中出现错误:', error.message);
    process.exit(1);
  }
};

// 执行主函数
if (require.main === module) {
  main();
}