import { Router } from "express";
import { client } from "../services/websocketService.js";
import { SpotRestAPI, SpotWebsocketAPI } from "@binance/spot";

const historicalMarketRouter = Router();

historicalMarketRouter.get("/data", async (req, res) => {
  const { startTime, endTime, symbol } = req.query;

  if (!symbol) {
    res.status(400).json({
      message: "Symobl must be provided.",
    });
  }

  if (!startTime || !endTime) {
    res.status(400).json({
      message: "Start and end time must be provided.",
    });
  }

  const validatedStartTime = parseInt(startTime as string);
  const validatedEndTime = parseInt(endTime as string);

  if (validatedStartTime > validatedEndTime) {
    res.status(400).json({
      message: "Provided start time needs to be before end time.",
    });
  }

  let connection;

  try {
    connection = await client.websocketAPI.connect();

    const response = await connection.klines({
      symbol: "BNBUSDT",
      startTime: validatedStartTime,
      endTime: validatedEndTime,
      interval: SpotWebsocketAPI.KlinesIntervalEnum.INTERVAL_1h,
    });

    const rateLimits = response.rateLimits!;
    console.log("klines() rate limits:", rateLimits);

    const data = response.data;
    res.json({ data });
  } catch (error) {
    console.error("klines() error:", error);
  } finally {
    await connection!.disconnect();
  }
});

export default historicalMarketRouter;
