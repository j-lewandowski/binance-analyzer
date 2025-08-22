import { config as dotenv } from "dotenv";

dotenv();

export const configService = {
  PORT: parseInt(process.env.PORT || "3000"),
};
