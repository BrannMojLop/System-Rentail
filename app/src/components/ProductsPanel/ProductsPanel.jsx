import * as React from 'react';
import Button from '@mui/material/Button';
import BasicTable from './utils/BasicTable';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import ModalCreate from "./utils/ModalCreate/ModalCreate"
import "./products-panel.sass"
import SelectFilterD from './utils/SelectFilter/SelectFilterD'
import SelectFilterM from './utils/SelectFilter/SelectFilterM'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductsPanel(){

    const [ productsData, setProductsData ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(null);
    const [ msg, setMsg ] = React.useState({status: "success", message: "Producto Creado con Exito!"})
    const [ selectFilter, setSelectFilter ] = React.useState(null);

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
              setProductsData(jsonRequest)
              setLoading(false)

            } catch (e){ 
              console.log(e); 
            } } 
    
            getProducts('https://system-rentail-api.herokuapp.com/products?id_lessor=' + JSON.parse(localStorage.getItem('user')).id)
    
        },[]) 

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
                let filterProducts = null
                switch (selectFilter){
                  case "Activos":
                    filterProducts = jsonRequest.filter(product => {
                      if (product.status){
                        return product
                      }
                    })
                    setProductsData(filterProducts);
                    setLoading(false);
                    break
  
                  case "Deshablitados":
                    filterProducts = jsonRequest.filter(product => {
                      if (!product.status){
                        return product
                      }
                    })                  
                    setProductsData(filterProducts);
                    setLoading(false);
                    break

                  default:
                    setProductsData(jsonRequest);
                    setLoading(false);
                    break
                }
              } catch (e){ 
                console.log(e); 
              } } 
      
              getProducts('https://system-rentail-api.herokuapp.com/products?id_lessor=' + JSON.parse(localStorage.getItem('user')).id)

        },[selectFilter]) 

        const [openModal, setOpenModal] = React.useState(false);

        const handleClickOpen = () => {
            setOpenModal(true);
        };

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
            <div className="header-products">
                <h3>Mis Productos</h3>
                <SelectFilterD setSelectFilter={setSelectFilter} />
                <SelectFilterM setSelectFilter={setSelectFilter} />
                <div className="actions-products">
                    <Button onClick={handleClickOpen} className="btn-add" variant="outlined"> <strong>+</strong> Agregar </Button>
                </div>
            </div>
            <div className="table-products">
              {productsData !== null ? <BasicTable productsData={productsData} /> : null}
            </div> 
            {openModal ? <ModalCreate setMsg={setMsg} setOpenAlert={setOpenAlert} setLoading={setLoading} openModal={openModal} setOpenModal={setOpenModal} /> : null}
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