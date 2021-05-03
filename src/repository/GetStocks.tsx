import { callAPI } from "../services/CallAPI";

export const getStocks = (callback: Function) => {
    callAPI('/stocks', callback, null);
}