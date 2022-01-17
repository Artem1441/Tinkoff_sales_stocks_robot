import express from "express";
import cors from "cors";
import { createHandler } from "./get_stocks.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Server stated on port: " + PORT);
  createHandler("TSLA");
  createHandler("SBER");
  createHandler("U");
  createHandler("ORCL");
  createHandler("STAG");
  createHandler("DDS");
});
