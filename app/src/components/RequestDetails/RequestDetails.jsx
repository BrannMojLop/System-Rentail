import React, { useState, useEffect } from 'react';
import './request_details.sass'
import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { AlertDialog } from '../utils/Confirm/Confirm';
import { MaterialUIPickers } from './utils/DatePicker/DatePicker'
import { BasicAlerts } from '../utils/Alert/Alert'
import { setDate } from 'date-fns';

const calculateDates = require('./utils/Scripts/dates')

const evalStatus = (estatus)=>{
    return estatus == 'En Espera' ? true : false;
}

export function Details(props) {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('Holi :)')
    const [responseSeverity, setSeverity] = useState('success')
    const [alertVisibility, setAlertVisibility] = useState(false)
    const [activeRRN, setActiveRRN] = useState('')
    const [activeRRI, setActiveRRI] = useState('')
    //console.log(`Este es el id: ${props.idRR}`)

    const [value, setValue] = React.useState(new Date());
    // DatePicker
    const handleChange = (newValue) => {
      
      setValue(newValue);
      //console.log(newValue)
    };

    let type = ''
    let typeLess = ''
    let lessee
    let lessor
    if (props.type == 'lessee'){
        typeLess = props.req.id_lessor 
        type = 'Arrendador'
        lessee = true
        lessor = false
    }
    else{
        typeLess = props.req.id_lessee
        type = 'Arrendatario'
        lessee = false
        lessor = true
    }


    URL = `https://system-rentail-api.herokuapp.com/users/${typeLess}`  
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const token = storedUser.token;
    //console.log(`Dta: ${URL}`)
    useEffect( () => {
      
    const getData = async (url) =>{

        const config = {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2FlMTRlM2E0MGFhMDAxNjI5NzBhOCIsInVzZXJuYW1lIjoiam5hbWUiLCJleHAiOjE2NDA2MjcwMjIsImlhdCI6MTYzNTQ0MzAyMn0.BxY-c14bn3198yT_tqVmVqywFbXMpdk2Mm2IwGNM0EE"
        }        

        //localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGNkZGUzNTFkZTkxMDAxNjJhMGJjMiIsInVzZXJuYW1lIjoibWFyaSIsImV4cCI6MTY0MTQxNDQ2OSwiaWF0IjoxNjM2MjMwNDY5fQ.snhZQ-80qf7TNCnwA-Xo0B9lTUk2q5itMIIKW2Z1v1Y')
        try{
            const response = await fetch(url, {
                headers: config
              })
            const data = await response.json()

            console.log(data)
            setData(data)
        } catch(err){
            console.log(err)
        }
    
    }
    getData(URL)

}, [])




const confirm = (e)=>{
    //console.log('Botón presionado')
    setOpen(true);

    //console.log('Nombre del botón:::')
    //console.log(e.target.name)
    setActiveRRN(e.target.name)
    setActiveRRI(e.target.id)

}


const accept = ()=>{
    //console.log('Aceptado')
    handleClick()
    setOpen(false)
}

const cancel = () => {
    //console.log('Cancelado')
    setOpen(false);
  };
//



// Control de Alert
const [openAlert, setOpenAlert] = React.useState(false);

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenAlert(false);
};


