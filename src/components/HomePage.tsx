import { PropertyKeys } from 'ag-grid-community';
import React, { useState } from 'react';
import { AgGridModesEnum, GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { ITradingData, IWatchItem } from '../services/Interfaces';
import { ModalPopup } from './ModalPopup';
// import { FollowedStockList } from './FollowedStockList';
// import {StockGraph} from './StockGraph'
// import {TransactionGrid} from './TransactionGrid'
// import {IPostTransactionResult} from '../services/Interfaces'
import { WatchList } from './WatchList'
import { AgGrid } from './AgGrid';
import { Graph } from './Graph';

export const HomePage = ((props: { tradingData: ITradingData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} tradingData={props.tradingData} />

            <table>
                <tr>
                </tr>
                <tr>
                    <td style={{ height: 400, width: 600 }}>
                        <WatchList tradingData={props.tradingData} setWatchList={props.tradingData.setWatchList} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />

                    </td>
                    <td>
                        <Graph tradingData={props.tradingData} mode={GraphModesEnum.WATCH} currentStock={props.tradingData.currentStock}/>
                        {/* <StockGraph tradingData={props.tradingData} /> */}

                    </td>
                </tr>
            </table>
            <AgGrid tradingData={props.tradingData} mode={AgGridModesEnum.TRANSACTIONS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode}/>
            {/* <TransactionGrid tradingData={props.tradingData} /> */}
        </div>
    );
})
