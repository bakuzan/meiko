const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const util = require('util');
const execa = require('execa');
const chalk = require('chalk');

const copyFileAsync = util.promisify(fs.copyFile);
const copyDirAsync = util.promisify(fse.copy);

const projectRoot = path.resolve(__dirname, '../lib');
const buildFolder = path.resolve(__dirname, '../build');

async function copyRootFile(fileName) {
  const fromPath = path.resolve(__dirname, '../');
  await copyFileAsync(
    path.resolve(fromPath, fileName),
    path.resolve(buildFolder, fileName)
  );

  console.log(chalk.magenta(`Copied ${fileName} to build\\${fileName}`));
}

async function copyDir(folder) {
  const fromPath = path.resolve(__dirname, '../');
  await copyDirAsync(
    path.resolve(fromPath, folder),
    path.resolve(buildFolder, folder)
  );

  console.log(chalk.magenta(`Copied ${folder} to build\\${folder}`));
}

async function babelJS() {
  await execa.shell(
    `npx babel ${projectRoot} --out-dir ${buildFolder} --extensions=.js --presets @babel/preset-env --copy-files --env-name "lib"`,
    {
      stdio: ['pipe', 'pipe', 'inherit']
    }
  );

  console.log(chalk.green(`Library transpiled successfully.`));
}

async function run() {
  if (fse.existsSync(buildFolder)) {
    await fse.remove(buildFolder);
  }

  await babelJS();
  await copyRootFile('package.json');
  await copyRootFile('README.md');
  await copyDir('types');
}

run();
