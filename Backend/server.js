import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../Frontend/vite-project/dist"))
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Frontend/vite-project/dist", "index.html")
    );
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port :", PORT);
  });
});
