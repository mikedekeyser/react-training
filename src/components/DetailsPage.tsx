import { useEffect, useState } from 'react';
import { ITradingData } from '../services/Interfaces';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getTransactions } from '../repository/GetTransactions';
import { Grid } from './Grid';
import { GridModesEnum, GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { ModalPopup } from './ModalPopup';
import { Graph } from './Graph'
import { WatchListItem } from './WatchListItem';


export const DetailsPage = (props: { tradingData: ITradingData }) => {
    // const appData = useContext(appContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);
    const showModal = ((mode: ModalModesEnum) => {
        setModalMode(mode);
        setIsModalVisible(true)
    });

    useEffect(() => {
        getTransactions(props.tradingData.setTransactions);
    }, []);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} tradingData={props.tradingData} />
            <WatchListItem watchItem={{ symbol: props.tradingData.currentStock }} tradingData={props.tradingData} showModal={showModal} isRemoveEnabled={false} />
            <table>
                <tr>
                    <Graph tradingData={props.tradingData} mode={GraphModesEnum.WATCH} currentStock={props.tradingData.currentStock} />
                </tr>
                <tr>
                    <Grid tradingData={props.tradingData} mode={GridModesEnum.DETAILS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
                </tr>
            </table>
        </div>
    );
};