import OpenAPI from "@tinkoff/invest-openapi-js-sdk";
import dotenv from "dotenv";
import { isExistTable } from "./db.js";
dotenv.config();

const apiURL = process.env.TINK_API_URL;
const socketURL = process.env.TINK_SOCKET_URL;
const secretToken = process.env.TINK_SECRET_TOKKEN;

const api = new OpenAPI({ apiURL, secretToken, socketURL });

const interval = process.env.MINUTES * 60 * 1000;

const getAndSaveData = async (ticker) => {
  try {
    const { figi } = await api.searchOne({ ticker: ticker.toUpperCase() });
    const res = await api.orderbookGet({ figi: figi, depth: 1 });
    const time = new Date();

    isExistTable(
      ticker.toLowerCase(),
      res.asks[0].price,
      res.bids[0].price,
      `${time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`}:${
        time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`
      }`
    );

    // isExistTable(ticker.toLowerCase(), 1000, 999, `12:00`);

    // isExistTable(ticker.toLowerCase(), 999, 998, `12:05`);

    // isExistTable(ticker.toLowerCase(), 998, 997, `12:10`);

    // isExistTable(ticker.toLowerCase(), 1003, 1002, `12:15`);

    // isExistTable(ticker.toLowerCase(), 1010, 1009, `12:20`);

    // isExistTable(ticker.toLowerCase(), 1015, 1014, `12:25`);
  } catch (e) {
    console.log("ERROR IN GETTING PRICE", e);
  }
};

export const createHandler = (ticker) => {
  setInterval(() => {
    getAndSaveData(ticker);
  }, interval);
};
