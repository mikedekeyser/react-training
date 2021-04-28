import { useState, useEffect } from 'react'
import { IStock } from '../services/Interfaces'
import { callAPI } from '../services/CallAPI'

export const StockDropDown = ((props: {setSelected: Function; defaultSelected: string;})=>{
    const [stocks, setStocks] = useState<IStock[]>();
    useEffect(() => {
        callAPI('/stocks', setStocks, null);
    }, []);

    useEffect(() => {
        props.setSelected(stocks ? stocks[0].symbol : '');
    }, [stocks])

    return (
        <div>
            <select className="modal__dropdown" onChange={(e) => { props.setSelected(e.target.value) }}>
                {stocks ? stocks.map((stock) =>
                    <option key={stock.symbol} value={stock.symbol}>
                        {stock.name}
                    </option>)
                    : 'loading ...'}
            </select>
        </div>
    )
})