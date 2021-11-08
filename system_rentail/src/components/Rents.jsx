import React, { useState, useEffect } from 'react';
import '../styles/rents.sass'
import {CardRent} from './CardRent' 

export function Rents(porps) {
    const [ publications, setPublications ] = useState([]);

    useEffect(() => {
        const getPublications = async (url) => {
            const request = await fetch(url)
            const jsonRequest = await request.json()

            setPublications(jsonRequest)

        }

        getPublications('https://income-system.herokuapp.com/publications')

    },[])
    
        return (        
        <div className="body-rentCatalog">
            <div className="filter-tab-rents">
                <button className>
                    Filtrar
                </button>
            </div>
            <div className="catalog">
                <ul>
                    {publications.map(publication => {
                        return <li key={publication._id}><CardRent publication={publication}/></li>
                    })}
                </ul>
                
            </div>    
        </div>)

}   

export default Rents;