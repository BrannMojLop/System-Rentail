import React, { useState, useEffect } from 'react';
import { Details } from './Details';
import '../styles/table.sass'





const evalStatus = (estatus)=>{
    let classN = "";
     switch(estatus){
         case 'En Espera':
             classN='pending'
             break;
         case 'Rechazada':
            classN='cancelled'
             break;
         case 'Cancelada':
            classN='cancelled'
             break;
         case 'Confirmada':
            classN='accepted'
             break;
     } 
     
     return classN;
}

export function Table(props) {

    const [ requestsList, setRequests] = useState([]);
    const [active, setActive] = useState([''])
    const typeQuery = props.type
    
    console.log(`Tipo de tabla ${typeQuery}`)
    localStorage.setItem('UserId', '614cdde351de9100162a0bc2')
    const idUser = localStorage.getItem('UserId')
 
    useEffect( () => {
      
        const getRequestsList = async (url) =>{
            
            try{
                const response = await fetch(url)
                const data = await response.json()
                console.log(data)
                setRequests(data)
            } catch(err){
                console.log(err)
            }
        
        }
        const requestURL = 'https://income-system.herokuapp.com/rental-requests?id_'+ typeQuery + '=' +idUser
        console.log(`url a consultar ${requestURL}`)
        // getRequestsList('https://income-system.herokuapp.com/rental-requests?id_'+ typeQuery + idUser)
        getRequestsList(requestURL)

    }, [])
   

    return (
        <>
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha de Solicitud</th>
                        <th>Resumen de Publicación</th>
                        <th>Última Actualización</th>
                        <th>Estatus</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestsList.map( request => {
                            const estatus = request.answer.status;
                            return <>
                            <tr key = {request._id}>
                                <td>{request.createdAt.substr(0, 10) + " " + request.createdAt.substr(11, 5)}</td>
                                <td>Breve Descripción</td>
                                <td>{request.updatedAt.substr(0, 10) + " " + request.updatedAt.substr(11, 5)}</td>
                                <td><div className= {evalStatus(estatus)}>{estatus}</div></td>  
                                <td>
                                    <button 
                                            className="show-more-details" 
                                            id={request._id} 
                                            onClick= {e => {setActive (active => e.target.id)}}>
                                    </button>
                                </td>               
                            </tr>
                            <tr className="detailsR">
                                <td>
                                     <Details req={request} active={active}/>
                                </td>
                            </tr>
                            </>
                        }) 
                    }
                </tbody>
            </table>
        </div>
        </>
    )

}
