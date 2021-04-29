import { callAPI } from "../services/CallAPI";

export const getUserData = (callback:Function)=>{
    callAPI('/userdata', callback, {
        headers: { userid: 'michael.de.keyser' },
    });
}