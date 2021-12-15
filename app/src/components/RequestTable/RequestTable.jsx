import React, { useState, useEffect } from 'react';
import { Details, MobileDetails } from '../RequestDetails/RequestDetails';
import './request_table.sass';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



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


function Row(props) {
  const { request } = props;
  const estatus = request.answer.status;
  const [open, setOpen] = React.useState(false);
 
  useEffect( () => {
    //console.log(`Var que recibo ${props.update}`)
}, [props.update])

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)} className="item-table">        
        <StyledTableCell className = "webOnly">
            {request.createdAt.substr(0, 10) + " " + request.createdAt.substr(11, 5)}
        </StyledTableCell>
        <StyledTableCell align="center">{request.publication[0].title}</StyledTableCell>
        <StyledTableCell className = "webOnly" align="center">{request.updatedAt.substr(0, 10) + " " + request.updatedAt.substr(11, 5)}</StyledTableCell>
        <StyledTableCell align="center">        

            <Chip label={estatus} variant="outlined" className= {`${evalStatus(estatus)}`} />
            
        </StyledTableCell>
 
      </StyledTableRow>


      <TableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Details 
                  req={request} 
                  type= {props.type} 
                  idRR ={props.idRR}
                  setUpdate={props.setUpdate} 
                  update={props.update}
                />

              </Typography>
              
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}


// Esto es lo que se desplegará en vista mobile para cada elemento de la tabla 
const MobileRow = (props) => {
  const { request } = props;
  const estatus = request.answer.status;
  const [open, setOpen] = React.useState(false);
 
  useEffect( () => {
    //console.log(`Var que recibo ${props.update}`)
}, [props.update])

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)} className="item-table">        
        <StyledTableCell align="center">{request.publication[0].title}</StyledTableCell>
        <StyledTableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
            >
              <InfoIcon className= {`${evalStatus(estatus)}-mobile`} />
            </IconButton>                
        </StyledTableCell>
      </StyledTableRow>


      <TableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              <MobileDetails 
                  req={request} 
                  type= {props.type} 
                  idRR ={props.idRR}
                  setUpdate={props.setUpdate} 
                  update={props.update}
                />
              </Typography>
              
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}




// Tabla Completa Web


export  function CollapsibleTable(props) {

    
  const [ requestsList, setRequests] = useState([]);
  const typeQuery = props.type
  
  //console.log(`Tipo de tabla ${typeQuery}`)
  //localStorage.setItem('UserId', '614cdde351de9100162a0bc2')
  // const idUser = localStorage.getItem('UserId')
  const sUser = JSON.parse(localStorage.getItem('user'))
  const idUser = sUser.id

  const [ update, setUpdate ] = useState(7);
  const [ loading, setLoading ] = useState(null);


  const increment = () => {
      setUpdate(update + 1)
    }

  useEffect( () => {
    
      const getRequestsList = async (url) =>{
        setLoading(true)
          
          try{
              const response = await fetch(url)
             
            
              if (response.status != 404){
                const data = await response.json()
                setRequests(data)
                setLoading(false)

              }
              else {
                setLoading(false)
            
              }
              
          } catch(err){
              console.log(err)
          }
      
      }
      const requestURL = 'https://system-rentail-api.herokuapp.com/rental-requests?id_'+ typeQuery + '=' +idUser
      getRequestsList(requestURL)

  }, [update])
 
  

return (
  <>
  {loading ? <SimpleBackdrop loading={true} />: null}
  <TableContainer className="web" component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow className="table-header">
          <StyledTableCell style={{ backgroundColor: '#153E90'}} className="table-header webOnly" >Fecha de Solicitud</StyledTableCell>
          <StyledTableCell style={{ backgroundColor: '#153E90'}} className="table-header" align="center">Publicación</StyledTableCell>
          <StyledTableCell style={{ backgroundColor: '#153E90'}}className="table-header webOnly" align="center">Última Actualización</StyledTableCell>
          <StyledTableCell style={{ backgroundColor: '#153E90'}} className="table-header"  align="center">Estatus</StyledTableCell>
       
        </TableRow>
      </TableHead>
      <TableBody>
        {requestsList.map((request) => (         
          <Row key={request._id} request={request} type={typeQuery} idRR ={request._id}
          setUpdate= {increment} update={update}
          />
        ))}

      </TableBody>
    </Table>
  </TableContainer>
  </>
);
}



// Tabla Completa Mobile

export  function CollapsibleTableMobile(props) {

  const [ requestsList, setRequests] = useState([]);
  const typeQuery = props.type
  const sUser = JSON.parse(localStorage.getItem('user'))
  const idUser = sUser.id

  const [ update, setUpdate ] = useState(7);
  const [ loading, setLoading ] = useState(null);


  const increment = () => {
      setUpdate(update + 1)
    }

  useEffect( () => {
    
      const getRequestsList = async (url) =>{
        setLoading(true)
          
          try{
              const response = await fetch(url)
            
             
              if (response.status != 404){
                const data = await response.json()
                setRequests(data)
                setLoading(false)

              }
              else {
                setLoading(false)
              }
              
              
          } catch(err){
              console.log(err)
          }
      
      }
      const requestURL = 'https://system-rentail-api.herokuapp.com/rental-requests?id_'+ typeQuery + '=' +idUser
      getRequestsList(requestURL)

  }, [update])
 
  

return (
  <>
  {loading ? <SimpleBackdrop loading={true} />: null}
  <TableContainer className="mobile"component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <StyledTableRow className="table-header">
          <StyledTableCell style={{ backgroundColor: '#153E90'}} className="table-header" align="center">Publicación</StyledTableCell>
          <StyledTableCell style={{ backgroundColor: '#153E90'}} className="table-header"  align="center">Estatus</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {requestsList.map((request) => (         
          <MobileRow key={request._id} request={request} type={typeQuery} idRR ={request._id}
          setUpdate= {increment} update={update}
          />
        ))}

      </TableBody>
    </Table>
  </TableContainer>
  </>
);
}

