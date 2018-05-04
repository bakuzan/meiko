const fs = require('fs');
const path = require('path');

const scssDir = "./lib/styles/templates";
const targetDir = "./dist/templates";
const jsonDir = "./dist/json";
const scssFiles = fs.readdirSync(scssDir);
const RequiredJsonFiles = [
  "AutocompleteInput", "Button", "ChipListInput", "DropdownMenu" "Header", "LoadingBouncer", "RadioButton", "RequestIndicator" "RatingControl", "TabContainer", "Tickbox"
];
const jsonFiles = fs.readdirSync(jsonDir)
.filter(file => RequiredJsonFiles.includes(file.split(".")[0]))
.map(file => require(path.join(__dirname, jsonDir, file)));



function copyFile(source, target, cb) {
  let cbCalled = false, scssOutput = '';

  const rd = fs.createReadStream(source);
  rd.on("data", function replaceSCSSClassesWithJsonClasses(chunk) {
    scssOutput = chunk.toString();
    jsonFiles.forEach(file => {
      Object.keys(file).forEach(k => {
        const pattern = `\\.${k}(?=\\..*,| |:| .*{|\\..*{)`;
        const REPLACE_REGEX = new RegExp(pattern, "g");
        scssOutput = scssOutput.replace(REPLACE_REGEX, `.${file[k]}`)
      });
    });
  });
  rd.on("error", (err) => done(err));
  rd.on("end", () => fs.writeFile(target, scssOutput, cb));
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
