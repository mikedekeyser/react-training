import {mockAPIServerURL} from '../App'

export function callAPI(url: string, setter:Function, requestOptions:RequestInit|null) {
    const defaultRequestOptions = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(requestOptions?.body), // body data type must match "Content-Type" header
        ...requestOptions,
    } as RequestInit

    fetch(`${mockAPIServerURL}${url}`, defaultRequestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        } return response.json();            
    })
    .then(data => {
        console.log(data);
        setter(data);
    });        
}