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
console.log("#########")
console.log({ NODE_ENV })

const reactPath = path.resolve(__dirname, "..", "./dist");
console.log("__dirname")
console.log(__dirname)

console.log("reactPath")
console.log(reactPath)
console.log("path.dirname(filename).split(path.sep).pop()")
console.log(path.dirname(__dirname).split(path.sep).pop())

console.log("path.join(reactPath, 'index.html')")
console.log(path.join(reactPath, 'index.html'))

console.log("require('path').resolve(__dirname, '..')")
console.log(require('path').resolve(__dirname, '..'))

console.log("require('path').resolve(__dirname, '..', '..')")
console.log(require('path').resolve(__dirname, '..', '..'))

console.log("require('path').resolve(__dirname, '..', '..' src)")
console.log(require('path').resolve(__dirname, '..', '..', "src", "dist", "index.html"))

if (NODE_ENV === 'production') {
  const reactPath = path.resolve(__dirname, "..", "./dist");
  console.log("__dirname")
  console.log(__dirname)

  console.log("reactPath")
  console.log(reactPath)


  console.log("path.join(reactPath, 'index.html')")
  console.log(path.join(reactPath, 'index.html'))
  const kk = require('path').resolve(__dirname, '..', '..', "src", "dist",)
  const pp = require('path').resolve(__dirname, '..', '..', "src", "dist", "index.html")

  app.use(express.static(kk));

  app.get('*', (req, res) => {
    console.log("serving from :")
    console.log(path.join(pp));
    res.sendFile(path.join(pp));
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