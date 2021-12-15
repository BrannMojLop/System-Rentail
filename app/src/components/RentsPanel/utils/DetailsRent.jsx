import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ActionsRents from './ActionsRents/ActionsRents'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  const [ msg, setMsg ] = React.useState({status: "success", message: "Renta Actualizada con Éxito!"})
  const [ open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClickAction = async (event) => {
    let option = null
    if (event.target.id === "payment"){
      option = "4"  
    } else if (event.target.id === "cancel") {
      option = "3"
    }

    handleClose()
    props.setLoading(true);
    try {
      const url = 'https://system-rentail-api.herokuapp.com/rents/' + props.rentInfo[0]._id + "/" + option
      const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token 
          }
      } 

      await fetch(url, config)
      setOpenAlert(true)
      setTimeout(() => {
        window.location.href = "/user/panel-rents"
      }, 1500)

    } catch (e){
      setMsg({status: "error", message: "No se pudo Actualizar!"})
      setOpenAlert(true);
      props.setLoading(false) 
    } 
  };

  let dateStart = new Date(props.rentInfo[0].start_date);
  let dateEnd = new Date(props.rentInfo[0].end_date);
  dateStart = dateStart.getDate() + "-"+ (dateStart.getMonth()+1)+ "-" +dateStart.getFullYear()
  dateEnd = dateEnd.getDate() + "-"+ (dateEnd.getMonth()+1) + "-" + dateEnd.getFullYear()

  const [openAlert, setOpenAlert] = React.useState(false);
      
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
              Folio de Renta: {props.rentInfo[0].index}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="header-product">
          <div className="description">
            <h3>Producto Rentado:</h3>
            <p>{props.rentInfo[0].product.name}</p>
          </div>
          {props.optionSwitch == 0 ? <ActionsRents handleClickAction={handleClickAction} rentInfo={props.rentInfo}/> : null}
        </div>
        <div className="details-product">
            <div className="box-image">
                <img src={props.rentInfo[0].product.image} alt={props.rentInfo[0].product.name} />
            </div>
            <div className="box-atributes">
                <h4>Detalles de Renta</h4>
                <List
                sx={{ width: '80%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="contracts"
                >
                <ListItemButton onClick={handleClick}>
                <ListItemText primary="Contrato de Renta" />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  <ListItemButton id="contract" className="contract-list" sx={{ pl: 4 }}>
                  <ListItemText className="input-publication-panel" label="Contrato de Renta">{`${props.rentInfo[0].request.contract.period} Días por $${props.rentInfo[0].request.contract.price} pesos`}</ListItemText>
                  </ListItemButton>
                  </List>
                </Collapse>
              </List>
                <div className="option">
                  <TextField className="input-product" label="Estatus" value={props.rentInfo[0].status.status} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Estatus de Pago" value={props.rentInfo[0].payment ? "Pagada" : "Pendiente"} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Inicio de renta" value={dateStart} disabled={true} />
                </div>
                <div className="option">
                  <TextField className="input-product" label="Término de renta" value={dateEnd} disabled={true} />
                </div>
                <div className="option">
                  {/* <TextField className="input-product" label="Categoria" value={props.rentInfo[0].category[0].name} disabled={true} /> */}
                </div>
              </div>
        </div>
        {/* <ModalEdit openModal={openModal} setOpenModal={setOpenModal} rentInfo={props.rentInfo}/> */}
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


