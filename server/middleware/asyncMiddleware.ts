export const asyncMiddleware = fn => (req, res, next) => {
    console.log("asyncMiddleware")
    Promise.resolve(fn(req, res, next))
        .catch(next);
};