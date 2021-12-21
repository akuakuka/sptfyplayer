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
  const reactPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(reactPath));
  app.use(express.static("public"));
  app.get('*',  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.info(
    `Server listening on port ${PORT} MODE = ${process.env.NODE_ENV}`
  );
});
