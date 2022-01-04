export const asyncMiddleware = (fn) => (req, res, next) => {
  console.log("async middlwrare");

  Promise.resolve(fn(req, res, next)).catch(next);
};
