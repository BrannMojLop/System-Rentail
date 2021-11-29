import * as React from 'react';
import "./register.sass";
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
    const { children, ...other } = props;
  
    return (
      <svg width="150" height="50" {...other} ref={ref}>
        <polygon points="0,50 0,0 150,0 150,50" className="bg" />
        <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
        <foreignObject x="0" y="0" width="150" height="50">
          <div className="content">{children}</div>
        </foreignObject>
      </svg>
    );
  });
  
  ButtonRoot.propTypes = {
    children: PropTypes.node,
  };
  
  const CustomButtonRoot = styled(ButtonRoot)(
    ({ theme }) => `
    overflow: visible;
    cursor: pointer;
    --main-color: ${
      theme.palette.mode === 'light' ? 'rgb(25,118,210)' : 'rgb(144,202,249)'
    };
    --hover-color: ${
      theme.palette.mode === 'light'
        ? 'rgba(25,118,210,0.04)'
        : 'rgba(144,202,249,0.08)'
    };
    --active-color: ${
      theme.palette.mode === 'light'
        ? 'rgba(25,118,210,0.12)'
        : 'rgba(144,202,249,0.24)'
    };
  
    & polygon {
      fill: transparent;
      transition: all 800ms ease;
      pointer-events: none;
    }
    
    & .bg {
      stroke: var(--main-color);
      stroke-width: 0.5;
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
      fill: transparent;
    }
  
    & .borderEffect {
      stroke: var(--main-color);
      stroke-width: 2;
      stroke-dasharray: 150 600;
      stroke-dashoffset: 150;
      fill: transparent;
    }
  
    &:hover,
    &.${buttonUnstyledClasses.focusVisible} {
      .borderEffect {
        stroke-dashoffset: -600;
      }
  
      .bg {
        fill: var(--hover-color);
      }
    }
  
    &:focus,
    &.${buttonUnstyledClasses.focusVisible} {
      outline: none;
    }
  
    &.${buttonUnstyledClasses.active} { 
      & .bg {
        fill: var(--active-color);
        transition: fill 300ms ease-out;
      }
    }
  
    & foreignObject {
      pointer-events: none;
  
      & .content {
        font-family: Helvetica, Inter, Arial, sans-serif;
        font-size: 14px;
        font-weight: 200;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--main-color);
        text-transform: uppercase;
      }
  
      & svg {
        margin: 0 5px;
      }
    }`,
  );
  
  const SvgButton = React.forwardRef(function SvgButton(props, ref) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
  });

export default function Register() {

    const [ formData, setFormData ] = React.useState({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      password: null,
      id_type: "614cdbcc51de9100162a0ba1"
    });
    const [ loading, setLoading ] = React.useState(null);
    const [ msg, setMsg ] = React.useState({status: "", message: ""})

    async function sendRegister(event) {
        event.preventDefault()
        setLoading(true)
        try {
            const url = 'https://income-system.herokuapp.com/users'
            const config = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            const request = await fetch(url, config)
            const jsonRequest = await request.json() 

            if (jsonRequest.error) {
              setMsg({status: "error", message: `Algo salio mal, valida tus datos!`})
              setOpenAlert(true)
              setTimeout(() => {
                setLoading(false)
              }, 2000)
            } else {
              setMsg({status: "success", message: `Registro Exitoso, ya puedes inciar sesion!`})
              setOpenAlert(true)
              setTimeout(() => {
                setLoading(false)
                window.location.href = "/user/login"
              }, 2000)
            }
          } catch (e){
              setMsg({status: "error", message: "Algo salio mal, no se pudo completar el registro!"})
              setOpenAlert(true); 
              setLoading(false)
          } 
    }

    function handleChange(event) {
        if (event.target.id === "email"){
          setFormData({...formData, email: event.target.value})
        } else if (event.target.id === "password"){
          setFormData({...formData, password: event.target.value})
        } else if (event.target.id === "firstname") {
          setFormData({...formData, firstname: event.target.value})
        } else if (event.target.id === "lastname") {
          setFormData({...formData, lastname: event.target.value})
        } else if (event.target.id === "username") {
          setFormData({...formData, username: event.target.value})
        }
    }

    const [openAlert, setOpenAlert] = React.useState(false);
  
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
    }

    setOpenAlert(false);
    };

    return (
        <>
        {loading ? <SimpleBackdrop loading={true} />: null}
        <div className="box-register">
            <div className="actions-register">
            <h2>Nueva Cuenta</h2>
            <h4>Ingresa los siguientes datos y activa tu cuenta</h4>
                <TextField onChange={handleChange} className="input-text" id="firstname" label="Nombre"  placeholder="Ingresa tu Nombre" variant="outlined" />
                <TextField onChange={handleChange} className="input-text" id="lastname" label="Apellidos"  placeholder="Ingresa tus Apellidos" variant="outlined" />
                <TextField onChange={handleChange} className="input-text" id="email" label="Email"  placeholder="Ingresa tu Email" variant="outlined" />
                <TextField onChange={handleChange} className="input-text" id="username" label="Username"  placeholder="Ingresa un Alias" variant="outlined" />
                <TextField onChange={handleChange} type="password" className="input-text" id="password" label="Contraseña"  placeholder="Ingresa tu Contraseña" variant="outlined" />
                <SvgButton onClick={sendRegister}  id="submit-login">Registrarme</SvgButton>
                <a onClick={(event) => {
                  event.preventDefault();
                  window.location.href = "/user/login"
                }} >Ya tengo una Cuenta</a>
            </div>
        </div>
        <Stack spacing={2}>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={msg.status} sx={{ width: '100%' }}>
              {msg.message}
            </Alert>
          </Snackbar>
        </Stack>
        </>
    )
}
