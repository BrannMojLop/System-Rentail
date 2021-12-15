import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  if (event.target.innerHTML == "Home") {
    window.location.href = "/";
  } else if (event.target.innerHTML == "Catálogo"){
    window.location.href = "/catalog";
  }
}

export default function BasicBreadcrumbs(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs style={{ backgroundColor:'#eef4f7' ,  padding:'5px' }} aria-label="breadcrumb">
        <Link
        style={{ fontSize: '0.9em' }} underline="hover" color="inherit" href="/catalog">
          Home
        </Link>
        <Link
          style={{ fontSize: '0.9em' }}
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Catálogo
        </Link>
        <Typography color="text.primary">{props.search}</Typography>
      </Breadcrumbs>
    </div>
  );
}
