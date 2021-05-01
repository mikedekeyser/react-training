import { useState } from 'react';
import { GridModesEnum, GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { ITradingData } from '../services/Interfaces';
import { ModalPopup } from './ModalPopup';
import { WatchList } from './WatchList'
import { Grid } from './Grid';
import { Graph } from './Graph';

export const HomePage = ((props: { tradingData: ITradingData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} tradingData={props.tradingData} />
            <table>
                <tr>
                    <td style={{ height: 400, width: 600 }}>
                        <WatchList tradingData={props.tradingData} setWatchList={props.tradingData.setWatchList} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
                    </td>
                    <td>
                        <Graph tradingData={props.tradingData} mode={GraphModesEnum.WATCH} currentStock={props.tradingData.currentStock} />
                    </td>
                </tr>
            </table>
            <Grid tradingData={props.tradingData} mode={GridModesEnum.TRANSACTIONS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
        </div>
    );
})
