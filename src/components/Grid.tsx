import { useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getTransactions } from '../repository/GetTransactions';
import { ITradingData } from '../services/Interfaces';
import { GridModesEnum, ModalModesEnum } from '../services/Enums';
import { RowDoubleClickedEvent, RowSelectedEvent } from 'ag-grid-community';
import { getUserData } from '../repository/GetUserData';

export const Grid = (props: { tradingData: ITradingData, mode: GridModesEnum, setIsModalVisible: Function, setModalMode: Function }) => {
    useEffect(() => {
        if (!props.tradingData.transactions)
            getTransactions(props.tradingData.setTransactions);
        if (!props.tradingData.userData)
            getUserData(props.tradingData.setUserData);
        if (!props.tradingData.currentStock)
            props.tradingData.setCurrentStock('ACME');
    }, []);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (params: { value: number | bigint }) => {
        return params.value ? formatter.format(params.value) : '';
    };
    function dateFormatter(params: { data: { date: any; }; }) {
        var dateAsString = params.data.date;
        var dateParts = dateAsString.split('/');
        return params.data ? `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2]}` : '';
    }

    let transactionData = [{}];
    let columns = null;
    switch (props.mode) {
        case GridModesEnum.ASSETS:
            // summarize total assets or call userdata including current worth
            transactionData = props.tradingData?.userData?.allocations?.map(allocation => {
                const currentPrice = props.tradingData?.stocks?.find((s) => s.symbol === allocation?.symbol)?.lastTick.price;
                return {
                    'stock': allocation?.symbol
                    , 'amount': allocation?.amount
                    , 'currentPrice': currentPrice
                    , 'currentWorth': allocation?.amount * (currentPrice ? currentPrice : 0)
                };
            });

            columns = (
                <div>
                    <AgGridColumn field="stock"></AgGridColumn>
                    <AgGridColumn field="amount"></AgGridColumn>
                    <AgGridColumn field="currentPrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                    <AgGridColumn field="currentWorth" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                </div>
            );
            break;
        case GridModesEnum.DETAILS:
            // display transactions of specific stock minus current values (shown on graph)
            transactionData = props.tradingData?.transactions?.filter((t) => t.symbol === props.tradingData.currentStock).map(transaction => {
                return {
                    'date': transaction.date
                    , 'stock': transaction.symbol
                    , 'amount': transaction.amount
                    , 'direction': transaction.side
                    , 'purchasePrice': transaction.tickPrice
                    , 'cost': transaction.amount * transaction.tickPrice
                };
            });
            columns = (
                <div>
                    <AgGridColumn field="date" ></AgGridColumn>
                    <AgGridColumn field="stock"></AgGridColumn>
                    <AgGridColumn field="amount"></AgGridColumn>
                    <AgGridColumn field="direction"></AgGridColumn>
                    <AgGridColumn field="cost" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                    <AgGridColumn field="purchasePrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                </div>
            );
            break;
        case GridModesEnum.TRANSACTIONS:
            // display all transactions minus current values
            transactionData = props.tradingData?.transactions?.map(transaction => {
                return {
                    'date': transaction.date
                    , 'stock': transaction.symbol
                    , 'amount': transaction.amount
                    , 'direction': transaction.side
                    , 'purchasePrice': transaction.tickPrice
                    , 'cost': transaction.amount * transaction.tickPrice
                };
            });
            columns = (
                <div>
                    <AgGridColumn field="date" ></AgGridColumn>
                    <AgGridColumn field="stock"></AgGridColumn>
                    <AgGridColumn field="amount"></AgGridColumn>
                    <AgGridColumn field="direction"></AgGridColumn>
                    <AgGridColumn field="purchasePrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                    <AgGridColumn field="cost" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                </div>
            );

            break;
        default:
            break;
    }

    const onRowDoubleClicked = (e: RowDoubleClickedEvent) => {
        props.tradingData.setCurrentStock(e.node.data.stock);
        props.setModalMode(ModalModesEnum.SELL);
        props.setIsModalVisible(true);
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 1700 }}>
            <AgGridReact rowData={transactionData} onRowDoubleClicked={onRowDoubleClicked}>
                {columns}
            </AgGridReact>
        </div>
    );
};

