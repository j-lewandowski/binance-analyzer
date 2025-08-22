import { Router } from "express";
import { client } from "../services/websocketService.js";
import { SpotRestAPI, SpotWebsocketAPI } from "@binance/spot";

const historicalMarketRouter = Router();

historicalMarketRouter.get("/data", async (req, res) => {
  let connection;

  try {
    connection = await client.websocketAPI.connect();

    const response = await connection.klines({
      symbol: "BNBUSDT",
      // startTime: 1655969280000,
      // endTime: 1655969290000,
      interval: SpotWebsocketAPI.KlinesIntervalEnum.INTERVAL_1h,
    });

    const rateLimits = response.rateLimits!;
    console.log("klines() rate limits:", rateLimits);

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("klines() error:", error);
  } finally {
    await connection!.disconnect();
  }
});

export default historicalMarketRouter;
