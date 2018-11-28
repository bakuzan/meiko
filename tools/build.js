const { green, cyan, magenta, red } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const stdio = ['pipe', 'pipe', 'inherit'];

const outputRoot = path.join(__dirname, '../modules/');
const libRoot = path.join(__dirname, '../lib/');

const clean = async (dir) => fse.existsSync(dir) && fse.remove(dir);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(magenta('Built: ') + green(name));
};

const buildLib = step('commonjs modules', () =>
  execa.shell(`npx babel ${outputRoot} --env-name "lib"`, {
    stdio
  })
);

const copyFiles = async () => {
  console.log(cyan('Copying files'));
  const [src, dest] = [libRoot, outputRoot];
  try {
    await fse.copy(src, dest);
    console.log(magenta('Copied: ') + green(`${src} => ${dest}`));
  } catch (err) {
    console.error(red(err));
  }
};

console.log(green('Building library\n'));

clean(outputRoot)
  .then(copyFiles)
  .then(buildLib)
  .then(() => console.log(green('Built library\n')))
  .catch((err) => {
    if (err) {
      console.error(red(err.stack || err.toString()));
    }

    process.exit(1);
  });
