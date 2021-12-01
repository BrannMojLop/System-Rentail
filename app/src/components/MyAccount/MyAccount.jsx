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
    const [ msg, setMsg ] = React.useState({status: "success", message: "Perfil Actualizado con Exito!"})
    const [ loading, setLoading ] = React.useState(null);
    const [ avatar, setAvatar ] = React.useState("")
    const [ dialogText, setDialogText ] = React.useState(null)
    const [ dataEdit, setDataEdit ] = React.useState(null)
    const [ passwordEdit, setPasswordEdit ] = React.useState({password_current:"", password_new:""})

    React.useEffect(() => {
        setLoading(true)
    
        const getUser = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + props.user.token
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
            } } 
    
            getUser('https://system-rentail-api.herokuapp.com/users/' + props.user.id)
    
        }, [])
    
      React.useEffect(() => {
        setLoading(true)
    
        const getUser = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + props.user.token
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
            } } 
    
            getUser('https://system-rentail-api.herokuapp.com/users/' + props.user.id)
    
        }, [userData]);
    
          const [open, setOpen] = React.useState(false);
        
          const handleChange = (event) => {
            switch (dialogText) {
              case 'Username':
                setDataEdit({username: event.target.value})
                break;
              case 'Nombre': 
                setDataEdit({firstname: event.target.value})
                break;
              case 'Apellidos': 
                setDataEdit({lastname: event.target.value})
                break;
              case 'Email': 
                setDataEdit({email: event.target.value})
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
                if(event.target.id === ""){
                    setDialogText(event.target.parentElement.id);
                } else {
                    setDialogText(event.target.id);
                }
                setOpen(true);
          };
        
          const handleClose = async (event, reason) => {
            if (reason === 'backdropClick') {
              setOpen(false);
            }
            else if (event.target.textContent === "Cancel") {
              setOpen(false);
    
            } else {
              setOpen(false);
              setLoading(true);
    
              try {
                const url = 'https://system-rentail-api.herokuapp.com/users/' + props.user.id
                const config = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + props.user.token
                    },
                    body: JSON.stringify(dialogText == "Contraseña" ? passwordEdit : dataEdit)
                }
    
                await fetch(url, config)
                setUserData({})
                setMsg({status: "success", message: "Perfil Actualizado con Exito!"})
                setOpenAlert(true)
                setLoading(false)
    
              } catch (e){ 
                  setMsg({status: "error", message: "No se pudo Actualizar!"})
                  setOpenAlert(true); 
              } 
            }
          };
    
          const [openAlert, setOpenAlert] = React.useState(false);
      
          const handleCloseAlert = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpenAlert(false);
          };

          const handleClick = (event) => {
            event.preventDefault();
            window.location.href = '/user/panel-requests'
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
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia 
                        className="card-media"
                        component="img"
                        height="140"
                        image={products}
                        alt="products"
                      />
                      <CardContent>
                        <Typography className="text-card" gutterBottom variant="h5" component="div">
                        Productos
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        className="card-media"
                        component="img"
                        height="140"
                        image={publications}
                        alt="publications"
                      />
                      <CardContent>
                        <Typography className="text-card" gutterBottom variant="h5" component="div">
                        Publicaciones
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        className="card-media"
                        component="img"
                        height="140"
                        image={rents}
                        alt="rents"
                      />
                      <CardContent>
                        <Typography className="text-card" gutterBottom variant="h5" component="div">
                        Rentas
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
                <Card onClick={handleClick} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        className="card-media"
                        component="img"
                        height="140"
                        image={requests}
                        alt="requests"
                      />
                      <CardContent>
                        <Typography className="text-card" gutterBottom variant="h5" component="div">
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
                            <TextField id="textEdit" label={dialogText == "Contraseña" ? dialogText + ' Actual' : dialogText} variant="outlined" onChange={handleChange} />
                          </FormControl>
                          {dialogText == "Contraseña" ? <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="textEditNew" label={'Nueva ' + dialogText} variant="outlined" onChange={handleChange} />
                          </FormControl>: null}
                        </Box>
                    </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Ok</Button>
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
