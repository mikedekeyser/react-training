import { PropertyKeys } from 'ag-grid-community';
import React, { useState } from 'react';
import { ModalModesEnum } from '../services/Enums';
import { IWatchItem } from '../services/Interfaces';
import { ModalPopup } from './ModalPopup';
// import { FollowedStockList } from './FollowedStockList';
// import {StockGraph} from './StockGraph'
// import {TransactionGrid} from './TransactionGrid'
// import {IPostTransactionResult} from '../services/Interfaces'
import {WatchList} from './WatchList'

export const HomePage = (()=> {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);
    const [watchList, setWatchList] = useState<IWatchItem[]>([]);

    
    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} watchList={watchList} setWatchList={setWatchList}/>            
            <WatchList watchList={watchList} setWatchList={setWatchList} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode}/>  
            {/* <button onClick = {()=>{ModalPo}}> show popup </button> */}
            {/* <StockGraph /> */}

            {/* <TransactionGrid /> */}
        </div>
    );
})
