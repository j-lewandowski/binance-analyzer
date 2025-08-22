import express from "express";
import { configService } from "./config.js";

const app = express();
const PORT = configService.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on https://localhost:${PORT}`);
});
