const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\DELL\\OneDrive\\Documentos\\GitHub\\juegoTetris';
const outputFile = path.join(projectDir, 'test-results.txt');

try {
  console.log('Ejecutando npm test...');
  const output = execSync('npm test', {
    cwd: projectDir,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      PATH: 'C:\\Program Files\\nodejs;' + process.env.PATH
    }
  });
  
  fs.writeFileSync(outputFile, output, 'utf8');
  console.log('Tests completados. Output guardado en: ' + outputFile);
  console.log(output);
} catch (error) {
  const output = error.stdout || '';
  const stderr = error.stderr || '';
  fs.writeFileSync(outputFile, output + '\n' + stderr, 'utf8');
  console.log('Error durante tests: ' + error.message);
  console.log(error.stdout);
  console.log(error.stderr);
}
