import React, { useState, useEffect } from 'react';
import '../styles/app.sass'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import Catalog from './Catalog';
import DetailsPublication from './DetailsPublication';
import Profile from './Profile';
import NotFound from './NotFound'
import Login from './Login';
import Register from './Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <Route exact path="/user/profile">
            {user ? <Profile user={user}/> : null}
          </Route>
          <Route exact path="/user/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/user/register" component={Register}/>
          <Route exact path="/catalog" component={Catalog}/>
          <Route exact path="/catalog/search/:search" component={Catalog}/>
          <Route exact path="/catalog/detailsPublication/:id" component={DetailsPublication} user={user}/>
          <Route path="/" component={Catalog}/>
          <Route path="" component={NotFound} />
        </Switch>
      </Router> 
    </div>
  );
}
