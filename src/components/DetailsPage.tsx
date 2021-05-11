import { useEffect, useState } from 'react';
import { IAppData } from '../services/Interfaces';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getTransactions } from '../repository/GetTransactions';
import { Grid } from './Grid';
import { GridModesEnum, GraphModesEnum, ModalModesEnum } from '../services/Enums';
import { ModalPopup } from './ModalPopup';
import { Graph } from './Graph'
import { WatchListItem } from './WatchListItem';


export const DetailsPage = (props: { appData: IAppData }) => {
    // const appData = useContext(appContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);
    const showModal = ((mode: ModalModesEnum) => {
        setModalMode(mode);
        setIsModalVisible(true)
    });

    useEffect(() => {
        getTransactions(props.appData.setTransactions);
    }, []);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} appData={props.appData} />
            <WatchListItem key={props.appData.currentStock} watchItem={{ symbol: props.appData.currentStock }} appData={props.appData} showModal={showModal} isRemoveEnabled={false} graphMode={GraphModesEnum.DETAILS   }/>
            <table>
                <tr>
                    <Graph appData={props.appData} mode={GraphModesEnum.DETAILS} currentStock={props.appData.currentStock} />
                </tr>
                <tr>
                    <Grid appData={props.appData} mode={GridModesEnum.DETAILS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
                </tr>
            </table>
        </div>
    );
};