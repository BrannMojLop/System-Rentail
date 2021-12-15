import React from 'react';
import BasicTabs from './TabPanel/TabPanel';
import './request_panel.sass';

export default function RequestPanel(props) {

    return (
        <div className="body-panel">
            <div className="requests-panel">
                <h1>Solicitudes</h1>
                <BasicTabs></BasicTabs>
            </div>
        </div>
    )

}