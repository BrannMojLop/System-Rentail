import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function BasicSelectD(props) {
  const [options, setOptions] = React.useState([]);
  const [selectSearch, setSelectSearch] = React.useState(null);
  const [selectOption, setSelectOption] = React.useState(null);

  React.useEffect(() => {
    const getOptions = async (url) => {
        const request = await fetch(url)
        const jsonRequest = await request.json()
        setOptions(jsonRequest)
    }

    getOptions(props.url)

},[])

  const handleChange = (event) => {
    setSelectOption(event.target.value);
    // setSelectSearch(event.explicitOriginalTarget.innerText);
  };


  return (
    <Box className="basic-select-D" sx={{ minWidth: 120, padding: 2 }}>
      <FormControl fullWidth sx={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        <InputLabel className="label-basic" id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          className="select-basic"
          style={{width:'70%'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectOption}
          label="selectOption"
          onChange={handleChange}
        >
          <MenuItem value="Mostrar Todos">Mostrar Todos</MenuItem>
          {options.map((o) => <MenuItem value={o._id}>{o.name}</MenuItem> )}
        </Select>
        <Button className="btn-select"onClick={(e) => {
          if (selectOption === 'Mostrar Todos'){
            props.searchPublications('https://system-rentail-api.herokuapp.com/publications')
          } else{
            props.searchPublications('https://system-rentail-api.herokuapp.com/publications?'+ props.search + '=' + selectOption, selectSearch)
          }
        }} style={{width:'30%', backgroundColor: '#153E90'}} variant="contained"
        id="demo-simple-select"
        >Aplicar </Button>
      </FormControl>
    </Box>
  );
}