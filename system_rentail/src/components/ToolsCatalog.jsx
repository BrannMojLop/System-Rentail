import React, { useState, useEffect } from 'react';
import BasicSelectD from './BasicSelectD'
import BasicSelectM from './BasicSelectM'
import RangePriceD from './RangePriceD'
import RangePriceM from './RangePriceM'
import '../styles/bar_tools.sass';


export default function ToolsCatalog(props) {

    return (
        <div className="toolsCatalog">
            <BasicSelectD search="sector" searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/sectors' title='Sector'/>
            <BasicSelectD search="category" searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/categories' title='Categoria'/>
            <BasicSelectM search="sector" searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/sectors' title='Sector'/>
            <BasicSelectM search="category" searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/categories' title='Categoria'/>
            <RangePriceD search={['min_price','max_price']} searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/categories'/>
            <RangePriceM search={['min_price','max_price']} searchPublications={props.searchPublications} url='https://income-system.herokuapp.com/categories'/>
        </div>
    )
}