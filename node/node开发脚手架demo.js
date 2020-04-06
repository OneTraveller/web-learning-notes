// 参考链接： https://github.com/lin-xin/blog/issues/27

/* 
  前置工作
  1.建一个新的文件夹
  2.进入文件夹，执行命令行：npm init -y
  3.安装相关依赖：npm i -S commander download-git-repo inquirer ora chalk log-symbols
  4.初始化项目：node index.js init projectName
*/

// 读取文件
const fs = require('fs');
// commander 可以自动的解析命令和参数，用于处理用户输入的命令
const program = require('commander');
// 下载模板
const download = require('download-git-repo');
// 使用 inquirer 接收用户的输入并作出相应的处理
const inquirer = require('inquirer');
// 视觉美化相关
// 使用 ora 来提示用户正在下载中。
const ora = require('ora');
// 使用 chalk 来为打印信息加上样式，比如成功信息为绿色，失败信息为红色
const chalk = require('chalk');
// 使用 log-symbols 在信息前面加上 √ 或 × 等的图标
const symbols = require('log-symbols');

program
  .version('1.0.0', '-v, --version')
  .command('init <name>')
  .action(name => {
    // 判断项目是否已经存在
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            name: 'author',
            message: '请输入作者名称'
          },
          {
            name: 'description',
            message: '请输入项目描述'
          }
        ])
        .then(answers => {
          const spinner = ora('正在下载模板...');
          spinner.start();
          // 下载路径
          download(
            'direct:git@github.com:OneTraveller/react-manage.git',
            name,
            { clone: true },
            err => {
              if (err) {
                spinner.fail();
                console.log(symbols.error, chalk.red(err));
              } else {
                spinner.succeed();
                // 修改package.json文件，暂时没有找到更好的方法...
                // 读取package.json文件
                const fileName = `${name}/package.json`;
                const content = JSON.parse(fs.readFileSync(fileName));
                content.name = name;
                content.author = answers.author;
                content.description = answers.description;
                const afterContent = JSON.stringify(content, null, 2);
                // 修改package.json文件
                fs.writeFile(fileName, afterContent, function(err) {
                  if (err) console.error(err);
                });
                console.log(symbols.success, chalk.green('项目下载完成'));
              }
            }
          );
        });
    } else {
      console.log(symbols.error, chalk.red('项目已经存在'));
    }
  });
program.parse(process.argv);
