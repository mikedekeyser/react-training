import { useState, useEffect } from 'react'
import { IAppData, IStock } from '../services/Interfaces'
import { getStocks } from '../repository/GetStocks'

export const StockDropDown = ((props: {appData:IAppData;  setSelected: Function; }) => {
    const [stocks, setStocks] = useState<IStock[]>();
    useEffect(() => {
        getStocks(setStocks);
    }, [])

    return (
        <div>
            <select className="modal__dropdown" onChange={(e) => { props.setSelected(e.target.value) }} >
                <option >Select a stock</option>
                {stocks 
                ? stocks.map((stock) =>
                    (stock.symbol==props.appData.currentStock)
                    ?<option key={stock.symbol} value={stock.symbol} selected>
                        {stock.name}
                    </option>
                    :<option key={stock.symbol} value={stock.symbol}>
                        {stock.name}
                    </option>
                )
                : 'loading ...'}
            </select>
        </div>
    )
})