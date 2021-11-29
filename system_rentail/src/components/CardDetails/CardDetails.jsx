import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CardDetails(props) {

    const [view, setView] = React.useState(null);
    const [loading, setLoading ] = React.useState(null);
    const [selectOption, setSelectOption] = React.useState(null)
    const [msg, setMsg] = React.useState({status: "success", message: "Solcitud enviada con Exito!"})

    let request = {}

    const sendRequest = async () => {
    try {
        const objRequest = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token },
                body: JSON.stringify(request)
        }
            await fetch("https://income-system.herokuapp.com/rental-requests", objRequest)
            setMsg({status: "success", message: "Solcitud enviada con Exito!"})
            restForm()
            setOpen(true);
            setLoading(false)
            setTimeout(() => {
                window.location.href = "/user/panel-requests"
            }, 1000)

    } catch (e) {
        setOpen(true);
        setMsg({status: "error", message: "El envio de la solcitud Fallo!"})
    }
}

    const handleChange = (event, nextView) => {
        event.preventDefault();
        setView(nextView);
        setSelectOption(event.target.value)    
      }

    const restForm = () => {
        setView(null);
        setSelectOption(null);
        request = {}
    }

    const handleClick = async (event) => {
        event.preventDefault();

        if (JSON.parse(localStorage.getItem('user'))) {
            if(props.publication[0].periods[selectOption]) {
                request = {
                    "id_lessor": props.publication[0].lessor[0]._id,
                    "id_lessee": JSON.parse(localStorage.getItem('user')).id,
                    "id_publication": props.publication[0]._id,
                    "contract": {
                        "price": props.publication[0].periods[selectOption],
                        "period": props.publication[0].prices[selectOption]
                    }
                }
                setLoading(true)
                setTimeout(() => {
                    sendRequest()
                }, 1000);
            } 
        } else {
            setOpen(true);
            setLoading(true)
            setMsg({status: "warning", message: "Es necesario tener una cuenta para rentar"})
            setTimeout(() => {
                setLoading(false)
                window.location.href = "/user/login"
            }, 1500);
        }
    }

    const [open, setOpen] = React.useState(false);
  
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return (
        <>
        {loading ? <SimpleBackdrop loading={true} />: null}
        <Stack spacing={2}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={msg.status} sx={{ width: '100%' }}>
              {msg.message}
            </Alert>
          </Snackbar>
        </Stack>
        <div className="box-img">
                <header>
                    <h2>{props.publication[0].title}</h2>
                </header>
                <img src={props.publication[0].product[0].image} alt={props.publication[0].title} />
            </div>
            <div className="details-primary">
                <section className="box-details">
                    <article className="details-secundary">
                    <h2>{props.publication[0].amount} Existencias - Producto Disponible</h2>
                        <h3>Datos de Arrendador</h3>
                        <p>Nombre: {props.publication[0].lessor[0].firstname} {props.publication[0].lessor[0].lastname}</p>
                        <p>Ubicacion: {props.publication[0].location}</p>
                        <h3>Detalles del Producto</h3>
                        <p>Producto: {props.publication[0].product[0].name}</p>
                        <p>Descripcion: {props.publication[0].product[0].description}</p>
                        <p>Categoria: {props.publication[0].category[0].name}</p>
                    </article>
                    <section className="actions-box">
                    <h3>Envia una solicitud de Renta</h3>
                    <form className="form-actions">
                    <p>Selecciona una opcion</p>
                    <ToggleButtonGroup
                    orientation="vertical"
                    value={view}
                    exclusive
                    onChange={handleChange}
                    >
                    {props.publication[0].prices.map((price, index) => {
                            return <ToggleButton style={{ fontSize: '0.8em' }} value={index}>{props.publication[0].periods[index]} dias por: $ {price}</ToggleButton> 
                        })
                    })
                    </ToggleButtonGroup>
                    <Button 
                    style={{marginTop: '5%', width:'70%', backgroundColor: '#153E90'}} 
                    variant="contained"
                    id="demo-simple-select"
                    onClick={handleClick}
                    >Enviar</Button>
                    </form>
                    </section>
                </section>
            </div>
        </>
    )
}
