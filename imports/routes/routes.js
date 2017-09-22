import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Dashboard from './../ui/Dashboard';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

const browserHistory = createBrowserHistory();
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.push('/dashboard');
  } else if ( isAuthenticatedPage && !isAuthenticated ) {
    browserHistory.push('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path='/' render={() => Meteor.userId() ? <Redirect to='/links' /> : <Login />}/>
      <Route path='/dashboard'render={() => !Meteor.userId() ? <Redirect to='/' /> : <Dashboard />}/>
      <Route path='/signup' render={() => Meteor.userId() ? <Redirect to='/links' /> : <Signup />}/>
      <Route path='*' component={NotFound} />
    </Switch>
  </Router>
);
