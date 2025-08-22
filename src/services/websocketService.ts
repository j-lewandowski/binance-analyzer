import { Spot } from "@binance/spot";

export const client = new Spot({
  configurationWebsocketAPI: {
    apiKey: "",
    apiSecret: "",
    wsURL: "https://api.binance.com",
  },
});
