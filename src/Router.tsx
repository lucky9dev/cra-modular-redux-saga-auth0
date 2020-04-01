import React from 'react';
import { Route, Switch } from 'react-router';

import IndexPage from './pages/IndexPage';
import CallbackPage from './pages/CallbackPage';
import PrivateRoute from './pages/PrivateRoute';

import DashboardPage from './pages/DashboardPage';
import EmptyPage from './pages/EmptyPage';

import onRouteChanges from './onRouteChange';
onRouteChanges((route: any) => {
  console.log(`route changed to "${route}"`);
});

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/callback" component={CallbackPage} />
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <Route path="*" component={EmptyPage} />
    </Switch>
  );
};
