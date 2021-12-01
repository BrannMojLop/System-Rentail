import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function AlertDialog(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          {/*console.log(`estatus open ${props.open}`)*/}
        <DialogTitle id="alert-dialog-title">
          {`¿Está seguro de que desea ${props.action} esta solicitud?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta operación no puede ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancel}> 
            Cancelar
          </Button>
          <Button onClick={props.accept} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
