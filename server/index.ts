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

if (NODE_ENV === 'production') {

  const distpath = require('path').resolve(__dirname, '..', '..', "src", "dist",)
  const indexpath = require('path').resolve(__dirname, '..', '..', "src", "dist", "index.html")

  app.use(express.static(distpath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(indexpath));
  });
}

// Error: ENOENT: no such file or directory, stat '/app/server/dist/public/index.html'
const port = process.env.PORT || PORT
//@ts-ignore
if (NODE_ENV !== 'test') {

  app.listen(port, () => {
    console.info(
      `Server listening on port ${port} MODE = ${process.env.NODE_ENV}`
    );
  });

}


/* else {
  app.listen(() => {

    console.info(
      `Server listening on MODE = ${process.env.NODE_ENV}`
    );
  });
} */


/* app.listen(port, () => {
  console.info(
    `Server listening on port ${port} MODE = ${process.env.NODE_ENV}`
  );
}); */

/*

app.use((error, req, res, next) => {
  res.sendStatus(error.response.status)
})
*/