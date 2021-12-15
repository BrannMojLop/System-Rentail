import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectFilterD(props) {
  const [options, setOptions] = React.useState(["Activas", "Deshablitadas", "Mostrar Todas"]);
  const [selectOption, setSelectOption] = React.useState(null);

  const handleChange = (event) => {
    setSelectOption(event.target.value);
  };


  return (
    <Box className="select-filter-D" sx={{ minWidth: 120, padding: 2 }}>
      <FormControl fullWidth sx={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        <InputLabel className="label-basic" id="demo-simple-select-label">Filtrar por:</InputLabel>
        <Select
          className="select-basic"
          style={{width:'50%'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectOption}
          label="selectOption"
          onChange={handleChange}
        >
          {options.map((o) => <MenuItem value={o}>{o}</MenuItem> )}
        </Select>
        <Button className="btn-select"onClick={(e) => {
          props.setSelectFilter(selectOption)
        }} style={{width:'30%', backgroundColor: '#153E90'}} variant="contained"
        id="demo-simple-select"
        >Aplicar </Button>
      </FormControl>
    </Box>
  );
}