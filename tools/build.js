const { green, cyan, magenta, red, blue } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const stdio = ['pipe', 'pipe', 'inherit'];

const outputRoot = path.join(__dirname, '../build/');
const libRoot = path.join(__dirname, '../lib/');

const clean = async (dir) => fse.existsSync(dir) && fse.remove(dir);

async function build(folderName) {
  const src = path.join(libRoot, folderName);
  console.log(blue(`Processing: ${src}`));
  return execa.shell(
    `npx babel ${src} --out-dir ${outputRoot} --extensions=.js --presets @babel/preset-env --copy-files --env-name "lib"`,
    {
      stdio
    }
  );
}

async function step(name, folder) {
  console.log(cyan('Building: ') + green(name));
  await build(folder);
  console.log(magenta('Built: ') + green(name));
}

async function buildLib() {
  await clean(outputRoot);
  await step('components', '');
}

console.log(blue('Building library\n'));

buildLib()
  .then(() => console.log(green('Built library\n')))
  .catch((err) => {
    if (err) {
      console.error(red(err.stack || err.toString()));
    }

    process.exit(1);
  });
