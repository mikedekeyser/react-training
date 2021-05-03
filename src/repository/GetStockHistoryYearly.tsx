import { callAPI } from "../services/CallAPI";

export const getStockHistoryYearly = (symbol: string, callback: Function) => {
    callAPI(`/stocks/${symbol}/price/yearly`, callback, {});
}

