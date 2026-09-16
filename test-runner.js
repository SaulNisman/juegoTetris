#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

const projectPath = 'c:\\Users\\DELL\\OneDrive\\Documentos\\GitHub\\juegoTetris';

console.log('Iniciando tests...\n');

// Ejecutar npm test
const npm = spawn('npm.cmd', ['test'], {
  cwd: projectPath,
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: 'C:\\Program Files\\nodejs;' + process.env.PATH
  }
});

npm.on('close', (code) => {
  console.log(`\nTests finalizados con código: ${code}`);
  process.exit(code);
});
