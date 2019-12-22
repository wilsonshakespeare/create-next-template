// Note: This Run From Wherever the current process is

let shell = require('shelljs');
let colors = require('colors');

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
  checkNodeVersion();
  checkGit();
  mkDirAndCd();
  cloneTemplate();
  console.log('Next Js Template Successfully Created');
};

function checkGit() {
  if (!shell.which('git')) {
    shell.echo('Please install git for this template creation');
    shell.exit(1);
  }
}

// TODO: make this into utils with comparable class
function checkNodeVersion() {
  if (!shell.which('node')) {
    shell.echo('Please install node v10 for this template');
    shell.exit(1);
  }

  shell.exec('Checking Node Version:');
  const version = shell.exec('node -v').toString();
  const [major, minor, release] = version.split('.');
  const majorNum = parseInt(major.replace('v', ''), 10);
  if (majorNum !== 10) {
    console.log('Please use node version 10 for this template');
    shell.exit(1);
  }
}

function mkDirAndCd() {
  shell.cd(process.cwd());
  if (shell.test('-d', appName)) {
    console.log(
      `${appDirectory} already exist, will not proceed on creating template`
    );
    shell.exit(1);
  }
}

function cloneTemplate() {
  shell.exec(`git clone https://github.com/wilsonshakespeare/next-js-template.git ${appName}`);
  shell.cd(appName);
  console.log('Removing .git');
  shell.rm('-rf', '.git');
  // Installs dependencies without breaking package-lock.json
  // TODO: Add npm ci when boilerplate created
  // shell.exec('npm ci');
}

run();
