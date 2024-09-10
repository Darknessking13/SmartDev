const chalk = require('chalk');

let figures = null;

const loadFigures = async () => {
  if (!figures) {
    figures = (await import('figures')).default; // Dynamic import of figures
  }
};

const logInfo = async (message) => {
  await loadFigures(); // Ensure figures is loaded
  console.log(chalk.blue(`[ SmartDev ]: ${message}`));
};

const logError = async (message) => {
  await loadFigures();
  console.log(chalk.red(`[ ERROR ]: ${figures.cross} ${message}`));
};

const logSuccess = async (message) => {
  await loadFigures();
  console.log(chalk.green(`[ SUCCESS ]: ${figures.tick} ${message}`));
};

module.exports = { logInfo, logError, logSuccess };
