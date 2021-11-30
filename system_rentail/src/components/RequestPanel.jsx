import React, { useState, useEffect } from 'react';
import BasicTabs from './TabPanel';
import '../public/styles/panel.sass'


export default function RequestPanel(props) {

    return (
        <main className="body-panel">
            <div className="requests-panel">
                <h1>Solicitudes</h1>
                <BasicTabs></BasicTabs>
            </div>
        </main>
    )

}