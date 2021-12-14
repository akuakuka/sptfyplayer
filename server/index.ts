import express from "express";
import cors from "cors";
import { spotifyRouter } from "./routes/spotifyRouter";
import { authRouter } from "./routes/authRouter";
import { FRONTEND_URL } from "./config";

const app = express();
const port = 3000;

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api", spotifyRouter);
app.use("/api/auth/", authRouter);

//@ts-ignore
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
