import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Route path="/" component={App} />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
