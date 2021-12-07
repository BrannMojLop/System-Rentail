import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { AlertDialog } from '../utils/Confirm/Confirm';
import { BasicAlerts } from '../utils/Alert/Alert';
import { EditDialog } from './utils/EditDialog/EditDialog';
import { MaterialUIPickers } from './utils/DatePicker/DatePicker';

import './request_details.sass';


const calculateDates = require('./utils/Scripts/dates')

const evalStatus = (estatus)=>{
    return estatus == 'En Espera' ? true : false;
}

export function Details(props) {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('Holi :)')
    const [responseSeverity, setSeverity] = useState('success')
    const [activeRRN, setActiveRRN] = useState('')
    const [activeRRI, setActiveRRI] = useState('')
    const [ loading, setLoading ] = useState(null);
    //console.log(`Este es el id: ${props.idRR}`)

    const [value, setValue] = React.useState(new Date());
    // DatePicker
    const handleDPChange = (newValue) => {
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
        setLoading(true)

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
            setLoading(false)
        } catch(err){
            console.log(err)
        }
    
    }
    getData(URL)

}, [])


const confirm = (e)=>{
    //console.log('Botón presionado')
    setOpen(true);
    //console.log('Nombre del botón:::', e.target.name)
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
    //console.log('Nombre del botón:::', activeRRN)
    //const token = localStorage.getItem('TOKEN');
    
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
        setLoading(true)
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
            setLoading(false)
            //console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    // Solo para confirmaciones (se crea la renta)
    const confirmRequest = async (url) => {
        setLoading(true)

        const dataForRent = { 
                "id_rentalRequest": `${activeRRN}`,
                "start_date":`${startDate}`,
                "end_date":`${finalDate}`
        }
        //console.log('Datos a Enviar: ', dataForRent)

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
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }
    
    // Si lo que quiere es confirmar entonces se llama a crear Renta, sino, simplemente actualiza estatus
    if (ref == '2'){
        //console.log('Quiere confirmar')
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
        {loading ? <CircularProgress/> : null}
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
                        handleChange = {handleDPChange}
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
                (props.req.answer.status == 'Confirmada' || props.req.answer.status == 'En Espera')
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


export function MobileDetails (props)  {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('Holi :)')
    const [responseSeverity, setSeverity] = useState('success')
    const [activeRRN, setActiveRRN] = useState('')
    const [activeRRI, setActiveRRI] = useState('')
    const [ loading, setLoading ] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    //console.log(`Este es el id: ${props.idRR}`)

    const [value, setValue] = React.useState(new Date());
    // DatePicker
    const handleDPChange = (newValue) => {
      setValue(newValue);
      //console.log(newValue)
    };

    const handleClickOpen = (event) => {
        if(event.target.id === ""){
           // setDialogText(event.target.parentElement.id);
        } else {
            //setDialogText(event.target.id);
        }
        setOpenEditDialog(true);
  };

  const handleCloseEdit = (event) => {
    setOpenEditDialog(false);
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
        setLoading(true)

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
            setLoading(false)
        } catch(err){
            console.log(err)
        }
    
    }
    getData(URL)

}, [])


const confirm = (e)=>{
    //console.log('Botón presionado')
    setOpen(true);
    //console.log('Nombre del botón:::', e.target.name)
    setActiveRRN(e.target.name)
    setActiveRRI(e.target.id)
}

const accept = ()=>{
    //console.log('Aceptado')
    setOpenEditDialog(false)
    handleClick()
    setOpen(false)
}

const cancel = () => {
    //console.log('Cancelado')
    setOpenEditDialog(false)
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
    //console.log('Nombre del botón:::', activeRRN)
    //const token = localStorage.getItem('TOKEN');
    
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
        setLoading(true)
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
            setLoading(false)
            //console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    // Solo para confirmaciones (se crea la renta)
    const confirmRequest = async (url) => {
        setLoading(true)

        const dataForRent = { 
                "id_rentalRequest": `${activeRRN}`,
                "start_date":`${startDate}`,
                "end_date":`${finalDate}`
        }
        //console.log('Datos a Enviar: ', dataForRent)

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
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }
    
    // Si lo que quiere es confirmar entonces se llama a crear Renta, sino, simplemente actualiza estatus
    if (ref == '2'){
        //console.log('Quiere confirmar')
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
        {loading ? <CircularProgress/> : null}
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
            </List>
            <div className="buttonsEdit">
            {
                // Vista de Lessee
                (lessee && evalStatus(props.req.answer.status) && 
                <div >
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

                <div className="iconEdit">
                    <IconButton  size="small" onClick={handleClickOpen}>
                        <EditIcon  aria-label="edit"/>
                    </IconButton>
                    {
                    (props.req.answer.status == 'Confirmada' || props.req.answer.status == 'En Espera')
                    &&
                    <Link href="#" className="linkT" underline="hover">
                        {'Ver Renta'} 
                    </Link>
                    }
                </div>
                )   
            }
            </div>
           
            <BasicAlerts 
                open={openAlert}
                resSeverity={responseSeverity} 
                responseMessage={responseMessage}
                handleClose={handleCloseAlert}
            >
            </BasicAlerts>
        </div>

        <EditDialog
            value = {value}
            handleDPChange = {handleDPChange}
            idRR = {props.idRR}
            confirm = {confirm}
            openA = {open}
            open = {openEditDialog}
            cancel = {cancel}
            accept = {accept}
            handleClose = {handleCloseEdit}
        ></EditDialog> 
    </div>
  
    </>
    
  );
}