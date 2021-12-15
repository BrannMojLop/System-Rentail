import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import TextField from '@mui/material/TextField';
import { deepPurple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import products from '../../public/assets/products.png'
import publications from '../../public/assets/publications.jpg'
import rents from '../../public/assets/rents.jpg'
import requests from '../../public/assets/requests.jpg'
import './my-account.sass'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

export default function MyAccount(props) {
    
    const [ userData, setUserData ] = React.useState({})
    const [ msg, setMsg ] = React.useState({status: "success", message: "Perfil actualizado con éxito!"})
    const [ loading, setLoading ] = React.useState(null);
    const [ avatar, setAvatar ] = React.useState("")
    const [ dialogText, setDialogText ] = React.useState(null)
    const [ dataEdit, setDataEdit ] = React.useState(null)
    const [ passwordEdit, setPasswordEdit ] = React.useState({password_current:"", password_new:""})
    const [ editAply, setEditAply ] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
    
        const getUser = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }
    
            const request = await fetch(url, {
              headers: config
            }) 
              const jsonRequest = await request.json() 
              setUserData(jsonRequest)
              if(jsonRequest.lastname && jsonRequest.firstname){
                setAvatar(jsonRequest.firstname.charAt(0) + jsonRequest.lastname.charAt(0))
              } else {
                setAvatar('?')
              }
              
              setLoading(false)
            } catch (e){ 
              console.log(e); 
              setLoading(false)
            } } 
            getUser('https://system-rentail-api.herokuapp.com/users/' + JSON.parse(localStorage.getItem('user')).id)
        }, [])
    
      React.useEffect(() => {
        setLoading(true)
    
        const getUser = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }
    
            const request = await fetch(url, {
              headers: config
            }) 
              const jsonRequest = await request.json() 
              setUserData(jsonRequest)
                        if(jsonRequest.lastname && jsonRequest.firstname){
                setAvatar(jsonRequest.firstname.charAt(0) + jsonRequest.lastname.charAt(0))
              } else {
                setAvatar('?')
              }
              setLoading(false)
            } catch (e){ 
              console.log(e); 
              setLoading(false)
            } } 
    
            getUser('https://system-rentail-api.herokuapp.com/users/' + JSON.parse(localStorage.getItem('user')).id)
    
        }, [editAply]);
    
          const [open, setOpen] = React.useState(false);
        
          const handleChange = (event) => {
            switch (dialogText) {
              case 'Username':
                if(event.target.value !== ""){
                  setDataEdit({username: event.target.value})
                } 
                break;
              case 'Nombre': 
              if(event.target.value !== ""){
                setDataEdit({firstname: event.target.value})
              } 
                break;
              case 'Apellidos': 
              if(event.target.value !== ""){
                setDataEdit({lastname: event.target.value})
              } 
                break;
              case 'Contraseña':
                if (event.target.id === "textEditNew"){
                  setPasswordEdit({...passwordEdit, password_new:event.target.value})
                } else {
                  setPasswordEdit({...passwordEdit, password_current:event.target.value})
                }
            }
          };
        
          const handleClickOpen = (event) => {
                if (event.target.id == "Correo") {
                    setMsg({status: "warning", message: "Esta opción pronto estara disponible"})
                    setOpenAlert(true)
                } else if(event.target.id === ""){
                    setDialogText(event.target.parentElement.id);
                    setOpen(true);
                } else {
                    setDialogText(event.target.id);
                    setOpen(true);
                }
          };
        
          const handleClose = async (event, reason) => {
            const sendEdit = async () => {
              try {
                const url = 'https://system-rentail-api.herokuapp.com/users/' + JSON.parse(localStorage.getItem('user')).id
                const config = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
                    },
                    body: JSON.stringify(dialogText == "Contraseña" ? passwordEdit : dataEdit)
                }
                const request = await fetch(url, config)
                if (request.status === 400) {
                  setMsg({status: "error", message: "No se pudo Actualizar, valide sus credenciales!"})
                  setOpenAlert(true); 
                  setDataEdit(null);
                  setPasswordEdit({password_current:"", password_new:""})
                  setLoading(false)
                  setOpen(false);
                } else {
                  setUserData({})
                  setDataEdit(null);
                  setPasswordEdit({password_current:"", password_new:""})
                  setMsg({status: "success", message: "Perfil Actualizado con Exito!"})
                  setOpenAlert(true)
                  setEditAply(true)
                  setOpen(false);
                  setLoading(false)
                  setEditAply(false)
                }
    
              } catch (e){ 
                  setMsg({status: "error", message: "No se pudo Actualizar, valide sus credenciales!"})
                  setOpenAlert(true); 
                  setDataEdit(null);
                  setPasswordEdit({password_current:"", password_new:""})
                  setLoading(false)
                  setOpen(false);
              }
            }

            if (reason === 'backdropClick') {
              setOpen(false);
              setDataEdit(null);
              setPasswordEdit({password_current:"", password_new:""})
            }
            else if (event.target.textContent === "Cancel") {
              setOpen(false);
              setDataEdit(null);
              setPasswordEdit({password_current:"", password_new:""})
    
            } else {
              if (event.target.id === "Contraseña"){
                if(passwordEdit.password_current == "" || passwordEdit.password_new == "") {
                  setMsg({status: "error", message: "Complete los datos requeridos (*)"})
                  setOpenAlert(true)
                } else {
                  sendEdit()
                }
              } else if (!dataEdit) {
                setMsg({status: "error", message: "Complete los datos requeridos (*)"})
                setOpenAlert(true)
              } else if (dataEdit || passwordEdit) {
                  sendEdit()
                }
              }
            }
    
          const [openAlert, setOpenAlert] = React.useState(false);
      
          const handleCloseAlert = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpenAlert(false);
          };

          const handleClick = (event) => {
            event.preventDefault();
            if (event.target.id === "card-request") {
              window.location.href = '/user/panel-requests'
            } else if (event.target.id === "card-products") {
              window.location.href = '/user/panel-products'
            } else if (event.target.id === "card-publications") {
              window.location.href = '/user/panel-publications'
            } else if (event.target.id === "card-rents") {
              window.location.href = '/user/panel-rents'
            }
          }

    return (
        <>
        {loading ? <SimpleBackdrop loading={true} />: null} 
        <div className="box-account">
            <div className="profile">
                <figure>
                    <Avatar sx={{ fontSize: '2em', width: '130px', height: '130px', bgcolor: deepPurple[500] }}>
                       {avatar}
                    </Avatar>
                </figure>
                <div className="data-profile">
                  <div className="option">
                    <TextField className="input-profile" label="Username" value={userData.username || " "} disabled={true} />
                    <IconButton id='Username' aria-label="edit" size="small" onClick={handleClickOpen}>
                        <EditIcon id='Username' aria-label="edit"/>
                    </IconButton>
                  </div>
                  <div className="option">
                    <TextField className="input-profile" label="Nombre" value={userData.firstname || " "} disabled={true} />
                    <IconButton id='Nombre' aria-label="edit" size="small" onClick={handleClickOpen}>
                        <EditIcon id='Nombre' aria-label="edit"/>
                    </IconButton>
                  </div>
                  <div className="option">
                    <TextField className="input-profile" label="Apellidos" value={userData.lastname || " "} disabled={true} />
                    <IconButton id='Apellidos' aria-label="edit" size="small" onClick={handleClickOpen}>
                        <EditIcon id='Apellidos' aria-label="edit"/>
                    </IconButton>
                  </div>
                  <div className="option">
                    <TextField className="input-profile" label="Correo" value={userData.email || " "} disabled={true} />
                    <IconButton id='Correo' aria-label="edit" size="small" onClick={handleClickOpen}>
                        <EditIcon id='Correo' aria-label="edit"/>
                    </IconButton>
                  </div> 
                  <a id="Contraseña" onClick={handleClickOpen}>Cambiar Contraseña</a>
                </div>
            </div>
            <div className="menu-account">
                <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                    <CardActionArea>
                      <CardMedia 
                        className="card-media"
                        component="img"
                        height="140"
                        image={products}
                        alt="products"
                        id="card-products"
                      />
                      <CardContent>
                        <Typography id="card-products" className="text-card" gutterBottom variant="h5" component="div">
                        Productos
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                    <CardActionArea>
                      <CardMedia
                        id="card-publications"
                        className="card-media"
                        component="img"
                        height="140"
                        image={publications}
                        alt="publications"
                      />
                      <CardContent>
                        <Typography id="card-publications" className="text-card" gutterBottom variant="h5" component="div">
                        Publicaciones
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                    <CardActionArea>
                      <CardMedia
                        id="card-rents"
                        className="card-media"
                        component="img"
                        height="140"
                        image={rents}
                        alt="rents"
                      />
                      <CardContent>
                        <Typography id="card-rents" className="text-card" gutterBottom variant="h5" component="div">
                        Rentas
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card id="card-request" onClick={handleClick} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        id="card-request"
                        className="card-media"
                        component="img"
                        height="140"
                        image={requests}
                        alt="requests"
                      />
                      <CardContent id="card-request">
                        <Typography id="card-request" className="text-card" gutterBottom variant="h5" component="div">
                        Solicitudes de Renta
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Editar {dialogText}</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="textEdit" label={dialogText == "Contraseña" ? dialogText + ' Actual' : dialogText} variant="outlined" onChange={handleChange} required="true" />
                          </FormControl>
                          {dialogText == "Contraseña" ? <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="textEditNew" label={'Nueva ' + dialogText} variant="outlined" onChange={handleChange} required="true" />
                          </FormControl>: null}
                        </Box>
                    </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button id={dialogText} onClick={handleClose}>Ok</Button>
                </DialogActions>
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
    )

}
