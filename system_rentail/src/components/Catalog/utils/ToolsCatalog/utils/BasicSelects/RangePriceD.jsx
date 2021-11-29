import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

export default function BasicSelect(props) {
  const [min_price, setMin_price] = React.useState(0);
  const [max_price, setMax_price] = React.useState(0);

  const handleChange = (event) => {
    if (event.target.id === 'min_price'){
      setMin_price(event.target.value);
    } else {
      setMax_price(event.target.value);
    }
  };


  return (
    <Box className="box-price-D" sx={{ minWidth: 120, padding: 2 }}>
      <FormControl fullWidth sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Box sx={{width:'70%', display: 'flex', flexDirection: 'row'}}>
          <TextField onChange={(e) => {handleChange(e)}} type='number' id="min_price" label="Min Precio" variant="outlined" min={0} max={5000}/>
          <TextField onChange={(e) => {handleChange(e)}} type='number' id="max_price" label="Max Precio" variant="outlined" min={0} max={5000}/>
        </Box>
        <Button onClick={(e) => {
            props.searchPublications('https://income-system.herokuapp.com/publications?'+ props.search[0] + '=' + min_price + '&' + props.search[1] + '=' + max_price)
        }} style={{width:'30%', backgroundColor: '#153E90'}} variant="contained"
        id="demo-simple-select"
        >Aplicar </Button>
      </FormControl>
    </Box>
  );
} 