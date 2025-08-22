import { Spot } from "@binance/spot";

export const client = new Spot({
  configurationWebsocketAPI: {
    apiKey: "",
    apiSecret: "",
    wsURL: "wss://ws-api.binance.com:443/ws-api/v3",
  },
});
