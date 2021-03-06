#!/usr/bin/env node
// Note: This Run From Wherever the current process is

let shell = require('shelljs');
let colors = require('colors');
let isFilenameValid = require('valid-filename');

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
  if(!isFilenameValid(appName)) {
    shell.echo('Please determine your app name or enter a valid filename');
    shell.exit(1);
  }
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

  console.log('Checking Node Version:');
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
  console.log('Perform npm ci');
  // Installs dependencies without breaking package-lock.json
  shell.exec('npm ci');
  console.log('Process Complete');
  // TODO: sed replace AuthorName (whoami) and app-name in package.json
}


run();
