import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "./modal-create.sass"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalCreate(props) {

  const [ createData, setCreateData ] = React.useState({
    id_lessor: JSON.parse(localStorage.getItem('user')).id,
    id_category: "",
    name: ""
  })
  const [selectCategories, setSelectCategories] = React.useState([]);

  React.useEffect(() => {
    const getOptions = async (url) => {
        const request = await fetch(url)
        const jsonRequest = await request.json()
        setSelectCategories(jsonRequest)
    }

    getOptions("https://system-rentail-api.herokuapp.com/categories")

},[])

  const handleClose = async (event) => {
      if (event.target.id === 'create-product'){
        if (createData.id_category === ""  || createData.name === "") {
          props.setMsg({status: "error", message: "Completa los datos requeridos (*)"})
          props.setOpenAlert(true)
        } else {
          props.setOpenModal(false);
          props.setLoading(true)
          try {
            const url = 'https://system-rentail-api.herokuapp.com/products'
            const config = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token 
                },
                body: JSON.stringify(createData)
                
            }
            await fetch(url, config)
            props.setOpenAlert(true)
            setTimeout(() => {
              window.location.href = "/user/panel-products"
            }, 1000)
    
          } catch (e){
            console.log(e);
          } 
        }
      } else {
        props.setOpenModal(false);
      }
};

  const handleChange = (event) => {
    if (event.target.id === "name"){
      setCreateData({...createData, name:event.target.value});
    } else if (event.target.id === "description"){
      setCreateData({...createData, description:event.target.value})
    } else if (event.target.id === "image") {
      setCreateData({...createData, image:event.target.value})
    } else {
      setCreateData({...createData, id_category:event.target.value})
    }
}

  return (
    <>
    <div >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crear Nuevo producto
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
            <TextField required="true" onChange={handleChange} className="input-product" id="name" label="Nombre" value={createData.name || "" }/>
            <TextField
              id="category"
              select
              label="Categoria"
              className="input-product"
              value={createData.id_category || ""}
              onChange={handleChange}
              required="true"
            >
              {selectCategories.map((o) => <MenuItem key={o._id} value={o._id}>{o.name}</MenuItem> )}
            </TextField>
            <TextField onChange={handleChange} className="input-product url-img" id="image" label="Imagen (URL)" value={createData.image || ""}/>
            <TextField
            onChange={handleChange}
            className="input-product-multiline"
            label="Descripcion"
            id="description"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="standard"
            value={createData.description || ""}
          />
        </DialogContent>
        <DialogActions>
          <Button id="create-product" autoFocus onClick={handleClose}>
            Crear Producto
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    </>
  );
}