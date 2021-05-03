import { currentUser } from '../App'
import { callAPI } from "../services/CallAPI";

export const addWatchItem = (symbol: string, callback: Function) => {
    callAPI('/userdata/watchlist', callback, {
        method: 'POST',
        headers: { userid: currentUser },
        body: JSON.stringify({ "symbol": symbol, "action": "ADD" }),
    });
}