import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export function MaterialUIPickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Fecha de inicio"
          inputFormat="dd/MM/yyyy"
          value={props.value}
          onChange={props.handleChange}
          minDate= {new Date()}
          inputProps={{ readOnly: true }}
          renderInput={(params) => <TextField className="calendar-textfield" {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
