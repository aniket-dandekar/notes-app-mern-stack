import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({ name: "aniket", surname: "dandekar", class: "badi" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
