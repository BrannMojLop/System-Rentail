import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

export default function RangePriceM(props) {
  const [open, setOpen] = React.useState(false);
  const [min_price, setMin_price] = React.useState(0);
  const [max_price, setMax_price] = React.useState(0);

  const handleChangeMin = (event) => {
      setMin_price(event.target.value);
  };
  
  const handleChangeMax = (event) => {
    setMax_price(event.target.value);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event.target.textContent === 'Cancel') {
      setOpen(false);
    } else {
        props.searchPublications('https://system-rentail-api.herokuapp.com/publications?'+ props.search[0] + '=' + min_price + '&' + props.search[1] + '=' + max_price)
        setOpen(false);
    }
  };

  return (
    <div className="box-price-M">
      <Button className="btn-select" onClick={handleClickOpen}>Filtrar por Precio</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Elige un rango</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField onChange={(e) => {handleChangeMin(e)}} type='number' id="min_price" label="Min Precio" variant="outlined" min={0} max={5000}/>
              <TextField onChange={(e) => {handleChangeMax(e)}} type='number' id="max_price" label="Max Precio" variant="outlined" min={0} max={5000}/>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
