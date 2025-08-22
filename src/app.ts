import express from "express";
import { configService } from "./config.js";

import historicalMarketRouter from "./routes/historical-market.js";

const app = express();
const PORT = configService.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/historical-market", historicalMarketRouter);

app.listen(PORT, () => {
  console.log(`Listening on https://localhost:${PORT}`);
});
