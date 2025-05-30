var simpleGit = require('simple-git');
var git = simpleGit();

git.add('./*').then(()=> {
  console.log('files added');
})

git.commit('update').then(()=> {
  console.log('commit');
})

git .push('origin', 'master').then(()=> {
  console.log('push');
})