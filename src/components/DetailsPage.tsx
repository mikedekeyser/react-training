import React, { useContext, useEffect, useState } from 'react';
import { ITradingData, IWatchItem } from '../services/Interfaces';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { StockGraph } from './StockGraph'
import { getTransactions } from '../repository/GetTransactions';
// import { NewStockChart } from './NewStockChart'
// import { appContext } from '../App';
// import { IFollowedStock } from '../services/Interfaces';

export const DetailsPage = (props: { tradingData: ITradingData }) => {
    // const appData = useContext(appContext);

    useEffect(() => {
        getTransactions(props.tradingData.setTransactions);
    }, []);

    interface IRowData {
        date: string;
        stock: string;
        amount: number;
        direction: string;
        price: number;
        total: number;
    }
    //const [rowData, setRowData] = useState<IRowData[]>();
    const rowData = props.tradingData?.transactions?.map(transaction => {
        // let currentPrice = 0;
        // if (props.tradingData && props.tradingData.watchList) {
        //     const foundStock = props.tradingData.watchList.find(x => x.symbol === transaction.symbol) as IWatchItem;
        //     if (foundStock) currentPrice = foundStock.price;
        // }
        const currentPrice = props.tradingData?.watchList?.find(x => x.symbol === transaction.symbol)?.price;
        const row = {
            'date': transaction.date
            , 'stock': transaction.symbol
            , 'amount': transaction.amount
            , 'direction': transaction.side
            , 'total': transaction.amount * ((currentPrice ? currentPrice : 0) as number)
            , 'price': currentPrice
        };
        return row;
    });

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (params: { value: number | bigint }) => {
        return params.value ? formatter.format(params.value) : '';
    };

    return (
        <div>
            <table>
                <tr>
                    <StockGraph tradingData={props.tradingData} />
                </tr>
                <tr>
                    <div className="ag-theme-alpine" style={{ height: 400, width: 1600 }}>
                        <AgGridReact rowData={rowData} >
                            <AgGridColumn field="date"></AgGridColumn>
                            <AgGridColumn field="stock"></AgGridColumn>
                            <AgGridColumn field="amount"></AgGridColumn>
                            <AgGridColumn field="direction"></AgGridColumn>
                            <AgGridColumn field="price" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                            <AgGridColumn field="total" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                        </AgGridReact>
                    </div>
                </tr>
            </table>
        </div>
    );
};