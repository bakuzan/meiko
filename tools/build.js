const { blue, green, cyan, magenta, red } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const stdio = ['pipe', 'pipe', 'inherit'];

const outputRoot = path.join(__dirname, '../modules/');
const libRoot = path.join(__dirname, '../lib/');
const typesRoot = path.join(__dirname, '../dist/out-tsc');

const clean = async (dir) => fse.existsSync(dir) && fse.remove(dir);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await clean(outputRoot);
  await fn();
  console.log(magenta('Built: ') + green(name));
};

const shell = (cmd) => execa.shell(cmd, { stdio: ['pipe', 'pipe', 'inherit'] });

const buildLib = step('Library', async () => {
  await shell(
    `npx babel ${libRoot} --out-dir ${outputRoot} --extensions=.ts,.tsx,.js --presets @babel/preset-typescript --plugins babel-plugin-styled-components --copy-files --source-maps --env-name "lib"`
  );
  console.log(blue('Built modules'));
  await shell(`tsc --emitDeclarationOnly`);

  console.log(blue('Generated declarations'));
});

buildLib()
  .then(() => console.log(green('Done\n')))
  .catch((err) => {
    if (err) {
      console.error(red(err.stack || err.toString()));
    }

    process.exit(1);
  });
