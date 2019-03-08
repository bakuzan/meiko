const { magenta, blue, green } = require('chalk');
const util = require('util');
const fs = require('fs');
const path = require('path');

// Promisify func
const copyFileAsync = util.promisify(fs.copyFile);

// Get paths
const projectRoot = path.resolve(__dirname, '../');
const distRoot = path.resolve(__dirname, '../dist');
const buildFolder = path.resolve(__dirname, '../build/components');

async function copyPackageJson() {
  const fileName = 'package.json';
  await copyFileAsync(
    path.resolve(projectRoot, fileName),
    path.resolve(buildFolder, fileName)
  );
  console.log(magenta(`Copied ${fileName} to ${buildFolder}`));
}

async function copyBundleStyles() {
  const fileName = 'bundle.min.css';
  await copyFileAsync(
    path.resolve(distRoot, fileName),
    path.resolve(buildFolder, fileName)
  );
  console.log(magenta(`Copied ${fileName} to ${buildFolder}`));
}

async function postBuild() {
  await copyPackageJson();
  await copyBundleStyles();
}

console.log(blue('Starting Post-build...'));
postBuild().then(() => console.log(green('Post-build complete.')));
