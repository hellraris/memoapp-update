import React from 'react';
import ReactDOM from 'react-dom';

import Home from './pages/Home';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Route path={"/"} component={Home}/>
  </HashRouter>,
 document.getElementById('root'));