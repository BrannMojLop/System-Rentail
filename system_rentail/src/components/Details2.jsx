import React, { useState, useEffect } from 'react';
import '../styles/details.sass'
import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const evalStatus = (estatus)=>{
    return estatus == 'En Espera' ? true : false;
}

export function Details(props) {
    const [ data, setData] = useState([]);
    console.log(`Este es el id: ${props.idRR}`)

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


    URL = `https://income-system.herokuapp.com/users/${typeLess}`  
    console.log(`Dta: ${URL}`)
    useEffect( () => {
      
    const getData = async (url) =>{

        const config = {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2FlMTRlM2E0MGFhMDAxNjI5NzBhOCIsInVzZXJuYW1lIjoiam5hbWUiLCJleHAiOjE2NDA2MjcwMjIsImlhdCI6MTYzNTQ0MzAyMn0.BxY-c14bn3198yT_tqVmVqywFbXMpdk2Mm2IwGNM0EE"
        }

        localStorage.setItem('TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGNkZGUzNTFkZTkxMDAxNjJhMGJjMiIsInVzZXJuYW1lIjoibWFyaSIsImV4cCI6MTY0MTQxNDQ2OSwiaWF0IjoxNjM2MjMwNDY5fQ.snhZQ-80qf7TNCnwA-Xo0B9lTUk2q5itMIIKW2Z1v1Y')


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


function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}


const handleClick = (e)=>{

    const ref = e.target.id;
    console.log('Nombre del botón:::')
    console.log(e.target.name)
    const token = localStorage.getItem('TOKEN');
    const idRequest = e.target.name
    const urlUpdateRequest = 'https://income-system.herokuapp.com/rental-requests/'+ idRequest +'/'+ ref
    const urlConfirmRequest = 'https://income-system.herokuapp.com/rents'

    console.log('Test de Fechas')
    let numberOfDays = props.req.contract.days; // Aquí poner el total de días del contrato
    const periodo = props.req.contract.period
    numberOfDays = !numberOfDays ? periodo : numberOfDays
    numberOfDays = !numberOfDays? 0: numberOfDays
    const formattedDate = (date) =>{
        const fecha = date

        const day = fecha.getDate() + 1
        const month = fecha.getMonth() + 1
        const year = fecha.getFullYear()

        const  realMonth = month < 10 ? `0${month}` : `${month}`
        const realDay = day < 10 ? `0${day}` : `${day}`
        const completeDate = `${year},${realMonth},${realDay}`
        
        return completeDate
    }
     
    const date = new Date();
    console.log(date)
    const startDate = formattedDate(date)
    console.log(startDate)

    const finalDate = addDays(date, numberOfDays);
    const ffinalDate = formattedDate(finalDate)
    console.log(ffinalDate)
    console.log('End de Fechas')

    const updateStatus = async (url) => {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }    
        }

        try{
            const response = await fetch(url, config)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    // Esta se llama solo en caso de que quiera confirmar
    const confirmRequest = async (url) => {

        const dataForRent = { 
                "id_rentalRequest": `${e.target.name}`,
                "start_date":`${startDate}`,
                "end_date":`${ffinalDate}`
        }
        console.log('Datos a Enviar: ')
        console.log(dataForRent)

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
            console.log(data)
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
    console.log(`update vale ${props.update}`)  


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
            
            </List>
        </div>

    
        <div id="group-details">
            {
                // Vista de Lessee
                (lessee && evalStatus(props.req.answer.status) && 
                <div>
                    <button id='4' className = "red-button" name={props.idRR} onClick={handleClick}>Cancelar</button>    
                </div>)
                ||
                // Vista de Lessor
                (lessor && evalStatus(props.req.answer.status) &&
                    <div>
                        <button id='2' className = "green-button" name={props.idRR} onClick={handleClick}>Aceptar</button>
                        <button id= '3' className = "red-button" name={props.idRR} onClick={handleClick}>Rechazar</button>
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
