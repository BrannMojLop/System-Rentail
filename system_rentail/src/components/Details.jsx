import React, { useState } from 'react';
import { ButtonFilter } from './Buttons'
import '../styles/details.sass'


import Button from '@mui/material/Button';

const evalStatus = (estatus)=>{

    return estatus == 'En Espera' ? true : false;

}

export function Details(props) {
   

    return (
        <>
        <div className= {`details ${props.active == props.req._id ? 'active':'non-active'}`}>
  
            <div className="group-details">
                <span>Arrendador</span>
                <span>Periodo</span>
                <span>Precio</span>
                <span>Descripción</span>

            </div>

            <div className="group-details">
                <span>{props.req._id}</span>
                <span>{props.req.contract.days + "days"}</span>
                <span>{'$ '+ props.req.contract.price}</span>
                <span>Descripción</span>

            </div>

            <div className="group-details">
                <img alt="Aquí va la imagen del producto rentado :)"></img>
            </div>

           {
            //evalStatus(props.req.answer.status) &&
            <div className="group-details">         
                <button className="blue-white-button">Editar</button>
                <button className = "blue-white-button">Cancelar</button>
            </div>
            }

        </div>

        </>
    )

}

