import * as React from 'react';
import "./login.sass";
import imgInformation from "../../public/assets/information.jpg";
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

export default function Login() {

    const [ email, setEmail ] = React.useState(null);
    const [ password, setPassword ] = React.useState(null);
    const [ loading, setLoading ] = React.useState(null);
    const [ msg, setMsg ] = React.useState({status: "", message: ""})

    async function sendLogin(event) {
        event.preventDefault()
        setLoading(true)
        try {
            const url = 'https://income-system.herokuapp.com/users/login'
            let dataLogin = {
                email: email,
                password: password
            }
            const config = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin)
            }
            const request = await fetch(url, config)
            const jsonRequest = await request.json() 

            if (jsonRequest.errors) {
              if (jsonRequest.errors.email) {
                setMsg({status: "error", message: `Debe ingresar su email`})
                setOpenAlert(true)
                setLoading(false)  
              } else if (jsonRequest.errors.password) {
                setMsg({status: "error", message: `Debe ingresar su contraseña`})
                setOpenAlert(true)
                setLoading(false)
              } else {
                setMsg({status: "error", message: `Email o Contraseña incorrectas`})
                setOpenAlert(true)
                setLoading(false)
              }

            } else if (jsonRequest.user) {
              setMsg({status: "success", message: `Bienvenid@ ${jsonRequest.user.username}!`})
              window.localStorage.setItem("user", JSON.stringify(jsonRequest.user))
              setOpenAlert(true)
              setTimeout(() => {
                setLoading(false)
                window.location.href = "/catalog"
              }, 2000)
            }
          } catch (e){
              setMsg({status: "error", message: "Algo salio mal, no se pudo iniciar sesion!"})
              setOpenAlert(true); 
              setLoading(false)
          } 
    }

    function handleChange(event) {
        if (event.target.id === "email"){
            setEmail(event.target.value);
        } else if (event.target.id === "password"){
            setPassword(event.target.value)
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
        <div className="box-login">
            <article className="information">
                <h2>Conviertete en uno de nuestros arrendadores.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel lacus sit amet purus placerat feugiat. Maecenas id metus lobortis, pulvinar nunc id, tristique orci. Integer dolor urna, scelerisque.</p>
                <div className="box-img">
                    <img src={imgInformation} alt="img" />
                </div>
            </article>
            <div className="forms">
            <div className="actions-login">
                <div className="login">
                    <h3>Ya tienes una cuenta</h3>
                    <TextField onChange={handleChange} className="input-text" id="email" label="Email" value={email || ""} placeholder="Ingresa tu Email" variant="outlined" />
                    <TextField onChange={handleChange} type="password" className="input-text" id="password" label="Constraseña" value={password || ""} placeholder="Ingresa tu Password" variant="outlined" />
                    <SvgButton onClick={sendLogin} id="submit-login">Iniciar Sesion</SvgButton>
                </div>
            </div>
            <div className="register">
                <h3>Aun no esta registrado?</h3>
                <p>Fusce vitae neque libero. In ligula arcu, placerat vel luctus non, accumsan in ipsum. Pellentesque euismod commodo laoreet. </p>
                <div className="actions-register">
                    <SvgButton onClick={(event) => {
                      window.location.href = "/user/register"
                    }} id="button-register">Registrate</SvgButton>
                    <a>Necesitas Ayuda?</a>
                </div>
            </div>
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
