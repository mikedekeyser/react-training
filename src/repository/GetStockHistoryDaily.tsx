import { callAPI } from "../services/CallAPI";

export const getStockHistoryDaily = (symbol: string, callback: Function) => {
    callAPI(`/stocks/${symbol}/price/today`, callback, {});
}

