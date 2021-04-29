import { callAPI } from "../CallAPI";

export const getStocks = (callback:Function)=>{
    callAPI('/stocks', callback, null);
}