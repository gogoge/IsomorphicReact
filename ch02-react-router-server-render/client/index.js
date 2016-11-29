import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory, match } from 'react-router'

/* ----------------------------------------------------------------------------
/* React Routing Component 
/* ---------------------------------------------------------------------------- */
const Root = () => (<h1>Client Root</h1>)
const A = () => (<h1>Client A</h1>)
const B = () => (<h1>Client B</h1>)
const NoMatch = () => (<h1>Client NoMatch</h1>)
const routes = (
  <Route path="/">
    <IndexRoute component={Root}/>
    <Route path="/A" component={A} />
    <Route path="/B" component={B}/>
    <Route path="*" component={NoMatch}/>
  </Route>
)

/* ----------------------------------------------------------------------------
/* React Component
/* ---------------------------------------------------------------------------- */
ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
)

