import { checkAuth } from "../services/spotifyService";

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

export const checkBearerWithSpotify = async (req, res, next) => {
  console.log("checkBearerWithSpotify");
  try {
    /*  console.log(req.headers); */
    const token = req.headers.authorization;
    console.log(token);
    await checkAuth(token);
    next();
  } catch (e) {
    //TODO: Expired -> do Refresh
    console.log("checkBearerWithSpotify error");
    res.sendStatus(403);
  }
};
