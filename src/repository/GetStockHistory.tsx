import { callAPI } from "../services/CallAPI";
import { GraphPeriodEnum } from "../services/Enums";

export const getStockHistory = (period:GraphPeriodEnum, symbol: string, callback: Function)  => {
    callAPI(`/stocks/${symbol}/price/${period==GraphPeriodEnum.DAILY?'today':'yearly'}`, callback, {});
}

