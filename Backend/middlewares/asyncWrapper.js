/**
 *
 * @param {*} func
 * @returns a function wrapping with try catch
 */

const asyncWrapper = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
