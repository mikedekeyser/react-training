import { callAPI } from "../services/CallAPI";
import { IAPIResult } from "../services/Interfaces";

export const removeWatchItem = ((symbol:string, callback:Function)=>{
    callAPI('/userdata/watchlist', (data: IAPIResult) => {
        if (data.success) {
            callback(symbol);
        }
    }, {
        method: 'POST',
        headers: { userid: 'michael.de.keyser' },
        body: JSON.stringify({ "symbol": symbol, "action": "REMOVE" }),
    });
});