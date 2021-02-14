import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import App from '../App'
import Register from './Register'


const Main = () =>  {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/mypage' exact component={App} />
      </Switch>
    </Router>
  </>
    
  );
}

export default Main;