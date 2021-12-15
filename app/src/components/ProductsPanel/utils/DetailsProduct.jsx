import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import ModalEdit from "./ModalEdit/ModalEdit"
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SimpleBackdrop from '../../utils/SimpleBackdrop/SimpleBackdrop'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  const [ loading, setLoading ] = React.useState(null);
  const [ msg, setMsg ] = React.useState({status: "success", message: "Producto Deshabilitado con Éxito!"})

  const handleClose = () => {
    props.setOpen(false);
  };

  const disableProduct = async (action) => {
    setLoading(true);
    try {
      const url = 'https://system-rentail-api.herokuapp.com/products/' + props.productData[0]._id
      const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token 
          },
          body: JSON.stringify({ status: action })
          
      } 
      await fetch(url, config)
      if (action){
        setMsg({status: "success", message: "Producto Activado con Éxito!"})
      } else {
        setMsg({status: "success", message: "Producto Deshabilitado con Éxito!"})
      }
      setOpenAlert(true)
      setTimeout(() => {
        window.location.href = "/user/panel-products"
      }, 1500)

    } catch (e){
      setMsg({status: "error", message: "No se pudo Deshabilitar!"})
      setOpenAlert(true);
      setLoading(false) 
    } 
  }

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = (event) => {
    if (event.target.id === "edit"){
      setOpenModal(true);
    } else if (event.target.id === "disable") {
        disableProduct(false)
    } else if (event.target.id === "enable") {
      disableProduct(true)
    }
  };

  let dateCreated = new Date(props.productData[0].createdAt);
  let dateUpdated = new Date(props.productData[0].updatedAt);
  dateCreated = dateCreated.getDate() + "-"+ dateCreated.getMonth()+ "-" +dateCreated.getFullYear()
  dateUpdated = dateUpdated.getDate() + "-"+ dateUpdated.getMonth() + "-" + dateUpdated.getFullYear()

  const [openAlert, setOpenAlert] = React.useState(false);
      
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
    <div>
      {loading ? <SimpleBackdrop loading={true} />: null} 
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ background: "#eef4f7 !important" }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#153E90'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.productData[0].name}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="header-product">
          <div className="description">
            <h3>Descripción de producto:</h3>
            <p>{props.productData[0].description}</p>
          </div>
          <div className="actions-product">
            <Button onClick={handleClickOpen} id="edit" className="btn-product"variant="outlined"> Editar Producto </Button>
            {props.productData[0].status ? <Button className="btn-product"variant="outlined" id="disable" onClick={handleClickOpen}>Deshabilitar Producto</Button> : <Button className="btn-product"variant="outlined" id="enable" onClick={handleClickOpen}>Activar Producto</Button> }
          </div>
        </div>
        <div className="details-product">
            <div className="box-image">
                <img src={props.productData[0].image} alt={props.productData[0].name} />
            </div>
            <div className="box-atributes">
                <h4>Detalles de Producto</h4>
                <div className="option">
                  <TextField className="input-product" label="Producto" value={props.productData[0].name} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Categoría" value={props.productData[0].category[0].name} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Creado el" value={dateCreated} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Última actualización" value={dateUpdated} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Estatus" value={props.productData[0].status ? "Activo" : "Deshabilitado" } disabled={true} />
                </div>
              </div>
        </div>
        <ModalEdit openModal={openModal} setOpenModal={setOpenModal} productData={props.productData}/>
      </Dialog>
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


