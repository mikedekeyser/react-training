import { TemplateService } from "ag-grid-community";
import { useEffect, useState } from "react"
import { removeWatchItem } from "../repository/RemoveWatchItem";
import { ModalModesEnum } from "../services/Enums";
import { ISymbolPrice, ITradingData, IWatchItem } from "../services/Interfaces";
import stockUpdateService from '../services/LiveDataService'

export const WatchListItem = (props:{watchItem:IWatchItem, tradingData:ITradingData, showModal:Function}) => {
    const [price, setPrice] = useState(0);
    const updatePrice = (newStockPrice: ISymbolPrice) =>{
        setPrice(newStockPrice.price);
    }

    const onClickHandler=(symbol:string)=>{props.tradingData.setCurrentStock(symbol)};
    const onItemRemovedFromWatchListEvent = (symbol: string) => {
        props.tradingData.setWatchList(props.tradingData.watchList.filter((stock) => stock.symbol !== symbol))
    };

    const holdings = props?.tradingData?.userData?.allocations.find((x)=>x.symbol===props.watchItem.symbol)?.amount;

    useEffect(()=>{
        stockUpdateService.subscribe(props.watchItem.symbol, updatePrice);
        return(()=>{
                stockUpdateService.unsubscribeStockPrice(props.watchItem.symbol)
        });
    },[]);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (value: number | bigint ) => {
        return value ? formatter.format(value) : '';
    };

    return (
        <div className="stock-list__grid-row" onClick={() => onClickHandler(props.watchItem.symbol)}>
            <div className="stock-list__grid-cell">
                <a><span className="stock-list__btn stock-list__btn--remove" onClick={() => removeWatchItem(props.watchItem.symbol, onItemRemovedFromWatchListEvent)} >&ndash;</span></a>
            </div>
            <div className="stock-list__grid-cell">{props.watchItem.symbol}</div>
            <div className="stock-list__grid-cell currency">{priceFormatter(price)}</div>
            <div className="stock-list__grid-cell"></div>
            <div className="stock-list__grid-cell">
                <a><span className="btn-transaction btn-transaction--buy" onClick={()=>props.showModal(ModalModesEnum.BUY)} >buy</span></a>
            </div>
            <div className="stock-list__grid-cell">
                <a><span className="btn-transaction btn-transaction--sell" onClick={()=>props.showModal(ModalModesEnum.SELL)}>sell</span></a>
            </div>
            <div className="stock-list__grid-cell">{holdings}</div>
        </div>
    )
}