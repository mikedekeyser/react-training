import { callAPI } from "../services/CallAPI";

export const getStockHistory = (symbol:string, callback:Function)=>{
    callAPI(`/stocks/${symbol}/price/today`, callback, {});        
}

