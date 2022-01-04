import cors from "cors";
import express from "express";
/* import enforce from "express-sslify"; */
import path from "path";
import { FRONTEND_URL, NODE_ENV } from "./config";
import { authRouter } from "./routes/authRouter";
import { spotifyRouter } from "./routes/spotifyRouter";

const PORT = 3000;

export const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api/spotify", spotifyRouter);
app.use("/api/auth/", authRouter);

if (NODE_ENV === "production") {
  console.log("production mode ! ");
  const distpath = path.resolve(__dirname, "..", "..", "src", "dist");
  const indexpath = path.resolve(
    __dirname,
    "..",
    "..",
    "src",
    "dist",
    "index.html"
  );
  console.log(indexpath);
  console.log(distpath);
  app.use(express.static(distpath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(indexpath));
  });
}

const port = process.env.PORT || PORT;

if (NODE_ENV !== "test") {
  // supertest handles express app  instances when testing
  app.listen(port, () => {
    console.info(
      `Server listening on port ${port} MODE = ${process.env.NODE_ENV}`
    );
  });
}

/* const handleErrors = (err, req, res, next) => {
  console.log(err.response.status);
  console.log(err.message);

  res.status(err.response.status).send({ message: err.message });
};

app.use(handleErrors);
 */
