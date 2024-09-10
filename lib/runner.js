const { spawn } = require('child_process');
const { logInfo, logError, logSuccess } = require('./logger');
const chalk = require('chalk');

let childProcess = null;

const pathoffile = process.argv[2];

const runProcess = async (entryPoint) => {
  try {
    if (childProcess) {
      childProcess.kill('SIGTERM'); 
    }

    await logInfo(chalk.green(`SmartDev is Starting with ${pathoffile}`));

    childProcess = spawn('node', [entryPoint], { stdio: ['pipe', 'inherit', 'inherit'] });

    childProcess.on('exit', async (code) => {
      await logSuccess(`Process exited with code: ${code}`);
    });

    childProcess.on('error', async (error) => {
      await logError(`Error starting process: ${error.message}`);
    });
  } catch (error) {
    await logError(`Failed to start process: ${error.message}`);
  }
};

const restartProcess = async (entryPoint) => {
  await logInfo(chalk.yellow(`Restarting process due to file changes...`));

  try {
    await runProcess(entryPoint);
    await logSuccess('Process restarted successfully!');
  } catch (error) {
    await logError(`Error restarting process: ${error.message}`);
  }
};

module.exports = { runProcess, restartProcess };
