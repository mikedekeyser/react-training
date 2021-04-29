import React, { useContext, useEffect, useState } from 'react';
// import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { IFollowedStock, IUserData } from '../services/Interfaces';
// import { callAPI } from '../services/callAPI';
// import { ButtonCell } from './ButtonCell';

export const AssetsPage = () => {
    // const appData = useContext(appContext);

    // const [userData, setUserData] = useState<IUserData>();
    // useEffect(() => {
    //     callAPI('/userdata', setUserData, {
    //         headers: { userid: 'michael.de.keyser' }
    //     });
    // }, []);

    // const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    // const priceFormatter = (params: { value: number | bigint }) => {
    //     return params.value ? formatter.format(params.value) : '';
    // };

    // interface IRowData {
    //     symbol: string;
    //     amount: number;
    //     currentPrice: number;
    //     total: number;
    //     sell: number;
    // }
    // const [rowData, setRowData] = useState<IRowData[]>();
    // useEffect(() => {
    //     const tempRowData = userData?.allocations.map(allocation => {
    //         let currentPrice = 0;
    //         if (appData && appData.watchList) {
    //             const foundStock = appData.watchList.find(x=>x.symbol===allocation.symbol) as IFollowedStock;
    //             if (foundStock) currentPrice = foundStock.price;
    //         }
    //         const row = { 'amount': allocation.amount, 'currentPrice': currentPrice, 'sell': 0, 'symbol': allocation.symbol, 'total': allocation.amount * currentPrice};
    //         return row;
    //     });
    //     setRowData(tempRowData);
    // }, [userData,appData?.watchList]);

    // const frameworkComponents = {
    //     cellRenderer: ButtonCell
    // }                
    // const cellRendererParams = {
    //     caption: 'sell',
    //     clicked: function (field: any) {
    //         alert('test.');
    //     }            
    // }                    

    return (
        <div className="ag-theme-alpine" style={{ height: 800, width: 1200 }}>
            {/* <AgGridReact
                rowData={rowData}
                frameworkComponents = {frameworkComponents}
            >
                <AgGridColumn field="symbol"></AgGridColumn>
                <AgGridColumn field="amount"></AgGridColumn>
                <AgGridColumn field="currentPrice" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                <AgGridColumn field="total" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                <AgGridColumn field="sell"
                    cellRenderer = "cellRenderer"
                    cellRendererParams = {cellRendererParams}
                ></AgGridColumn>
            </AgGridReact> */}
        </div>
    );
};