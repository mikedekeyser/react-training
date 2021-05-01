import { useState } from 'react';
import { GridModesEnum, GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { IAppData } from '../services/Interfaces';
import { ModalPopup } from './ModalPopup';
import { WatchList } from './WatchList'
import { Grid } from './Grid';
import { Graph } from './Graph';

export const HomePage = ((props: { appData: IAppData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} appData={props.appData} />
            <table>
                <tr>
                    <td style={{ height: 400, width: 600 }}>
                        <WatchList appData={props.appData} setWatchList={props.appData.setWatchList} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
                    </td>
                    <td>
                        <Graph appData={props.appData} mode={GraphModesEnum.WATCH} currentStock={props.appData.currentStock} />
                    </td>
                </tr>
            </table>
            <Grid appData={props.appData} mode={GridModesEnum.TRANSACTIONS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
        </div>
    );
})
