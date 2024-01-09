import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { auth, notes } from "./routes";
// import auth from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());

// Available Routes
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.get("/", (req: Request, res: Response) => {
  connectDB();
  res.json({ name: "aniket", surname: "dandekar", class: "badi" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
