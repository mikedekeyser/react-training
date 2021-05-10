import { useEffect, useState } from "react"
import { isPropertySignature } from "typescript";
import { removeWatchItem } from "../repository/RemoveWatchItem";
import { GraphModesEnum, ModalModesEnum } from "../services/Enums";
import { ISymbolPrice, IAppData, IWatchItem } from "../services/Interfaces";
import stockUpdateService from '../services/LiveDataService'
import { StockDropDown } from "./StockDropDown";

export const WatchListItem = (props: { watchItem: IWatchItem, appData: IAppData, showModal: Function, isRemoveEnabled: boolean, graphMode:GraphModesEnum }) => {
    const [price, setPrice] = useState(0);
    const updatePrice = (newStockPrice: ISymbolPrice) => {
        setPrice(newStockPrice.price);
    }

    const onClickHandler = (symbol: string) => { props.appData.setCurrentStock(symbol) };
    const onItemRemovedFromWatchListEvent = (symbol: string) => {
        props.appData.setWatchList(props.appData.watchList.filter((stock) => stock.symbol !== symbol))
    };

    const holdings = props?.appData?.userData?.allocations.find((x) => x.symbol === props.watchItem.symbol)?.amount;

    useEffect(() => {
        stockUpdateService.subscribe(props.watchItem.symbol, updatePrice);
        return (() => {
            stockUpdateService.unsubscribeStockPrice(props.watchItem.symbol)
        });
    }, []);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    const priceFormatter = (value: number | bigint) => {
        return value ? formatter.format(value) : '';
    };
    const removeButton = props.isRemoveEnabled ? (
        <div className="stock-list__grid-cell">
            <a><span className="stock-list__btn stock-list__btn--remove" onClick={() => removeWatchItem(props.watchItem.symbol, onItemRemovedFromWatchListEvent)} >&ndash;</span></a>
        </div>
    ) : <div></div>;

    let stockGridCell;
    if (props.graphMode==GraphModesEnum.WATCH) {
        stockGridCell=<div className="stock-list__grid-cell"  onClick={() => onClickHandler(props.watchItem.symbol)}>{props.watchItem.symbol}</div>
    } else {
        stockGridCell=<div className="stock-list__grid-cell"  onClick={() => onClickHandler(props.watchItem.symbol)}><StockDropDown appData={props.appData} selected={props.appData.currentStock} setSelected={props.appData.setCurrentStock} /></div>
    }

    return (
        <div className="stock-list__grid-row">
            {removeButton}
            {stockGridCell}
            {<div className="stock-list__grid-cell currency">{priceFormatter(price)}</div>}
            <div className="stock-list__grid-cell"></div>
            <div className="stock-list__grid-cell">
                <a><span className="btn-transaction btn-transaction--buy" onClick={() => props.showModal(ModalModesEnum.BUY)} >buy</span></a>
            </div>
            <div className="stock-list__grid-cell">
                <a><span className="btn-transaction btn-transaction--sell" onClick={() => props.showModal(ModalModesEnum.SELL)}>sell</span></a>
            </div>
            <div className="stock-list__grid-cell">{holdings}</div>
        </div>
    )
}