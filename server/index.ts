import express from "express";
import cors from "cors";
import { spotifyRouter } from "./routes/spotifyRouter";
import { authRouter } from "./routes/authRouter";
import { FRONTEND_URL, PORT } from "./config";
import path from "path";
const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api", spotifyRouter);
app.use("/api/auth/", authRouter);

if (process.env.NODE_ENV !== "dev") {
  console.log("Serving express static files");
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.listen(PORT, () => {
  console.info(
    `Server listening on port ${PORT} MODE = ${process.env.NODE_ENV}`
  );
});
