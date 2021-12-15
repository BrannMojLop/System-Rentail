import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import DetailsRent from "./DetailsRent"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomizedTables(props) {

  const [rentInfo, setRentInfo] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  const handleClick = async (event) => {
    let id = null
    if(event.target.id === ""){
      id = event.target.parentElement.id;
    } else {
      id = event.target.id;
    }

    const rent = props.rentsData.filter(((rent, i) => {
      if(rent._id === id){
        rent.index = i + 1;
        return rent;
      }
    }))
    setRentInfo(rent)
    setOpen(true);
  };

  return (
    <>
    <div className="table-desktop">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} >Producto</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus de Pago</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Fecha de Inicio</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Fecha de Término</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Editar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rentsData.map((rent, i) =>{

            let dateStart = new Date(rent.start_date);
            let dateEnd = new Date(rent.end_date);
            dateStart = dateStart.getDate() + "-"+ (dateStart.getMonth() + 1) + "-" +dateStart.getFullYear()
            dateEnd = dateEnd.getDate() + "-"+ (dateEnd.getMonth() + 1) + "-" + dateEnd.getFullYear()

            let statusPayment = rent.payment ? "Pagada" : "Pendiente"

            return (
              <StyledTableRow key={rent._id} className="item-table" onClick={handleClick}>
                <StyledTableCell id={rent._id} component="th" scope="row">
                  {rent.product.name}
                </StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{rent.status.status === "Cancelada" ? "Cancelado" : statusPayment}</StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{dateStart}</StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{dateEnd}</StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{rent.status.status}</StyledTableCell>
                <StyledTableCell id={rent._id} align="center">
                  <IconButton id={rent._id} aria-label="edit" size="small">
                        <EditIcon id={rent._id} aria-label="edit"/>
                    </IconButton></StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    <div className="table-mobile">
    <TableContainer className="table-mobile" component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} >Producto</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus de Pago</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rentsData.map((rent, i) =>{

            let statusPayment = rent.payment ? "Pagada" : "Pendiente"

            return (
              <StyledTableRow key={rent._id} className="item-table" onClick={handleClick}>
                <StyledTableCell id={rent._id} component="th" scope="row">
                {rent.product.name}
                </StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{rent.status.status === "Cancelada" ? "Cancelado" : statusPayment}</StyledTableCell>
                <StyledTableCell id={rent._id} align="center">{rent.status.status }</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    {rentInfo ? <DetailsRent optionSwitch={props.optionSwitch} setLoading={props.setLoading} rentInfo={rentInfo} open={open} setOpen={setOpen}/> : null}
    </>
  );
}