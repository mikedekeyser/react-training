import React, { useContext, useEffect, useState } from 'react';
// import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import { StockGraph } from './StockGraph'
// import { NewStockChart } from './NewStockChart'
// import { appContext } from '../App';
// import { IFollowedStock } from '../services/Interfaces';

export const DetailsPage = () => {
    // const appData = useContext(appContext);

    // useEffect(() => {
    //     appData?.refreshTransactions();
    // }, []);

    // interface IRowData {
    //     date: string;
    //     stock: string;
    //     amount: number;
    //     direction: string;
    //     price: number;
    //     total: number;
    // }
    // const [rowData, setRowData] = useState<IRowData[]>();
    // useEffect(() => {
    //     const tempRowData = appData?.transactions?.map(transaction => {
    //         let currentPrice = 0;
    //         if (appData && appData.watchList) {
    //             const foundStock = appData.watchList.find(x => x.symbol === transaction.symbol) as IFollowedStock;
    //             if (foundStock) currentPrice = foundStock.price;
    //         }
    //         const row = {
    //             'date': transaction.date
    //             , 'stock': transaction.symbol
    //             , 'amount': transaction.amount
    //             , 'direction': transaction.side
    //             , 'total': transaction.amount * currentPrice
    //             , 'price': currentPrice
    //         };
    //         return row;
    //     });
    //     setRowData(tempRowData);
    // }, [appData?.transactions, appData?.watchList]);

    // const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    // const priceFormatter = (params: { value: number | bigint }) => {
    //     return params.value ? formatter.format(params.value) : '';
    // };

    return (
        <div>
            {/* <StockGraph />

            <div className="ag-theme-alpine" style={{ height: 800, width: 1200 }}>
                <AgGridReact
                    rowData={rowData}
                >
                    <AgGridColumn field="date"></AgGridColumn>
                    <AgGridColumn field="stock"></AgGridColumn>
                    <AgGridColumn field="amount"></AgGridColumn>
                    <AgGridColumn field="direction"></AgGridColumn>
                    <AgGridColumn field="price" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                    <AgGridColumn field="total" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                </AgGridReact>
            </div> */}
        </div>
    );
};