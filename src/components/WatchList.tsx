import { useState } from 'react';
import { addWatchItem } from '../repository/AddWatchItem';
import { GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { IAPIResult, IAppData } from '../services/Interfaces'
import { StockDropDown } from './StockDropDown';
import { WatchListItem } from './WatchListItem'

export const WatchList = ((props: { appData: IAppData, setWatchList: Function, setIsModalVisible: Function, setModalMode: Function }) => {
    const showModal = ((mode: ModalModesEnum) => {
        props.setModalMode(mode);
        props.setIsModalVisible(true)
    });
    const [selected, setSelected] = useState('ACME');
    const [apiResult, setAPIResult] = useState<IAPIResult>({
        success: false,
        data: ""
    });
    const updateStatus = (data: IAPIResult) => {
        setAPIResult(data);
        if (data.success && data.data.indexOf('added') > 0) props.appData.setWatchList([...props.appData.watchList, { symbol: selected }])
    }    
    const addStockToWatchList = (symbol: string) => {
        setAPIResult({ success: false, data: "processing ..." });
        addWatchItem(symbol, updateStatus);
    }

    const modalContent =
        <div>
            <h2 className="modal__h2">Select a new stock to follow</h2>
            <StockDropDown appData={props.appData} selected={selected} setSelected={setSelected} />
            <button className="modal__btn" onClick={() => addStockToWatchList(selected)}>Add</button>
            <div>
                {apiResult?.data}
            </div>
        </div>


    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => showModal(ModalModesEnum.PICK)}>+</span></a></h2>
                <div className="stock-list__grid" >
                    {props?.appData?.watchList?.map((watchItem) =>
                        <WatchListItem key={watchItem.symbol} watchItem={watchItem} appData={props.appData} showModal={showModal} isRemoveEnabled={true} graphMode={GraphModesEnum.WATCH} />
                    )}
                </div>
            </section>
        </div>
    );
})