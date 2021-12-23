import cors from "cors";
import express from "express";
import path from "path";
import { FRONTEND_URL } from "./config";
import { authRouter } from "./routes/authRouter";
import { spotifyRouter } from "./routes/spotifyRouter";

const PORT = 3000;

const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api/spotify", spotifyRouter);
app.use("/api/auth/", authRouter);

app.use((error, req, res, next) => {
  res.sendStatus(error.response.status)
})

if (process.env.NODE_ENV !== "dev") {
  const reactPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(reactPath));
  app.use(express.static("public"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'))
  })
}
const port = process.env.PORT || PORT
app.listen(port, () => {
  console.info(
    `Server listening on port ${port} MODE = ${process.env.NODE_ENV}`
  );
});
