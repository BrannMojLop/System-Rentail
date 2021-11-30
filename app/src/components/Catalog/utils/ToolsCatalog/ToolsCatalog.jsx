import React, { useState, useEffect } from 'react';
import BasicSelectD from './utils/BasicSelects/BasicSelectD'
import BasicSelectM from './utils/BasicSelects/BasicSelectM'
import RangePriceD from './utils/BasicSelects/RangePriceD'
import RangePriceM from './utils/BasicSelects/RangePriceM'
import './bar_tools.sass';


export default function ToolsCatalog(props) {

    return (
        <div className="toolsCatalog">
            <BasicSelectD search="sector" searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/sectors' title='Sector'/>
            <BasicSelectD search="category" searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/categories' title='Categoria'/>
            <BasicSelectM search="sector" searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/sectors' title='Sector'/>
            <BasicSelectM search="category" searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/categories' title='Categoria'/>
            <RangePriceD search={['min_price','max_price']} searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/categories'/>
            <RangePriceM search={['min_price','max_price']} searchPublications={props.searchPublications} url='https://system-rentail-api.herokuapp.com/categories'/>
        </div>
    )
}