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
import Detailspublication from "./DetailsPublication"

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

  const [publicationData, setpublicationData] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    let id = null
    if(event.target.id === ""){
      id = event.target.parentElement.id;
    } else {
      id = event.target.id;
    }

    const publication = props.publicationsData.filter((publication => {
      if(publication._id === id){
        return publication;
      }
    }))
    setpublicationData(publication)
    setOpen(true);
  };

  return (
    <>
    <div className="table-desktop">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} >Publicación</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Existencias</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Fecha de Creación</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Última Actualización</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Editar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.publicationsData.map((publication) =>{

            let dateCreated = new Date(publication.createdAt);
            let dateUpdated = new Date(publication.updatedAt);
            dateCreated = dateCreated.getDate() + "-"+ dateCreated.getMonth()+ "-" +dateCreated.getFullYear()
            dateUpdated = dateUpdated.getDate() + "-"+ dateUpdated.getMonth() + "-" + dateUpdated.getFullYear()

            return (
              <StyledTableRow key={publication.title} className="item-table" onClick={handleClick}>
                <StyledTableCell id={publication._id} component="th" scope="row">
                  {publication.title}
                </StyledTableCell>
                <StyledTableCell id={publication._id} align="center">{publication.amount}</StyledTableCell>
                <StyledTableCell id={publication._id} align="center">{dateCreated}</StyledTableCell>
                <StyledTableCell id={publication._id} align="center">{dateUpdated}</StyledTableCell>
                <StyledTableCell id={publication._id} align="center">{publication.status ? "Activo" : "Deshabilitado" }</StyledTableCell>
                <StyledTableCell id={publication._id} align="center">
                  <IconButton id={publication._id} aria-label="edit" size="small">
                        <EditIcon id={publication._id} aria-label="edit"/>
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
            <StyledTableCell style={{ backgroundColor: '#153E90'}} >Publicación</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Fecha de Creación</StyledTableCell>
            <StyledTableCell style={{ backgroundColor: '#153E90'}} align="center">Estatus</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.publicationsData.map((publication) =>{

            let dateCreated = new Date(publication.createdAt);
            let dateUpdated = new Date(publication.updatedAt);
            dateCreated = dateCreated.getDate() + "-"+ dateCreated.getMonth()+ "-" +dateCreated.getFullYear()
            dateUpdated = dateUpdated.getDate() + "-"+ dateUpdated.getMonth() + "-" + dateUpdated.getFullYear()

            return (
              <StyledTableRow key={publication.title} className="item-table" onClick={handleClick}>
                <StyledTableCell id={publication._id} component="th" scope="row">
                  {publication.title}
                </StyledTableCell>
                <StyledTableCell className="item-mobile" id={publication._id} align="center">{dateCreated}</StyledTableCell>
                <StyledTableCell id={publication._id} align="center">{publication.status ? "Activo" : "Deshabilitado" }</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    {publicationData ? <Detailspublication publicationData={publicationData} setLoading={props.setLoading} open={open} setOpen={setOpen}/> : null}
    </>
  );
}