import { ReactNode, useEffect, useState } from 'react'
import { ModalModesEnum } from '../services/Enums'
import { StockDropDown } from './StockDropDown';
import {addWatchItem} from '../repository/AddWatchItem'
import { IAPIResult, IWatchItem } from '../services/Interfaces';

export const ModalPopup = (props: {
    isModalVisible: boolean;
    setIsModalVisible: Function;
    mode: ModalModesEnum;
    // children: ReactNode;
    watchList:IWatchItem[];
    setWatchList: Function;
}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedWatchItem, setSelectedWatchItem] = useState();
    const classes: string = `modal ${props.isModalVisible ? 'visible' : ''}`;

    let modalContent = null;
    const [popupMode, setPopupMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);
    const showBuyDialog = ((defaultStock: string) => {
        setPopupMode(ModalModesEnum.BUY);
    });
    const showStockPicker = (() => {
        setPopupMode(ModalModesEnum.PICK);
    });
    const showSellDialog = ((defaultStock: string) => {
        setPopupMode(ModalModesEnum.SELL);
    });

    const [selected, setSelected] = useState('');
    const [apiResult, setAPIResult] = useState<IAPIResult>({
        success: false,
        data: ""
    });

    const updateStatus = (data:IAPIResult)=>{
        setAPIResult(data);
        if (data.success && data.data.indexOf('added')>0) props.setWatchList([...props.watchList, {symbol:selected}])
    }

    const addStockToWatchList = (symbol: string) => {
        setAPIResult({ success: false, data: "processing ..." });
        addWatchItem( symbol , updateStatus);
    }

    switch (popupMode) {
        case ModalModesEnum.BUY:
            modalContent = <div>
                <h2 className="modal__h2">Buy stock</h2>
                <div>
                    {/* <StockDropDown defaultSelected={props.symbol} setSelected={setSelected} />
                <input ref={inputRef} className="modal__number-box" type="number" name="quantity" placeholder="enter amount" />
                <button className="modal__btn" onClick={() => addBuyTransaction(selected)}>Buy</button> */}
                </div>
            </div>
            break;
        case ModalModesEnum.SELL:
            modalContent = <div>
                <h2 className="modal__h2">Sell stock</h2>
                <div>
                    {/* <StockDropDown defaultSelected={props.symbol} setSelected={setSelected}/>
                <input ref={inputRef} className="modal__number-box" type="number" name="quantity" placeholder="enter amount" />
                <button className="modal__btn" onClick={() => addSellTransaction(selected)}>Sell</button> */}
                </div>
            </div>
            break;
        default:
            modalContent =         
            <div>
                <h2 className="modal__h2">Select a new stock to follow</h2>
                <StockDropDown setSelected={setSelected}/>
                <button className="modal__btn" onClick={() => addStockToWatchList(selected)}>Add</button>
                <div>
                    {apiResult?.data}
                </div>
            </div>
            break;
    }


    return (
        <div className={classes} >
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <div className="modal__close" onClick={() => props.setIsModalVisible(false)}>&times;</div>
                {modalContent}
            </div>
        </div>
    );
}