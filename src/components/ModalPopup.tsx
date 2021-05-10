import { useRef, useState } from 'react'
import { ModalModesEnum } from '../services/Enums'
import { StockDropDown } from './StockDropDown';
import { addWatchItem } from '../repository/AddWatchItem'
import { IAPIResult, IAppData, IUserData, IWatchItem } from '../services/Interfaces';
import { addBuyTransaction } from '../repository/AddBuyTransaction'
import { addSellTransaction } from '../repository/AddSellTransaction'

export const ModalPopup = (props: {
    isModalVisible: boolean;
    setIsModalVisible: Function;
    mode: ModalModesEnum;
    // children: ReactNode;
    appData: IAppData;
}) => {
    const [selected, setSelected] = useState('ACME');
    const classes: string = `modal ${props.isModalVisible ? 'visible' : ''}`;

    let modalContent = null;
    const [apiResult, setAPIResult] = useState<IAPIResult>({
        success: false,
        data: ""
    });

    const onAddTransaction = (data: IUserData) => {
        if (data) props.appData.setUserData(data);
    }

    const updateStatus = (data: IAPIResult) => {
        setAPIResult(data);
        if (data.success && data.data.indexOf('added') > 0) props.appData.setWatchList([...props.appData.watchList, { symbol: selected }])
    }

    const addStockToWatchList = (symbol: string) => {
        setAPIResult({ success: false, data: "processing ..." });
        addWatchItem(symbol, updateStatus);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    switch (props.mode) {
        case ModalModesEnum.BUY:
            modalContent = <div>
                <h2 className="modal__h2">Buy stock</h2>
                <div>
                    <div>Amount of {props.appData.currentStock} stocks to buy:</div>
                    <input ref={inputRef} className="modal__number-box" type="number" name="quantity" placeholder="enter amount" />
                    <button className="modal__btn" onClick={() => addBuyTransaction(props.appData.currentStock, Number.parseInt(inputRef.current?.value ? inputRef.current.value : ''), onAddTransaction)}>Buy</button>
                </div>
            </div>
            break;
        case ModalModesEnum.SELL:
            modalContent = <div>
                <h2 className="modal__h2">Sell stock</h2>
                <div>
                    <div>Amount of {props.appData.currentStock} stocks to sell:</div>
                    <input ref={inputRef} className="modal__number-box" type="number" name="quantity" placeholder="enter amount" />
                    <button className="modal__btn" onClick={() => addSellTransaction(props.appData.currentStock, Number.parseInt(inputRef.current?.value ? inputRef.current.value : ''), onAddTransaction)}>Sell</button>
                </div>
            </div>
            break;
        case ModalModesEnum.PICK:
            modalContent =
                <div>
                    <h2 className="modal__h2">Select a new stock to follow</h2>
                    <StockDropDown appData={props.appData} selected={selected} setSelected={setSelected} />
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