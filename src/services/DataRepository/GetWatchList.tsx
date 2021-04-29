import { callAPI } from "../CallAPI";

export const getWatchList = (callback:Function)=>{
    callAPI('/userdata/watchlist', callback, {
        headers: { userid: 'michael.de.keyser' },
    });
}