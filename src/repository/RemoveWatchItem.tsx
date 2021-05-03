import { callAPI } from "../services/CallAPI";
import { IAPIResult } from "../services/Interfaces";
import { currentUser } from '../App'

export const removeWatchItem = ((symbol: string, callback: Function) => {
    callAPI('/userdata/watchlist', (data: IAPIResult) => {
        if (data.success) {
            callback(symbol);
        }
    }, {
        method: 'POST',
        headers: { userid: currentUser },
        body: JSON.stringify({ "symbol": symbol, "action": "REMOVE" }),
    });
});