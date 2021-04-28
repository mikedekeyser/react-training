import { useContext, useEffect, useState } from 'react'
import { appContext } from '../services/appContext';
import {PickDialog} from './PickDialog'
// import { FollowedStockPicker } from './FollowedStockPicker'
// import { IAPIResult, IFollowedStock } from '../services/Interfaces'
// import { callAPI } from '../services/callAPI'
// import { ModalPopup } from './ModalPopup'
// import { BuyDialog } from './BuyDialog'
// import { SellDialog } from './SellDialog'
//import { appContext } from '../App'
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { ButtonCell } from './ButtonCell'
// import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn'
// import StockUpdateService from '../services/liveData.service'

export const WatchList = (()=> {
    // const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

    // // unfollow a stock
    // // const onUnfollowStock = (data:IAPIResult)=>{
    // //     if (data.success)
    // //         appData?.refreshWatchList();
    // // }
    // const unfollowStock = (appData: IApplicationContext) => {
    //     callAPI('/userdata/watchlist', (data: IAPIResult) => {
    //         if (data.success) {
    //             appData.setCurrentStock(null);
    //             appData.refreshWatchList();
    //         }
    //     }, {
    //         method: 'POST',
    //         headers: { userid: 'michael.de.keyser' },
    //         body: JSON.stringify({ "symbol": appData.currentStock, "action": "REMOVE" }),
    //     });
    // }

    // // buy, sell or follow a stock
    // let modalContent = null;
    // enum PopupModes {
    //     PICK,
    //     BUY,
    //     SELL
    // }
    // const [defaultStock, setDefaultStock] = useState('');
    // const [popupMode, setPopupMode] = useState<PopupModes>(PopupModes.PICK);
    // const showBuyDialog = ((defaultStock: string) => {
    //     setPopupMode(PopupModes.BUY);
    //     setDefaultStock(defaultStock);
    //     setIsModalPopupVisible(true)
    // });
    // const showStockPicker = (() => {
    //     setPopupMode(PopupModes.PICK);
    //     setIsModalPopupVisible(true)
    // });
    // const showSellDialog = ((defaultStock: string) => {
    //     setPopupMode(PopupModes.SELL);
    //     setDefaultStock(defaultStock);
    //     setIsModalPopupVisible(true)
    // });
    // switch (popupMode) {
    //     case PopupModes.BUY:
    //         modalContent = <BuyDialog symbol={defaultStock} />
    //         break;
    //     case PopupModes.SELL:
    //         modalContent = <SellDialog symbol={defaultStock} />
    //         break;
    //     default:
    //         modalContent = <FollowedStockPicker addedWatchedStocksSetter={() => { }} />
    //         break;
    // }

    // useEffect(()=>{
    //     appData?.refreshWatchList();
    // },[appData]);

    // let stockListGridRows = null;
    // useEffect(()=>{        
    //     stockListGridRows = appData?.watchList?.map((watchItem) => {
    //         <div className="stock-list__grid-row">
    //             <div className="stock-list__grid-cell">
    //                 <a><span className="stock-list__btn stock-list__btn--remove">&ndash;</span></a>
    //             </div>
    //             <div className="stock-list__grid-cell">{watchItem.symbol}</div>
    //             <div className="stock-list__grid-cell">{watchItem.price}</div>
    //             <div className="stock-list__grid-cell">
    //                 <a><span className="btn-transaction btn-transaction--buy">buy</span></a>
    //             </div>
    //             <div className="stock-list__grid-cell">
    //                 <a><span className="btn-transaction btn-transaction--sell">sell</span></a>
    //             </div>
    //             <div className="stock-list__grid-cell">0</div>
    //         </div>
    //     });
        
    // },[appData?.watchList?.length])
    const onItemAddedToWatchListEvent = ()=>{};
    const context = useContext(appContext);
    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => context.showModalHandler(<PickDialog callback={onItemAddedToWatchListEvent}/>)}>+</span></a></h2>
            </section>
        </div>
    );
})