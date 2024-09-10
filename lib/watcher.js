const chokidar = require('chokidar');
const { runProcess, restartProcess } = require('./runner');
const { logInfo, logError } = require('./logger');
const readline = require('readline');
const chalk = require('chalk');
let rl; // Define readline interface

const startWatching = async (entryPoint) => {
  await logInfo(chalk.green(`Watching for file changes...`));

  const watcher = chokidar.watch(['**/*.js', '**/*.mjs', '**/*.ejs', '**/*.cjs'], {
    ignored: /node_modules/,
    persistent: true,
  });

  await logInfo(chalk.yellow(`[ SmartDev ]: Type "smartdev rs" to restart manually, or "smartdev close" to stop.`));

  watcher.on('change', async (filePath) => {
    await logInfo(`File changed: ${filePath}`);
    await restartProcess(entryPoint);
  });

  watcher.on('error', async (error) => {
    await logError(chalk.red(`[ SmartDev ]: Error while watching files: ${error}`));
  });

  await runProcess(entryPoint); // Start the process initially
};

const manualRestart = async (entryPoint) => {
  // Initialize the readline interface only if it's not already active
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', async (input) => {
      const command = input.trim();

      // Restart the process when "smartdev rs" is typed
      if (command === 'smartdev rs') {
        await logInfo(chalk.yellow(`[ SmartDev ]: Manual restart initiated by user`));
        await restartProcess(entryPoint);
      }

      // Close the watcher and exit the process when "smartdev close" is typed
      else if (command === 'smartdev close') {
        await logInfo(chalk.red(`[ SmartDev ]: Closing SmartDev...`));
        rl.close();  // Close the readline interface
        process.exit(0);  // Exit the process
      }

      // Start monitor only when readline is active
      else if (command === 'smartdev monitor') {
        await logInfo(chalk.green(`[ SmartDev ]: Starting monitor...`));
        if (rl) {
          const { startMonitor } = require('./monitor');
          startMonitor();  // Call the monitor function
        } else {
          await logError(chalk.red(`[ SmartDev ]: Readline is not active. Unable to start monitor.`));
        }
      } else {
        await logInfo(chalk.red(`[ SmartDev ]: Unknown command. Use "smartdev rs", "smartdev close", or "smartdev monitor".`));
      }
    });
  } else {
    await logError(chalk.red(`[ SmartDev ]: Readline is already active. You can type "smartdev rs", "smartdev close", or "smartdev monitor".`));
  }
};

module.exports = { startWatching, manualRestart };
