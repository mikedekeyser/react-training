import { ModalModesEnum } from '../services/Enums';
import { IWatchItem } from '../services/Interfaces'
import { removeWatchItem} from '../services/DataRepository/RemoveWatchItem'

export const WatchList = ((props:{watchList:IWatchItem[], setWatchList:Function, setIsModalVisible:Function, setModalMode:Function}) => {
    const showPickDialog = (() => {
        props.setModalMode(ModalModesEnum.PICK);
        props.setIsModalVisible(true)
    });

    const onItemRemovedFromWatchListEvent = (symbol: string) => {
        props.setWatchList(props.watchList.filter((stock) => stock.symbol !== symbol))
    };

    const onClickHandler = (symbol:string)=>{alert(symbol);};
    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => showPickDialog()}>+</span></a></h2>
                <div className="stock-list__grid" >
                    {props?.watchList?.map((watchItem) => { return (
                        <div className="stock-list__grid-row" onClick={()=>onClickHandler(watchItem.symbol)}>
                            <div className="stock-list__grid-cell">
                                <a><span className="stock-list__btn stock-list__btn--remove" onClick={()=>removeWatchItem(watchItem.symbol, onItemRemovedFromWatchListEvent)} >&ndash;</span></a>
                            </div>
                            <div className="stock-list__grid-cell">{watchItem.symbol}</div>
                            <div className="stock-list__grid-cell">0</div>
                            <div className="stock-list__grid-cell">
                                <a><span className="btn-transaction btn-transaction--buy">buy</span></a>
                            </div>
                            <div className="stock-list__grid-cell">
                                <a><span className="btn-transaction btn-transaction--sell">sell</span></a>
                            </div>
                            <div className="stock-list__grid-cell">0</div>
                        </div>
                    );})}
                </div>
            </section>
        </div>
    );
})