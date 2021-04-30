import { ModalModesEnum } from '../services/Enums';
import { ITradingData } from '../services/Interfaces'
import { WatchListItem } from './WatchListItem'

export const WatchList = ((props: { tradingData: ITradingData, setWatchList: Function, setIsModalVisible: Function, setModalMode: Function }) => {
    const showModal = ((mode:ModalModesEnum) => {
        props.setModalMode(mode);
        props.setIsModalVisible(true)
    });

    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => showModal(ModalModesEnum.PICK)}>+</span></a></h2>
                <div className="stock-list__grid" >
                    {props?.tradingData?.watchList?.map((watchItem) =>
                        <WatchListItem watchItem={watchItem} tradingData={props.tradingData} showModal={showModal} isRemoveEnabled={true}/>
                    )}
                </div>
            </section>
        </div>
    );
})