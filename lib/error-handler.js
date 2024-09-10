// lib/error-handler.js
const errors = [];

const logError = (error) => {
  errors.push(error);
  console.error(`Logged error: ${error}`);
};

const getErrors = () => {
  return errors;
};

module.exports = { logError, getErrors };
