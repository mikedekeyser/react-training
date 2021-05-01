import { useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getTransactions } from '../repository/GetTransactions';
import { IAppData } from '../services/Interfaces';
import { GridModesEnum, ModalModesEnum } from '../services/Enums';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { getUserData } from '../repository/GetUserData';

export const Grid = (props: { appData: IAppData, mode: GridModesEnum, setIsModalVisible: Function, setModalMode: Function }) => {
    useEffect(() => {
        if (!props.appData.transactions)
            getTransactions(props.appData.setTransactions);
        if (!props.appData.userData)
            getUserData(props.appData.setUserData);
        if (!props.appData.currentStock)
            props.appData.setCurrentStock('ACME');
    }, []);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (params: { value: number | bigint }) => {
        return params.value ? formatter.format(params.value) : '';
    };
    const onRowDoubleClicked = (e: RowDoubleClickedEvent) => {
        props.appData.setCurrentStock(e.node.data.stock);
        props.setModalMode(ModalModesEnum.SELL);
        props.setIsModalVisible(true);
    }


    let transactionData = [{}];
    let renderedGrid = null;
    switch (props.mode) {
        case GridModesEnum.ASSETS:
            // summarize total assets or call userdata including current worth
            transactionData = props.appData?.userData?.allocations?.map(allocation => {
                const currentPrice = props.appData?.stocks?.find((s) => s.symbol === allocation?.symbol)?.lastTick.price;
                return {
                    'stock': allocation?.symbol
                    , 'amount': allocation?.amount
                    , 'currentPrice': currentPrice
                    , 'currentWorth': allocation?.amount * (currentPrice ? currentPrice : 0)
                };
            });

            renderedGrid = (
                <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
                    <AgGridReact rowData={transactionData} onRowDoubleClicked={onRowDoubleClicked}>
                        <AgGridColumn field="stock"></AgGridColumn>
                        <AgGridColumn field="amount"></AgGridColumn>
                        <AgGridColumn field="currentPrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                        <AgGridColumn field="currentWorth" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                    </AgGridReact>
                </div>
            );
            break;
        case GridModesEnum.DETAILS:
            // display transactions of specific stock minus current values (shown on graph)
            transactionData = props.appData?.transactions?.filter((t) => t.symbol === props.appData.currentStock).map(transaction => {
                return {
                    'date': transaction.date
                    , 'stock': transaction.symbol
                    , 'amount': transaction.amount
                    , 'direction': transaction.side
                    , 'purchasePrice': transaction.tickPrice
                    , 'cost': transaction.amount * transaction.tickPrice
                };
            });
            renderedGrid = (
                <div className="ag-theme-alpine" style={{ height: 400, width: 1300 }}>
                    <AgGridReact rowData={transactionData} onRowDoubleClicked={onRowDoubleClicked}>
                        <AgGridColumn field="date" ></AgGridColumn>
                        <AgGridColumn field="stock"></AgGridColumn>
                        <AgGridColumn field="amount"></AgGridColumn>
                        <AgGridColumn field="direction"></AgGridColumn>
                        <AgGridColumn field="cost" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                        <AgGridColumn field="purchasePrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                    </AgGridReact>
                </div>

            );
            break;
        case GridModesEnum.TRANSACTIONS:
            // display all transactions minus current values
            transactionData = props.appData?.transactions?.map(transaction => {
                return {
                    'date': transaction.date
                    , 'stock': transaction.symbol
                    , 'amount': transaction.amount
                    , 'direction': transaction.side
                    , 'purchasePrice': transaction.tickPrice
                    , 'cost': transaction.amount * transaction.tickPrice
                };
            });
            renderedGrid = (
                <div className="ag-theme-alpine" style={{ height: 400, width: 1300 }}>
                    <AgGridReact rowData={transactionData} onRowDoubleClicked={onRowDoubleClicked}>
                        <AgGridColumn field="date" ></AgGridColumn>
                        <AgGridColumn field="stock"></AgGridColumn>
                        <AgGridColumn field="amount"></AgGridColumn>
                        <AgGridColumn field="direction"></AgGridColumn>
                        <AgGridColumn field="purchasePrice" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                        <AgGridColumn field="cost" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                    </AgGridReact>
                </div>
            );

            break;
        default:
            break;
    }

    return (
        <div>
            {renderedGrid}
        </div>
    );
};

