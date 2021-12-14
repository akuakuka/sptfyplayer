const ensureBearer = (req, res, next) => {
  const { X_expires, X_refresh_token } = req.headers;
  if (!X_expires || !X_refresh_token) {
    res.send(403);
  }
  const epoch = Math.round(Date.now() / 1000);
  if (X_expires < epoch) {
    //DO REFRESH
    console.log("Refreshing token");
  } else {
    next();
  }
};
