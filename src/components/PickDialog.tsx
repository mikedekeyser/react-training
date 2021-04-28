import { useState } from 'react'
import { callAPI } from '../services/CallAPI'
import { IAPIResult } from '../services/Interfaces'
import {StockDropDown} from './StockDropDown'

export const PickDialog = (props: {callback:Function}) => {
    const [selected, setSelected] = useState('');
    const [apiResult, setAPIResult] = useState<IAPIResult>({
        success: false,
        data: "Click ADD to add to watchlist."
    });

    const addStockToWatchList = (symbol: string, callback:Function) => {
        setAPIResult({ success: false, data: "processing ..." });
        callAPI('/userdata/watchlist', setAPIResult, {
            method: 'POST',
            headers: { userid: 'michael.de.keyser' },
            body: JSON.stringify({ "symbol": symbol, "action": "ADD" }),
        });
        if (apiResult?.success) callback(symbol);
    }

    return (
        <div>
            <h2 className="modal__h2">Select a new stock to follow</h2>
            <StockDropDown defaultSelected='' setSelected={setSelected}/>
            <button className="modal__btn" onClick={() => addStockToWatchList(selected, props.callback)}>Add</button>
            <div>
                {apiResult?.data}
            </div>
        </div>
    );
}