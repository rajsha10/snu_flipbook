const { spawn } = require('child_process');
const path = require('path');

// Replace 'your_python_script.py' with the actual name of your Python script

const runAiScript = () => {
  const ROOT_DIR = path.resolve();
  const pythonProcess = spawn('python',[`${ROOT_DIR}/Python/output.py`]);
  pythonProcess.stdout.on('data', (data) => {
  console.log(`Python Output: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
});
}

module.exports = { runAiScript };