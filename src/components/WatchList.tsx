import { ModalModesEnum } from '../services/Enums';
import { IAppData } from '../services/Interfaces'
import { WatchListItem } from './WatchListItem'

export const WatchList = ((props: { appData: IAppData, setWatchList: Function, setIsModalVisible: Function, setModalMode: Function }) => {
    const showModal = ((mode: ModalModesEnum) => {
        props.setModalMode(mode);
        props.setIsModalVisible(true)
    });

    return (
        <div>
            <section className="stock-list">
                <h2 className="stock-list__title">Stocks that I follow <a><span className="stock-list__btn stock-list__btn--add"
                    onClick={() => showModal(ModalModesEnum.PICK)}>+</span></a></h2>
                <div className="stock-list__grid" >
                    {props?.appData?.watchList?.map((watchItem) =>
                        <WatchListItem watchItem={watchItem} appData={props.appData} showModal={showModal} isRemoveEnabled={true} />
                    )}
                </div>
            </section>
        </div>
    );
})