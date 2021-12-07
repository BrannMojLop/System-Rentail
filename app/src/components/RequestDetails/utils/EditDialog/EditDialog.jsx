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
        <DialogTitle className="textInfo">Editar solicitud recibida</DialogTitle>
            <DialogContent>
                {
                    <List>
                        <ListItem>
                            <div id = "editPanel">
                                <h6>Antes de aceptar una solicitud seleccione la fecha correcta</h6> 
                                
                                <MaterialUIPickers
                                    value = {props.value}
                                    handleChange = {props.handleDPChange}
                                ></MaterialUIPickers>
                                <div>
                                    <button 
                                        id='2' 
                                        className = "green-button" 
                                        name={props.idRR} 
                                        onClick={props.confirm}
                                    >Aceptar</button>
                                    <button 
                                        id='3' 
                                        className = "red-button" 
                                        name={props.idRR} 
                                        onClick={props.confirm}
                                    >Rechazar</button>
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
            <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
    );

}