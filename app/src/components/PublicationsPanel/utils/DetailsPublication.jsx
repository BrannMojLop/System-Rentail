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
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  const [ loading, setLoading ] = React.useState(null);
  const [ msg, setMsg ] = React.useState({status: "success", message: "Publicacion Deshabilitado con Exito!"})

  const handleClose = () => {
    props.setOpen(false);
  };

  const disablePublication = async (action) => {
    setLoading(true);
    try {
      const url = 'https://system-rentail-api.herokuapp.com/publications/' + props.publicationData[0]._id
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
        setMsg({status: "success", message: "Publicacion Activado con Exito!"})
      } else {
        setMsg({status: "success", message: "Publicacion Deshabilitada con Exito!"})
      }
      setOpenAlert(true)
      setTimeout(() => {
        window.location.href = "/user/panel-publications"
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
        disablePublication(false)
    } else if (event.target.id === "enable") {
      disablePublication(true)
    }
  };

  let dateCreated = new Date(props.publicationData[0].createdAt);
  let dateUpdated = new Date(props.publicationData[0].updatedAt);
  dateCreated = dateCreated.getDate() + "-"+ dateCreated.getMonth()+ "-" +dateCreated.getFullYear()
  dateUpdated = dateUpdated.getDate() + "-"+ dateUpdated.getMonth() + "-" + dateUpdated.getFullYear()

  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleClick = () => {
    setOpen(!open);
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
              {props.publicationData[0].title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="header-publication-panel">
          <div className="description-publication-panel">
            <h3>Descripcion de producto:</h3>
            <p>{props.publicationData[0].product[0].description}</p>
          </div>
          <div className="actions-publication-panel">
            <Button onClick={handleClickOpen} id="edit" className="btn-publication-panel"variant="outlined"> Editar Publicacion </Button>
            {props.publicationData[0].status ? <Button className="btn-publication-panel"variant="outlined" id="disable" onClick={handleClickOpen}>Deshabilitar Publicacion</Button> : <Button className="btn-publication-panel"variant="outlined" id="enable" onClick={handleClickOpen}>Activar Producto</Button> }
          </div>
        </div>
        <div className="details-publication-panel">
            <div className="box-image-publication">
                <img src={props.publicationData[0].product[0].image} alt={props.publicationData[0].product[0].name} />
            </div>
            <div className="box-atributes">
                <h4>Detalles de Publicacion</h4>
                <List
                sx={{ width: '80%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >
                <ListItemButton onClick={handleClick}>
                <ListItemText primary="Opciones de Renta" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      {props.publicationData[0].periods.map((period, index) => {
                      return <ListItemText className="input-publication-panel" label="Opcion de Renta" value={index}>{`${period} Dias por $${props.publicationData[0].prices[index]} pesos`}</ListItemText>
                      })}
                    </ListItemButton>
                  </List>
                </Collapse>
                </List>
                <div className="option">
                  <TextField className="input-publication-panel" label="Producto" value={props.publicationData[0].product[0].name} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-publication-panel" label="Existencias" value={props.publicationData[0].amount} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-publication-panel" label="Locacion" value={props.publicationData[0].location} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-publication-panel" label="Creado el" value={dateCreated} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-publication-panel" label="Ultima actualizacion" value={dateUpdated} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-publication-panel" label="Estatus" value={props.publicationData[0].status ? "Activo" : "Deshabilitada" } disabled={true} />
                </div>
              </div>
        </div>
        <ModalEdit openModal={openModal} setOpenModal={setOpenModal} publicationData={props.publicationData}/>
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