const simpleGit = require('simple-git');
const git = simpleGit();

const fs = require('fs-extra');
const path = require('path');

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

// 调用
const sourceFolderPath = path.resolve('../', 'jinux-blog-source/public');
// console.log(sourceFolderPath);
// return ;
// copyFolderContentToCurrentDirSync(sourceFolderPath);

// 删除index.lock文件
const deleteFilePath = path.resolve('./', '.git/index.lock');
try {
  // fs.removeSync(deleteFilePath);
  console.log('删除成功');
} catch (error) {
    console.log(error);
}
console.log(deleteFilePath)
// return;
git.add('.').then(()=> {
  console.log('files added');
})

git.commit('update').then(()=> {
  console.log('commit');
})

git .push('origin', 'master').then(()=> {
  console.log('push');
})