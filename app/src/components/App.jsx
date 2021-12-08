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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {

  const [ user, setUser] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [])

  return (
    <div className="App">
      <PrimarySearchAppBar user={user} setUser={setUser} />
      <Router>
        <Switch>
          <Route exact path="/user/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/user/account">
            {user ? <MyAccount user={user}/> : null }
          </Route>
          <Route exact path="/user/register" component={Register}/>
          <Route exact path="/user/panel-requests" component={RequestPanel}/>
          <Route exact path="/user/panel-products" component={ProductsPanel}/>
          <Route exact path="/user/panel-publications" component={PublicationsPanel}/>
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
