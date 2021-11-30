import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectM(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectSearch, setSelectSearch] = React.useState(null);
  const [selectOption, setSelectOption] = React.useState("Mostrar Todos");

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
    setSelectSearch(event.target.selectedOptions[0].id)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event.target.textContent === 'Cancel') {
      setOpen(false);
    } else {
        if (selectOption === 'Mostrar Todos'){
            props.searchPublications('https://income-system.herokuapp.com/publications')
            setOpen(false);
          } else{
            props.searchPublications('https://income-system.herokuapp.com/publications?'+ props.search + '=' + selectOption, selectSearch)
            setOpen(false);
          }
    }
  };

  return (
    <div className="basic-select-M">
      <Button className="btn-select" onClick={handleClickOpen}>Filtrar por {props.title}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Elige una opción</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">{props.title}</InputLabel>
              <Select
                native
                value={selectOption}
                onChange={handleChange}
                input={<OutlinedInput label={props.title} id="demo-dialog-native" />}
              >
                <option value="Mostrar Todos">Mostrar Todos</option>
                {options.map((o) => <option id={o.name} value={o._id}>{o.name}</option>)}
              </Select>
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
