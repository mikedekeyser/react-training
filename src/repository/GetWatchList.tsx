import { currentUser } from '../App'
import { callAPI } from "../services/CallAPI";

export const getWatchList = (callback: Function) => {
    callAPI('/userdata/watchlist', callback, {
        headers: { userid: currentUser },
    });
}