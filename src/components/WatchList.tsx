import { ModalModesEnum } from '../services/Enums';
import { ITradingData } from '../services/Interfaces'
import { WatchListItem } from './WatchListItem'

export const WatchList = ((props: { tradingData: ITradingData, setWatchList: Function, setIsModalVisible: Function, setModalMode: Function }) => {
    const showPickDialog = (() => {
        props.setModalMode(ModalModesEnum.PICK);
        props.setIsModalVisible(true)
    });

    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => showPickDialog()}>+</span></a></h2>
                <div className="stock-list__grid" >
                    {props?.tradingData?.watchList?.map((watchItem) =>
                        <WatchListItem watchItem={watchItem} tradingData={props.tradingData} />
                    )}
                </div>
            </section>
        </div>
    );
})