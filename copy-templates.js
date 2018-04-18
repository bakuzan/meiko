const fs = require('fs');
const path = require('path');

const jsonDir = "./dist/json";
const scssDir = "./lib/styles/templates";
const targetDir = "./dist/templates";
const jsonFiles = fs.readdirSync(jsonDir);
const scssFiles = fs.readdirSync(scssDir);

function copyFile(source, target, cb) {
  let cbCalled = false;
  const rd = fs.createReadStream(source);
  rd.on("error", (err) => done(err));
  const wr = fs.createWriteStream(target);
  wr.on("error", (err) => done(err));
  wr.on("close", (err) => done());
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

const moveFile = file => {
  const source = path.join(scssDir, file);
  const target = path.join(targetDir, file);
  copyFile(
    source,
    target,
    (err) => console.log(`File: ${file}, Done ${!err ? "successfully" : "with errors"}`, !err || err)
  );
}

scssFiles.forEach(moveFile);
