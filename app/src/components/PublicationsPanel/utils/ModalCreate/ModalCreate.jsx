import * as React from 'react';
import SimpleBackdrop from '../../../utils/SimpleBackdrop/SimpleBackdrop'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import "./modal-create.sass"
import { createDecipheriv } from 'crypto';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalCreate(props) {

  let dateDefault = new Date()
  dateDefault.setDate(dateDefault.getDate() + 30);

  const [ createData, setCreateData ] = React.useState({
    periods: [],
    prices: [],
    finished_at: dateDefault
  })
  const [ selectProducts, setSelectProducts] = React.useState([]);
  const [ loading, setLoading ] = React.useState(null);
  const [ open, setOpen] = React.useState(true);
  const [ openModalContract, setOpenModalContract ] = React.useState(false);
  const [ optionContract, setOptionContract] = React.useState(null);

  const contracts = {
    prices: createData.prices,
    periods: createData.periods,
  }

  const validateNumbers = ()=>{
    console.log('holi')

    if(createData.prices.length !== createData.periods.length){

      console.log('volvere', createData.prices.length, createData.periods.length)
      return
    }

    for (let i=0; i<createData.periods.length; i++){
      if(isNaN(createData.prices[i]) || isNaN(createData.periods[i])){
        console.log('holi',createData.prices[i], createData.periods[i])
        return
      }
      else{
        if(createData.periods[i]<1){
          return
        }
      }

    }
/*
    for (const price of createData.prices){
      if(isNaN(price)){
        return
      }
    }

    for (const period of createData.periods){
      if(isNaN(period)){
        return
      }
    }*/
    //console.log('todo ok')
    return 'ok'
  }

  React.useEffect(() => {
    setLoading(true);
    const getProducts = async (url) => {
      try {
        const config = {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
        }

        const request = await fetch(url, {
          headers: config
        }) 
          const jsonRequest = await request.json() 
          setSelectProducts(jsonRequest)
          setLoading(false)

        } catch (e){ 
          console.log(e); 
        } } 

        getProducts('https://system-rentail-api.herokuapp.com/products?id_lessor=' + JSON.parse(localStorage.getItem('user')).id + '&published=true')

},[])


  const createPub = async () =>{
    props.setOpenModal(false);
    props.setLoading(true)
    try {
      const url = 'https://system-rentail-api.herokuapp.com/publications'
      const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token 
          },
          body: JSON.stringify(createData)
          
      }
      const response = await fetch(url, config)
      if(response.status !==201){
        props.setMsg({status: "error", message: "Algo salió mal"})
      }
      props.setOpenAlert(true)
      setTimeout(() => {
        window.location.href = "/user/panel-publications"
      }, 1000)

    } catch (e){
      console.log(e);
    } 

  }

  const handleClose = async (event) => {    
    if (event.target.id === 'create-publish'){
      console.log(createData.prices.length)
      // Primero valida que están los campos requeridos
      if (Object.keys(createData).length === 0 ||
          createData.title === ""  || 
          createData.id_product === "" ||
          createData.amount < 1 ||
          createData.prices.length === 0 ||
          createData.periods.length === 0 ) 
        {
          props.setMsg({status: "error", message: "Completa los campos requeridos (*)"})
          props.setOpenAlert(true)
        } 
      
      else{

        //Luego se valida que el formato de los datos sea el adecuado, incluyendo los opcionales
        if(validateNumbers() != 'ok'){
          props.setMsg({status: "error", message: "Selecciona un valor válido para periodos y precios"})
          props.setOpenAlert(true)
        }
        else {
          if(createData.max_distance){
            if (createData.max_distance < 1){
              props.setMsg({status: "error", message: "La distancia mínima es 1"})
              props.setOpenAlert(true)
            }
            else{
              console.log('Cantidad Válida')
              createPub()
            }
          }
          else {
            createPub()
          }

        }

      }
    
    }
    else {
      props.setOpenModal(false);
    }
  };

  const handleCloseContract = () => {
    setCreateData({...createData, prices: contracts.prices})
    setCreateData({...createData, periods: contracts.periods}) 
    setOpenModalContract(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickContract = (event) => {
    if (event.target.id == "add-contract") {
      setOpenModalContract(true)
      setOptionContract(createData.periods.length)
    } else if (event.target.id == "") {
      if (event.target.parentElement.id == "add-contract") {
        setOpenModalContract(true)
        setOptionContract(createData.periods.length)
      } else if (event.target.parentElement.id == ""){
        setOpenModalContract(true)
        setOptionContract(event.target.parentElement.parentElement.id)
      } else {
        setOptionContract(event.target.parentElement.id)
        setOpenModalContract(true)
      }
    } else {
      setOptionContract(event.target.id)
      setOpenModalContract(true)
    }
  }

  const handleChangeDate = (dateFinished) => {
    setCreateData({...createData, finished_at: dateFinished})
  }

  const handleChange = (event) => {

    
    if (event.target.id === "title"){
      setCreateData({...createData, title:event.target.value});
    } else if (event.target.id === "location") {
      setCreateData({...createData, location:event.target.value})
    } else if (event.target.id === "amount") {
      setCreateData({...createData, amount:event.target.value})
    } else if (event.target.id === "max_distance") {
      setCreateData({...createData, max_distance:event.target.value})
    } else if (event.target.id === "period"){
      contracts.periods[optionContract] = event.target.value
    } else if (event.target.id === "price"){
      contracts.prices[optionContract] = event.target.value
    } else {
      setCreateData({...createData, id_product:event.target.value})
    }
    console.log(createData);
  }

  return (
    <>
    {loading ? <SimpleBackdrop loading={true} />: null} 
    <div >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crear Nueva Publicación
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
            <TextField 
              onChange={handleChange} 
              className="input-product" 
              id="title" label="Título" 
              value={createData.title || "" }
              required="true"
              
            />
            <TextField
              id="product"
              select
              label="Producto"
              className="input-product"
              value={createData.id_product || ""}
              onChange={handleChange}
              required="true"
            >
              {selectProducts.map((o) => <MenuItem key={o._id} value={o._id}>{o.name}</MenuItem> )}
            </TextField>
            <TextField onChange={handleChange} className="input-product" id="location" label="Locación" value={createData.location || "" }/>
            <TextField type="number" onChange={handleChange} className="input-product" id="amount" label="Existencias (mín. 1)" value={createData.amount || "" } required="true"/>
            <TextField type="number" onChange={handleChange} className="input-product" id="max_distance" label="Distancia Máxima (KM)" value={createData.max_distance || "" }/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              id="finished_at"
              label="Finalizar Publicación el:"
              inputFormat="dd/MM/yyyy"
              value={createData.finished_at}
              onChange={handleChangeDate}
              inputProps={{ readOnly: true }}
              renderInput={(params) => <TextField style={{marginTop: "3%"}} {...params} />}
            />
            </LocalizationProvider>
            <List
                sx={{ width: '80%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="contracts"
                >
                <ListItemButton onClick={handleClick}>
                <ListItemText primary="Opciones de Renta" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  {createData.periods.map((period, index) => {
                      return (
                        <ListItemButton onClick={handleClickContract} id={index} className="contract-list" sx={{ pl: 4 }} onClick={handleClickContract}>
                          <ListItemText className="input-publication-panel" label="Opcion de Renta">{`Opcion ${index + 1} - ${period} Dias por $${createData.prices[index]} pesos`}</ListItemText>
                        </ListItemButton>
                      ) 
                  })}
                  <ListItemButton id="add-contract" className="contract-list" sx={{ pl: 4 }} onClick={handleClickContract}>
                    <Button> <strong style={{ margin: "10%" }}> + </strong> Nuevo </Button>
                  </ListItemButton>
                  </List>
                </Collapse>
              </List>
        </DialogContent>
        <DialogActions>
          <Button id="create-publish" autoFocus onClick={handleClose}>
            Crear Publicacion
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseContract}
        aria-labelledby="customized-dialog-title"
        open={openModalContract}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseContract}>
           Editar Opcion - {optionContract == 0 ? "1" : parseInt(optionContract) + 1}
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
        <TextField type="number" onChange={handleChange} className="input-publication" id="period" label="Dias del Periodo" value={ null } />
        <TextField type="number" onChange={handleChange} className="input-publication" id="price" label="Precio" value={ null } />
        </DialogContent>
        <DialogActions>
          <Button id="edit-publication-contract" autoFocus onClick={handleCloseContract}>
            Guardar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    </>
  );
}