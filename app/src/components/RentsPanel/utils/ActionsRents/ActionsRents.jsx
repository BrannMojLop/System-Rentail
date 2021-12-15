import * as React from 'react';
import Button from '@mui/material/Button';

export default function ActionsRents(props){

    return (
        <div className="actions-product">
            {props.rentInfo[0].payment || props.rentInfo[0].status.status === "Cancelada" ? null : <Button className="btn-product"variant="outlined" id="payment" onClick={props.handleClickAction}>Pagar Renta</Button> }
            {(props.rentInfo[0].payment && props.rentInfo[0].status.status === "Activa") || props.rentInfo[0].status.status === "Cancelada" ? null : <Button className="btn-product"variant="outlined" id="cancel" onClick={props.handleClickAction}>Cancelar Renta</Button> }
        </div>
    )

}