// Queda pendiente lo del target
const handleClick = ()=>{

    const ref = activeRRI//e.target.id;
    console.log(ref);
    //console.log('Nombre del botón:::')
    //console.log(activeRRN)
    //const token = localStorage.getItem('TOKEN');
    //


    const idRequest = activeRRN//e.target.name
    const urlUpdateRequest = 'https://system-rentail-api.herokuapp.com/rental-requests/'+ idRequest +'/'+ ref
    const urlConfirmRequest = 'https://system-rentail-api.herokuapp.com/rents'

    //console.log('Test de Fechas')
    let numberOfDays = props.req.contract.days; // Aquí poner el total de días del contrato
    const periodo = props.req.contract.period // este se añade porque en algunos registros se llama period y en otros days
    numberOfDays = !numberOfDays ? periodo : numberOfDays
    numberOfDays = !numberOfDays? 0: numberOfDays

    // Cálculo de las fechas
    const {startDate, finalDate} = calculateDates.dates(value, numberOfDays)
    
    // Para rechazar o cancelar solicitudes
    const updateStatus = async (url) => {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }    
        }

        try{
            const response = await fetch(url, config);
            console.log(response);
            const data = await response.json();
            const resSev = response.status == '200' ? 'success' : 'error'
            setSeverity(resSev)
            setOpenAlert(true)
            //setAlertVisibility(true)
            setResponseMessage(data.message)
            //console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    // Solo para confirmaciones (se crea la renta)
    const confirmRequest = async (url) => {

        const dataForRent = { 
                "id_rentalRequest": `${activeRRN}`,
                "start_date":`${startDate}`,
                "end_date":`${finalDate}`
        }
        console.log('Datos a Enviar: ', dataForRent)

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(dataForRent)    
        }

        try{
            const response = await fetch(url, config)
            const data = await response.json()

            const resSev = response.status == '200' ? 'success' : 'error'
            setSeverity(resSev)
            setOpenAlert(true)
            //setAlertVisibility(true)
            setResponseMessage(data.message)
            //console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    
    // Si lo que quiere es confirmar entonces se llama a crear Renta, sino, simplemente actualiza estatus
    if (ref == '2'){
        console.log('Quiere confirmar')
        confirmRequest(urlConfirmRequest)
    }
    else{
        updateStatus(urlUpdateRequest)
    }
    props.setUpdate(props.update)
    //console.log(`update vale ${props.update}`)  

}

 
  return (
    <>
    <div id ="details-complete">
        <div id ="general">
            <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
            >
            <ListItem>
                <ListItemText primary={type} secondary={data.username} />
            </ListItem>

            <ListItem>
                <ListItemText primary="Periodo" secondary={(props.req.contract.days || props.req.contract.period ) + " days"} />
            </ListItem>

            <ListItem>
                <ListItemText primary="Precio" secondary={'$ '+ props.req.contract.price} />
            </ListItem>

            <ListItem>
            
            </ListItem>

            <BasicAlerts 
                open={openAlert}
                resSeverity={responseSeverity} 
                responseMessage={responseMessage}
                handleClose={handleCloseAlert}
            >
            </BasicAlerts>
    
            </List>
        </div>

    
        <div id="group-details">
            {
                // Vista de Lessee
                (lessee && evalStatus(props.req.answer.status) && 
                <div>
                    <button id='4' className = "red-button" name={props.idRR} onClick={confirm}>Cancelar</button>
                    <AlertDialog
                        open={open}
                        cancel={cancel}
                        accept ={accept}
                        action = {'cancelar'}
                    ></AlertDialog>    
                </div>)
                ||
                // Vista de Lessor
                (lessor && evalStatus(props.req.answer.status) &&
                <div>
                    <h6>Antes de aceptar una solicitud seleccione la fecha correcta</h6> 
                    <MaterialUIPickers
                        value = {value}
                        handleChange = {handleChange}
                    ></MaterialUIPickers>
                         
                                   
                    <button id='2' className = "green-button" name={props.idRR} onClick={confirm}>Aceptar</button>
                    <button id='3' className = "red-button" name={props.idRR} onClick={confirm}>Rechazar</button>
                    <AlertDialog
                        open={open}
                        cancel={cancel}
                        accept ={accept}
                        action = {'ejecutar esta acción para'}
                    ></AlertDialog>

                </div>
                )   
            }


            {
                props.req.answer.status == 'Confirmada'
                &&
                <Link href="#" className="linkT" underline="hover">
                {'Ver Renta'} 
                </Link>
            }
            {
                props.req.answer.status == 'En Espera'
                &&
                <Link href="#" className="linkT" underline="hover">
                {'Ver Renta'} 
                </Link>
            }
        </div>
    </div>
  
    </>
    
  );
}