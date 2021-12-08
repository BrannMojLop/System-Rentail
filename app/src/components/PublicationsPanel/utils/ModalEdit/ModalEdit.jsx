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
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import "./modal-edit.sass"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [ editData, setEditData ] = React.useState({})
  const [ loading, setLoading ] = React.useState(null);
  const [ msg, setMsg ] = React.useState({status: "success", message: "Publicacion Actualizada con Exito!"})
  const [ selectProducts, setSelectProducts] = React.useState([]);
  const [ open, setOpen] = React.useState(true);
  const [ optionContract, setOptionContract] = React.useState(null);

  const contracts = {
    prices: props.publicationData[0].prices,
    periods: props.publicationData[0].periods
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
    props.setOpenModal(false);
    setOpenModalContract(false);
    if (event.target.id === 'edit-publication'){
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
        await fetch(url, config)
        setOpenAlert(true)
        setTimeout(() => {
          window.location.href = "/user/panel-publications"
        }, 1000)

      } catch (e){
        console.log(e);
      } 
    }
  };

  const handleChange = (event) => {
    if (event.target.id === "title"){
      if (event.target.value !== "") {
        setEditData({...editData, title:event.target.value});
      }
    } else if (event.target.id === "amount"){
      if (event.target.value !== "") {
        setEditData({...editData, amount:event.target.value})
      }
    } else if (event.target.id === "location") {
      if (event.target.value !== "") {
        setEditData({...editData, location:event.target.value})
      }
    } else if (event.target.id === "price"){
      contracts.prices[optionContract] = event.target.value
      setEditData({...editData, prices: contracts.prices})
    } else if (event.target.id === "period"){
      contracts.periods[optionContract] = event.target.value
      setEditData({...editData, periods: contracts.periods}) 
    } else {
      setEditData({...editData, id_product:event.target.value})
    }
  }

  const [openModalContract, setOpenModalContract] = React.useState(false);

  const handleCloseContract = () => {
    setOpenModalContract(false);
  };

  const [openAlert, setOpenAlert] = React.useState(false);
      
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickContract = (event) => {
    if (event.target.id == "add-contract") {
      setOpenModalContract(true)
      setOptionContract(String(props.publicationData[0].periods.length));
      console.log(optionContract);
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
          <TextField onChange={handleChange} className="input-publication" id="title" label="Titulo" value={editData.title || null}/>
          <TextField onChange={handleChange} type="number" className="input-publication" id="amount" label="Exitencias" value={editData.amount || null }/>
          <TextField onChange={handleChange} className="input-publication" id="location" label="Locación" value={editData.location || null }/>
          <TextField
              id="product"
              select
              label="Producto"
              className="input-publication"
              value={editData.id_product || props.publicationData[0].product[0].name}
              onChange={handleChange}
            >
              {selectProducts.map((p) => <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem> )}
            </TextField>
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
                  {props.publicationData[0].periods.map((period, index) => {
                      return (
                        <ListItemButton onClick={handleClickContract} id={index} className="contract-list" sx={{ pl: 4 }} onClick={handleClickContract}>
                          <ListItemText className="input-publication-panel" label="Opcion de Renta">{`Opcion ${index + 1} - ${period} Dias por $${props.publicationData[0].prices[index]} pesos`}</ListItemText>
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
           Editar Opcion - {parseInt(optionContract) + 1}
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
        <TextField type="number" onChange={handleChange} className="input-publication" id="period" label="Dias del Periodo" value={ null }/>
        <TextField type="number" onChange={handleChange} className="input-publication" id="price" label="Precio" value={ null }/>
        </DialogContent>
        <DialogActions>
          <Button id="edit-publication-contract" autoFocus onClick={handleCloseContract}>
            Guardar
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Stack spacing={2}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={msg.status} sx={{ width: '100%' }}>
          {msg.message}
        </Alert>
      </Snackbar>
      </Stack>
    </div>
    </>
  );
}