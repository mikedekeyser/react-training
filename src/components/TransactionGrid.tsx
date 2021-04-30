import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GridReadyEvent } from 'ag-grid-community';
import { getTransactions } from '../repository/GetTransactions';
import { ITradingData } from '../services/Interfaces';

export const TransactionGrid = (props: { tradingData: ITradingData }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

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
    const [rowData, setRowData] = useState<IRowData[]>();
    useEffect(() => {
        const tempRowData = props.tradingData?.transactions?.map(transaction => {
            const row = {
                'date': transaction.date
                , 'stock': transaction.symbol
                , 'amount': transaction.amount
                , 'direction': transaction.side
                , 'total': transaction.amount * transaction.tickPrice
                , 'price': transaction.tickPrice
            };
            return row;
        });
        setRowData(tempRowData);
    }, [props.tradingData?.transactions]);

    // const [rowData, setRowData] = useState([
    //     { make: "Toyota", model: "Celica", price: 35000 },
    //     { make: "Ford", model: "Mondeo", price: 32000 },
    //     { make: "Porsche", model: "Boxter", price: 72000 }
    // ]);
    // const [rowData, setRowData] = useState([
    //     { date: "10/24/1928", stock: "ACME", amount: 35, direction:"BUY", price:54.24, total:562 },
    //     { date: "10/24/1928", stock: "ACME", amount: 35, direction:"BUY", price:54.24, total:562 },
    //     { date: "10/24/1928", stock: "ACME", amount: 35, direction:"BUY", price:54.24, total:562 },
    // ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 1600 }}>
            {/* <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
            </AgGridReact> */}
            <AgGridReact rowData={rowData}>
                <AgGridColumn field="date"></AgGridColumn>
                <AgGridColumn field="stock"></AgGridColumn>
                <AgGridColumn field="amount"></AgGridColumn>
                <AgGridColumn field="direction"></AgGridColumn>
                <AgGridColumn field="price" type='rightAligned' ></AgGridColumn>
                <AgGridColumn field="total" type='rightAligned'  ></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

