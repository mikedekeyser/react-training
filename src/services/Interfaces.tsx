import { GraphPeriodEnum } from "./Enums";

export interface ISymbolPrice {
    symbol: string;
    price: number;
    date: string;
}

export interface IStockPrice {
    stock: string;
    price: number;
    date: string;
}

export interface IStock {
    name: string;
    symbol: string;
    lastTick: IStockPrice
}

export interface IWatchItem {
    symbol: string;
}

export interface IAPIResult {
    success: boolean;
    data: string;
}

export interface ITransaction {
    side: string;
    symbol: string;
    amount: number;
    tickPrice: number;
    cost: number;
    date: string;
}

export interface IPostTransactionResult {
    "transaction": ITransaction;
    "userId": string;
    "liquidity": number;
    "allocations": {
        "symbol": string;
        "amount": number;
    }[];
    "watchList": IWatchItem[];
}

export interface IAsset {
    Stock: string;
    Amount: number;
    "Current Price": number;
    Total: number;
    Sell: number;
}

export interface IUserData {
    "userId": string;    
    "liquidity": number;
    "allocations": {
        "symbol": string;
        "amount": number;
    }[];
    "watchList": IWatchItem[];
}

export interface IDatePrice{
    "date": string;
    "price": number;
}

export interface IPriceToday{
    "detailed": IDatePrice[];
    "aggregated": IDatePrice[];
}

export interface IModalProps {
	setModalMode: Function;
	setIsModalVisible: Function;
	modalClickHandler: Function;
}

export interface IAppData {
    watchList: IWatchItem[];
    setWatchList: Function;
    userData: IUserData;
    setUserData: Function;
    currentStock: string;
    setCurrentStock: Function;
    transactions: ITransaction[];
    setTransactions: Function;
    stocks: IStock[];
    setStocks: Function;
    graphPeriod: GraphPeriodEnum;
    setGraphPeriod: Function;
}