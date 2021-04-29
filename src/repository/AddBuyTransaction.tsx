import { callAPI } from "../services/CallAPI";

export const addBuyTransaction = (symbol:string, amount:Number, callback:Function)=>{
    callAPI('/transactions', callback, {
        method: 'POST',
        headers: { userid: 'michael.de.keyser' },
        body: JSON.stringify({ "symbol": symbol, "side": "BUY", "amount": amount}),
    });
}