import cors from "cors";
import express from "express";
/* import enforce from "express-sslify"; */
import path from "path";
import { FRONTEND_URL } from "./config";
import { authRouter } from "./routes/authRouter";
import { spotifyRouter } from "./routes/spotifyRouter";

const PORT = 3000;

export const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api/spotify", spotifyRouter);
app.use("/api/auth/", authRouter);

console.log(process.env.NODE_ENV)

// if (process.env.NODE_ENV === "production") {
//   /*  app.use(enforce.HTTPS()); */
//   const reactPath = path.resolve(__dirname, "../../client/dist");
//   console.log(reactPath);
//   app.use(express.static(reactPath));
//   app.use(express.static("public")); 
//   app.use((req, res, next) => {
//     console.log(path.join(__dirname, reactPath, 'index.html'))
//     res.sendFile(path.join(__dirname, reactPath, 'index.html'));
//   });
// }

/* const reactPath = path.resolve(__dirname, "../dist");
console.log(reactPath);
console.log(reactPath);
console.log(path.join(reactPath, 'index.html')) */
if (process.env.NODE_ENV === 'production') {
  const reactPath = path.resolve(__dirname, "../dist");
  console.log(reactPath);
  app.use(express.static(reactPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(reactPath, 'index.html'));
  });
}
// Error: ENOENT: no such file or directory, stat '/app/server/dist/public/index.html'
const port = process.env.PORT || PORT

if (process.env.NODE_ENV !== 'test') {

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