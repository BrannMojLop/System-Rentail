import React, { useState, useEffect } from 'react';
import '../styles/app.sass'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import Catalog from './Catalog';
import DetailsPublication from './DetailsPublication';
import NotFound from './NotFound'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App(props) {

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Router>
        <Switch>
          <Route exact path="/catalog" component={Catalog}/>
          <Route exact path="/catalog/search/:search" component={Catalog}/>
          <Route path="/catalog/detailsPublication/:id" component={DetailsPublication} />
          <Route path="/" component={Catalog}/>
          <Route path="" component={NotFound} />
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
