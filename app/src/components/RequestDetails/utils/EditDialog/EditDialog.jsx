import * as React from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import { DialogActions, List, DialogContent } from '@mui/material';

import { AlertDialog } from '../../../utils/Confirm/Confirm';
import { MaterialUIPickers } from '../../utils/DatePicker/DatePicker';


import './edit_dialog.sass';

export function EditDialog (props) {
    
return (   
    <Dialog disableEscapeKeyDown open={props.open} onClose={props.handleClose}>
            <DialogContent>
                {
                    <List>
                        <ListItem>
                            <div id = "editPanel">
                                <h1>Editar solicitud recibida</h1>
                                <h6>Antes de aceptar una solicitud seleccione la fecha correcta</h6> 
                                
                                <MaterialUIPickers
                                    value = {props.value}
                                    handleChange = {props.handleDPChange}
                                ></MaterialUIPickers>
                                <div className='buttons-section'>
                                    <Button 
                                        id='2' 
                                        variant="outlined"
                                        className="btn"
                                        name={props.idRR} 
                                        onClick={props.confirm}
                                    >Aceptar</Button>
                                    <Button 
                                        id='3' 
                                        variant="outlined"
                                        className="btn"
                                        name={props.idRR} 
                                        onClick={props.confirm}
                                    >Rechazar</Button>
                                </div>

                                <AlertDialog
                                    open={props.openA}
                                    cancel={props.cancel}
                                    accept ={props.accept}
                                    action = {'ejecutar esta acción para'}
                                ></AlertDialog>
                            </div>
                        </ListItem>
                    </List>
                }
            </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>Cancelar</Button>
        </DialogActions>
    </Dialog>
    );

}