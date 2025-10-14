const simpleGit = require('simple-git')();
const fs = require('fs-extra');
const path = require('path');
// 复制文件
function copyFolderContentToCurrentDirSync(sourceFolderPath) {
    const currentDir = process.cwd();
    const items = fs.readdirSync(sourceFolderPath);
    for (const item of items) {
        const srcPath = path.join(sourceFolderPath, item);
        const destPath = path.join(currentDir, item);
        fs.copySync(srcPath, destPath);
        console.log(`已复制：${item}`);
    }
    console.log('✅ 文件夹内容已成功复制到当前目录');
}
// 复制源文件夹
const sourceFolderPath = path.resolve('../', 'jinux-blog-source/public');
copyFolderContentToCurrentDirSync(sourceFolderPath);

// 删除index.lock文件
const deleteFilePath = path.resolve('./', '.git/index.lock');
try {
  fs.removeSync(deleteFilePath);
  console.log('删除成功');
} catch (error) {
    console.log(error);
}

simpleGit
  .add(['.']) // 添加当前目录下的所有文件到暂存区
  .commit('update') // 提交暂存区的更改，并附带提交信息
  .then(() => {
    console.log('Commit successful!');
    simpleGit
      .push('origin', 'master') // 将代码推送到远程仓库的master分支
      .then(() => {
        console.log('Push successful!');
      })
      .catch((err) => {
        console.error('Error during push:', err);
    });
  })
  .catch((err) => {
    console.error('Error during commit:', err);
});
