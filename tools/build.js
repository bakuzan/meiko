const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const util = require('util');
const execa = require('execa');
const chalk = require('chalk');

const copyFileAsync = util.promisify(fs.copyFile);

const projectRoot = path.resolve(__dirname, '../');
const buildFolder = path.resolve(__dirname, '../build');

async function copyRootFile(fileName) {
  await copyFileAsync(
    path.resolve(projectRoot, fileName),
    path.resolve(buildFolder, fileName)
  );

  console.log(chalk.magenta(`Copied ${fileName} to ${buildFolder}`));
}

async function babelJS() {
  await execa.shell(
    `npx babel ${src} --out-dir ${buildFolder} --extensions=.js --presets @babel/preset-env --copy-files --env-name "lib"`,
    {
      stdio: ['pipe', 'pipe', 'inherit']
    }
  );

  console.log(chalk.green(`Files in ${buildFolder} transpiled successfully.`));
}

function run() {
  if (fse.existsSync(dir)) {
    fse.remove(dir);
  }

  babelJS();
  copyRootFile('package.json');
  copyRootFile('README.md');
}

run();
