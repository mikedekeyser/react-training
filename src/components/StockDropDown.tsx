import { useState, useEffect } from 'react'
import { IAppData, IStock } from '../services/Interfaces'
import { getStocks } from '../repository/GetStocks'
import { setSyntheticLeadingComments } from 'typescript';

export const StockDropDown = ((props: {appData:IAppData; selected:string; setSelected: Function; }) => {
    useEffect(() => {
        if (!props.appData.stocks) getStocks(props.appData.setStocks);
    }, [props.appData.stocks])

    return (
        <div>
            <select className="modal__dropdown" value={props.selected} onChange={(e) => { props.setSelected(e.target.value) }} >
                {props.appData.stocks 
                ? props.appData.stocks.map((stock) =>
                    <option key={stock.symbol} value={stock.symbol}>
                        {stock.name}
                    </option>
                )
                : 'loading ...'}
            </select>
        </div>
    )
})