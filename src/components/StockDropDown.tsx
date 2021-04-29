import { useState, useEffect } from 'react'
import { IStock } from '../services/Interfaces'
import {getStocks} from '../repository/GetStocks'

export const StockDropDown = ((props: {setSelected: Function;})=>{
    const [stocks, setStocks] = useState<IStock[]>();
    useEffect(()=>{
        getStocks(setStocks);
    },[])

    return (
        <div>
            <select className="modal__dropdown" onChange={(e) => { props.setSelected(e.target.value) }} >
                <option >Select a stock</option>
                {stocks ? stocks.map((stock) =>
                    <option key={stock.symbol} value={stock.symbol}>
                        {stock.name}
                    </option>)
                    : 'loading ...'}
            </select>
        </div>
    )
})