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
  const [options, setOptions] = React.useState(["Activas", "Canceladas", "Pagadas", "Mostrar Todas"]);
  const [selectOption, setSelectOption] = React.useState(null);

  const handleChange = (event) => {
    setSelectOption(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event.target.textContent === 'Cancel') {
      setOpen(false);
    } else if (event.target.textContent === 'Ok'){
      setOpen(false);
      props.setSelectFilter(selectOption)
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="select-filter-M">
      <Button className="btn-select" onClick={handleClickOpen}>Filtrar por:</Button>
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
                {options.map((o) => <option id={o} value={o}>{o}</option>)}
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
