import { useState } from 'react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IAppData } from '../services/Interfaces';
import { ModalPopup } from './ModalPopup';
import { GridModesEnum, ModalModesEnum } from '../services/Enums';
import { Grid } from './Grid';

export const AssetsPage = (props: { appData: IAppData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<ModalModesEnum>(ModalModesEnum.PICK);

    return (
        <div>
            <ModalPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} mode={modalMode} appData={props.appData} />
            <div className="ag-theme-alpine" style={{ height: 400, width: 1600 }}>
                <Grid appData={props.appData} mode={GridModesEnum.ASSETS} setIsModalVisible={setIsModalVisible} setModalMode={setModalMode} />
            </div>

        </div>
    );
};