import express from "express";
import cors from "cors";
import { spotifyRouter } from "./routes/spotifyRouter";
import { authRouter } from "./routes/authRouter";
import { FRONTEND_URL, PORT } from "./config";

const app = express();

app.use(cors({ credentials: true, origin: FRONTEND_URL }));

app.use("/api", spotifyRouter);
app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
