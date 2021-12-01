import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function BasicAlerts(props) {

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open}  onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.resSeverity} sx={{ width: '100%' }}>
          {props.responseMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

