import React, { useState, useEffect } from 'react';
import '../public/styles/app.sass'
import PrimarySearchAppBar from './utils/BarSearch/PrimarySearchAppBar'
import Catalog from './Catalog/Catalog';
import DetailsPublication from './DetailsPublication/DetailsPublication';
import MyAccount from './MyAccount/MyAccount';
import NotFound from './NotFound'
import Login from './Login/Login';
import Register from './Register/Register';
import RequestPanel from './RequestPanel';
import ProductsPanel from './ProductsPanel/ProductsPanel';
import PublicationsPanel from './PublicationsPanel/PublicationsPanel'
import RentsPanel from './RentsPanel/RentsPanel';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Router>
        <Switch>
        <Route exact path="/user/login/redirect">
            <Login />
          </Route>
          <Route exact path="/user/login">
            <Login />
          </Route>
          <Route exact path="/user/account">
            {window.localStorage.getItem('user') ? <MyAccount /> : <Redirect to="/user/login/redirect?next=account"/> }
          </Route>
          <Route exact path="/user/register" component={Register}/>
          <Route exact path="/user/panel-requests">
            {window.localStorage.getItem('user') ? <RequestPanel /> : <RequestPanel to="/user/login/redirect?next=requests"/> }
          </Route>
          <Route exact path="/user/panel-products">
            {window.localStorage.getItem('user') ? <ProductsPanel /> : <Redirect to="/user/login/redirect?next=products"/> }
          </Route>
          <Route exact path="/user/panel-publications">
            {window.localStorage.getItem('user') ? <PublicationsPanel /> : <Redirect to="/user/login/redirect?next=publications"/> }
          </Route>
          <Route exact path="/user/panel-rents">
            {window.localStorage.getItem('user') ? <RentsPanel /> : <Redirect to="/user/login/redirect?next=rents"/> }
          </Route>
          <Route exact path="/catalog" component={Catalog}/>
          <Route exact path="/catalog/search/:search" component={Catalog}/>
          <Route exact path="/catalog/detailsPublication/:id" component={DetailsPublication}/>
          <Route path="/" component={Catalog}/>
          <Route path="" component={NotFound} />
        </Switch>
      </Router> 
    </div>
  );
}
