import * as React from 'react';
import PropTypes from 'prop-types';
import SimpleBackdrop from '../../../utils/SimpleBackdrop/SimpleBackdrop'
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
import "./modal-edit.sass"

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

export default function ModalEdit(props) {

  const [ editData, setEditData ] = React.useState(props.publicationData[0])
  const [ loading, setLoading ] = React.useState(null);
  const [ selectProducts, setSelectProducts] = React.useState([]);
  const [ open, setOpen] = React.useState(true);
  const [ optionContract, setOptionContract] = React.useState(null);

  const contracts = {
    prices: editData.prices,
    periods: editData.periods
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

  const handleClose = async (event) => {
    setOpenModalContract(false);
    if (event.target.id === 'edit-publication'){
      if (editData.title === '' || editData.id_product === '' || editData.amount === '' || editData.prices.length === 0 || editData.periods.length === 0){
        props.setMsg({status: "error", message: "Completa los datos requeridos (*)"})
        props.setOpenAlert(true)
      } else {
        props.setOpenModal(false);
        setLoading(true)
        try {
          const url = 'https://system-rentail-api.herokuapp.com/publications/' + props.publicationData[0]._id
          const config = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token 
              },
              body: JSON.stringify(editData)
              
          }
          const response = await fetch(url, config)
          if (response.status === 400 || response.status === 401 ){
            props.setMsg({status: "error", message: "Algo salió mal, intenta nuevamente"})
          }
          else {
            
            props.setMsg({status: "success", message: "Publicación actualizada correctamente"})
          }
      
          props.setOpenAlert(true)
          setTimeout(() => {
            window.location.href = "/user/panel-publications"
          }, 1000)
    
        } catch (e){
          console.log(e);
        } 
      }
    } else {
      props.setOpenModal(false);
      props.setRefresh(!props.refresh)
      props.handleClose()
    }
  };

  const handleChange = (event) => {
    if (event.target.id === "title"){
        setEditData({...editData, title:event.target.value});
    } else if (event.target.id === "amount"){
        setEditData({...editData, amount:event.target.value})
    } else if (event.target.id === "location") {
        setEditData({...editData, location:event.target.value})
    } else if (event.target.id === "price"){
      if (event.target.value === "0"){
        props.setMsg({status: "error", message: "No es posible indicar 0 pesos para el precio"})
        props.setOpenAlert(true)
      } else {
        contracts.prices[optionContract] = event.target.value
        setEditData({...editData, prices: contracts.prices})
      }
    } else if (event.target.id === "period"){
      if (event.target.value === "0"){
        props.setMsg({status: "error", message: "No es posible indicar 0 dias para el periodo"})
        props.setOpenAlert(true)
      } else {
        contracts.periods[optionContract] = event.target.value
        setEditData({...editData, periods: contracts.periods})
      } 
    } else {
      setEditData({...editData, id_product:event.target.value})
    }
  }

  const [openModalContract, setOpenModalContract] = React.useState(false);

  const handleCloseContract = () => {
    setOpenModalContract(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickContract = (event) => {
    if (event.target.id == "add-contract") {
      setOpenModalContract(true)
      setOptionContract(String(props.publicationData[0].periods.length));
    } else if (event.target.id == "") {
      if (event.target.parentElement.id == "add-contract") {
        setOpenModalContract(true)
        setOptionContract(String(props.publicationData[0].periods.length));
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
           Editar: {props.publicationData[0].title}
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
          <TextField onChange={handleChange} className="input-publication" id="title" label="Título"  defaultValue={editData.title} required="true"/>
          <TextField onChange={handleChange} type="number" className="input-publication" id="amount" label="Existencias" value={editData.amount} required="true"/>
          <TextField onChange={handleChange} className="input-publication" id="location" label="Locación" value={editData.location}/>
          <TextField
              id="product"
              select
              label="Producto"
              className="input-publication"
              value={editData.id_product}
              onChange={handleChange}
              required="true"
            >
              <MenuItem key={editData.id_product} value={editData.id_product}>{editData.product[0].name}</MenuItem>
              {selectProducts.map((p) => <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem> )}
            </TextField>
            <List
                sx={{ width: '80%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="contracts"
                >
                <ListItemButton onClick={handleClick}>
                <ListItemText primary="Opciones de Renta *" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  {editData.periods.map((period, index) => {
                      return (
                        <ListItemButton onClick={handleClickContract} id={index} className="contract-list" sx={{ pl: 4 }} onClick={handleClickContract}>
                          <ListItemText className="input-publication-panel" label="Opción de Renta">{`Opción ${index + 1} - ${period} Días por $${editData.prices[index]} pesos`}</ListItemText>
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
          <Button id="edit-publication" autoFocus onClick={handleClose}>
            Aplicar Cambios
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseContract}
        aria-labelledby="customized-dialog-title"
        open={openModalContract}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseContract}>
           Editar Opción - {parseInt(optionContract) + 1}
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
        <TextField type="number" onChange={handleChange} className="input-publication" id="period" label="Días del Periodo" value={ null }/>
        <TextField type="number" onChange={handleChange} className="input-publication" id="price" label="Precio" value={ null }/>
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