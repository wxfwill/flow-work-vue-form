/* eslint-disable prettier/prettier */
/** @format */
/// <reference path='./gulp-ssh.d.ts' />
const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');

// 部署到服务器上的文件夹 pigeon-flow-form
const projectName = 'pigeon-flow-form';

// 需要上传到服务器的路径
const remotePath = `/usr/local/nginx/html/${projectName}`;

// 配置文件 测试环境
const config = {
  ssh: {
    host: '172.16.121.4',
    port: 22,
    username: 'root',
    password: 'password'
  },
  remotePath,
  commands: [
    // 删除现有文件
    `rm -rf ${remotePath}`
  ]
};
const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
});


// 上传前先删除服务器上现有文件...
gulp.task('execSSH', async function() {
  console.log('删除服务器上现有文件...');
  // await gulpSSH.shell(config.commands + '/**/*');
  await gulpSSH.shell(config.commands);
});

 // 上传文件到服务器
gulp.task(
  'deploy',
  gulp.series('execSSH', function(done) {
    console.log('2s后开始上传文件到服务器...');
    setTimeout(() => {
      gulp.src(`./${projectName}/**/*`,{ buffer: false }).pipe(gulpSSH.dest(config.remotePath))
      console.log('上传完毕.....');
    }, 2000);
    done();
  })
);
