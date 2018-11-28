const { green, cyan, magenta, red } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const stdio = ['pipe', 'pipe', 'inherit'];

const outputRoot = path.join(__dirname, '../modules/');
const libRoot = path.join(__dirname, '../lib/');

const clean = async (dir) => fse.existsSync(dir) && fse.remove(dir);

const step = (name, root, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await clean(root);
  await fn();
  console.log(magenta('Built: ') + green(name));
};

const buildLib = step('commonjs modules', outputRoot, () =>
  execa.shell(`npx babel ${libRoot} --out-dir ${outputRoot} --env-name "lib"`, {
    stdio
  })
);

console.log(green('Building library\n'));

Promise.resolve(buildLib()).catch((err) => {
  if (err) {
    console.error(red(err.stack || err.toString()));
  } else {
    console.log(green('Built library\n'));
  }

  process.exit(1);
});
