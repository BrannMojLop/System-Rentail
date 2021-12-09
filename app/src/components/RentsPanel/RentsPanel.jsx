import * as React from 'react';
import BasicTable from './utils/BasicTable';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import "./rents-panel.sass"

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(25px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 15,
    height: 15,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RentsPanel(){

    const [ rentsData, setRentsData] = React.useState(null)
    const [ headerData, setHeaderData ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(null);
    const [ optionSwitch, setOptionSwitch ] = React.useState(0)
    const [ msg, setMsg ] = React.useState({status: "success", message: "Producto Creado con Exito!"})
    
    console.log(optionSwitch);

    React.useEffect(() => {

        setLoading(true);

        const getRents = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }

            const request = await fetch(url, {
              headers: config
            }) 
              const jsonRequest = await request.json() 
              setRentsData(jsonRequest)
              setHeaderData(Object.keys(jsonRequest[0]))
              setLoading(false)

            } catch (e){ 
              console.log(e); 
            } } 
    
          getRents("https://system-rentail-api.herokuapp.com/rents?id_lessor=" + JSON.parse(localStorage.getItem('user')).id)
    
        },[]) 

        const [openAlert, setOpenAlert] = React.useState(false);
      
        const handleCloseAlert = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpenAlert(false);
        };

        const handleClickSwith = () => {
          let option = null
          if (optionSwitch === 1) {
            option = 0
          } else { 
            option = 1
          }
          setOptionSwitch(option)
        }
      

    return (
        <>
            {loading ? <SimpleBackdrop loading={true} />: null} 
            <div className="header-products">
                <h3>Mis Rentas</h3>
                <div className="switch-rents">
                  <Typography id="lessor" className="text-switch" >Arrendatario</Typography>
                    <AntSwitch onClick={handleClickSwith} className="input-switch" defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  <Typography id="lessee" className="text-switch" >Arrendador</Typography>
                </div>
            </div>
            <div className="table-products">
              {rentsData !== null && headerData !== null ? <BasicTable setLoading={setLoading} rentsData={rentsData} headerData={headerData} /> : null}
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