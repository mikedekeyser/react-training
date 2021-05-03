import { currentUser } from '../App'
import { callAPI } from "../services/CallAPI";

export const getTransactions = (callback: Function) => {
    callAPI('/transactions', callback, { headers: { userid: currentUser } });
}

