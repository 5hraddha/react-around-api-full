/**
 * Get the error message from the error thrown.
 * @module utils/getErrorMsg
 */

/**
 * Return the error message to display, from the error thrown.
 * @param {Object} err - The error object.
 * @return {String} - A string containing Error Name and Error Messages.
 */
const getErrorMsg = (err) => {
  const errArray = [];
  err.message
    .split(',')
    .forEach((item) => errArray
      .push(item.split(':').slice(-1)));
  return `${err.name} - ${errArray.join(' | ')}`;
};

module.exports = getErrorMsg;
