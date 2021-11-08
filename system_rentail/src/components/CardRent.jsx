import React from 'react';
import '../styles/cardrent.sass';
import { ButtonRent } from './Buttons'
 
export function CardRent(props) {

    return (
    <div className="card-rent">
        <div className="box-image">
            <img src={props.publication.product[0].image} alt="Product" />
        </div>
            <div className="card-content">
            <h2 className="card-title">{props.publication.title}</h2>
            <h4 className="card-name">{props.publication.product[0].name}</h4>
            <h3 className="card-price">$ {props.publication.prices[0]}</h3>
            </div>
            <div className="card-actions">
            <div className="status-rent">
                Status
            </div>
            <p>Activo</p>
        </div>
    </div>
    )
}