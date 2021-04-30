import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getTransactions } from '../repository/GetTransactions';
import { ITradingData } from '../services/Interfaces';

// import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { IFollowedStock, IUserData } from '../services/Interfaces';
// import { callAPI } from '../services/callAPI';
import { ButtonCell } from './ButtonCell';
import { getUserData } from '../repository/GetUserData';
import { ModalPopup } from './ModalPopup';
import { AgGridModesEnum, ModalModesEnum } from '../services/Enums';
import { CellClickedEvent, RowSelectedEvent } from 'ag-grid-community';
import { AgGrid } from './AgGrid';

export const AssetsPage = (props: { tradingData: ITradingData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);
    const [selectedStock, setSelectedStock] = useState('');

    // const appData = useContext(appContext);
    // const [userData, setUserData] = useState<IUserData>();
    // useEffect(()=>{
    //     getUserData(props.tradingData.setUserData);
    // },[]);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (params: { value: number | bigint }) => {
        return params.value ? formatter.format(params.value) : '';
    };

    interface IRowData {
        symbol: string;
        amount: number;
        currentPrice: number;
        total: number;
        sell: number;
    }

    //const [rowData, setRowData] = useState<IRowData[]>();
    const rowData = props.tradingData.userData?.allocations.map(allocation => {
        const currentPrice = props.tradingData?.stocks?.find((s) => s.symbol === allocation.symbol)?.lastTick.price;
        const row = { 'amount': allocation.amount, 'currentPrice': currentPrice, 'sell': 'sell', 'symbol': allocation.symbol, 'total': allocation.amount * (currentPrice ? currentPrice : 0) };
        return row;
    });

    // const frameworkComponents = {
    //     cellRenderer: ButtonCell
    // }                
    // const cellRendererParams = {
    //     caption: 'sell',
    //     callback: function() {
    //         setModalMode(ModalModesEnum.SELL);
    //         setIsModalVisible(true);
    //     }            
    // }                

    const onRowSelect = (e: RowSelectedEvent) => { 
        props.tradingData.setCurrentStock((e.data as IRowData).symbol) 
    };
    const onCellClicked = (e: CellClickedEvent) => {
        if (e.colDef.field === 'sell') {
            props.tradingData.setCurrentStock(e.node.data.stock);
            setModalMode(ModalModesEnum.SELL);
            setIsModalVisible(true);
        }
    }

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} tradingData={props.tradingData} />
            <div className="ag-theme-alpine" style={{ height: 400, width: 1600 }}>
                {/* <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
            </AgGridReact> */}
            <AgGrid tradingData={props.tradingData} mode={AgGridModesEnum.ASSETS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode}/>
                {/* <AgGridReact rowData={rowData} onCellClicked={onCellClicked} onRowSelected={onRowSelect}>
                    <AgGridColumn field="symbol"></AgGridColumn>
                    <AgGridColumn field="amount"></AgGridColumn>
                    <AgGridColumn field="currentPrice" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
                    <AgGridColumn field="total" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
                    <AgGridColumn field="sell"
                    // cellRenderer="cellRenderer"
                    // cellRendererParams={cellRendererParams}
                    ></AgGridColumn>
                </AgGridReact> */}
            </div>

        </div>
    );

    // return (
    //     <div className="ag-theme-alpine" style={{ height: 800, width: 1200 }}>
    //         {/* <AgGridReact
    //             rowData={rowData}
    //             frameworkComponents = {frameworkComponents}
    //         >
    //             <AgGridColumn field="symbol"></AgGridColumn>
    //             <AgGridColumn field="amount"></AgGridColumn>
    //             <AgGridColumn field="currentPrice" type='rightAligned' valueFormatter={priceFormatter}></AgGridColumn>
    //             <AgGridColumn field="total" type='rightAligned' valueFormatter={priceFormatter} ></AgGridColumn>
    //             <AgGridColumn field="sell"
    //                 cellRenderer = "cellRenderer"
    //                 cellRendererParams = {cellRendererParams}
    //             ></AgGridColumn>
    //         </AgGridReact> */}
    //     </div>
    // );
};